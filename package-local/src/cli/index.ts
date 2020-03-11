

import path from "path";

import "core-js/stable";
import "regenerator-runtime/runtime";

import program from "commander";
import globby from "globby";
import fs from "fs-extra";

import {
    getDependenciesCache,
    getSourceCodeCache,
    setDependenciesCache,
    setSourceCodeCache
} from "../cache";
import { exec } from "../exec";
import { spawn } from "../spawn";
import cliPackageJson from "../../package.json";
import {
    getPackageJson,
    getPackageLocalJson
} from "../package-json";
import { resolveDependencyMapPaths } from "../resolve-path";
import {
    getDependenciesHash,
    getSourceCodeHash
} from "../hash";


// This is dodgy, but the typing of this in globals.d.ts is kinda wierd
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("unhandledRejection", (error: any): void => console.error(error));

process.on("uncaughtException", (error: Error): void => console.error(error));


program.version(cliPackageJson.version);


const caches: {
    buildPackage: Record<string, boolean>;
    copyPackage: Record<string, boolean>;
    installPackage: Record<string, boolean>;
    installDependencies: Record<string, boolean>;
    installDependency: Record<string, boolean>;
    packPackage: Record<string, string>;
} = {
    buildPackage: {},
    copyPackage: {},
    installDependencies: {},
    installDependency: {},
    installPackage: {},
    packPackage: {}
};


const buildPackage = async function(options: {
    directory: string;
}): Promise<void>{

    const {
        directory
    } = options;

    /*
     * Keep a map of completed builds so that they can be reused if a
     * dependency is used across multiple packages.
     */
    if(!caches.buildPackage[directory]){

        // Build the package
        await spawn({
            command: "npm run build",
            cwd: directory
        });

        // eslint-disable-next-line require-atomic-updates
        caches.buildPackage[directory] = true;

    }

};


const copyPackage = async function(options: {
    directory: string;
    packagePath: string;
}): Promise<void>{

    const {
        directory,
        packagePath
    } = options;

    /*
     * Keep a map of completed builds so that they can be reused if a
     * dependency is used across multiple packages.
     */
    if(!caches.copyPackage[directory]){

        const packageJson = await getPackageJson(packagePath);

        const globs: string[] = [...new Set([
            ...packageJson?.files ?? [],
            packageJson.main ?? ""
        ])].filter((item) => item);

        const paths = await globby(globs, {
            cwd: packagePath
        });

        await Promise.all(paths.map((pth) => {

            const source = path.resolve(path.join(packagePath, pth));
            const destination = path.join(directory, "node_modules", packageJson.name, pth);

            return fs.copy(source, destination);

        }));

    }

};


const packPackage = async function(options: {
    directory: string;
}): Promise<string>{

    const {
        directory
    } = options;

    if(!caches.packPackage[directory]){

        // eslint-disable-next-line require-atomic-updates
        caches.packPackage[directory] = await exec({
            command: "npm pack",
            cwd: directory
        });

    }

    return caches.packPackage[directory];

};


const installPackage = async function(options: {
    directory: string;
    tarPath: string;
    development?: boolean;
}): Promise<void>{

    const {
        directory,
        tarPath,
        development = false
    } = options;

    if(!caches.installPackage[`${ directory }-${ tarPath }`]){

        await spawn({
            command: `npm install ${ tarPath }${ development ? " --save-dev" : "" }`,
            cwd: directory
        });

        // eslint-disable-next-line require-atomic-updates
        caches.installPackage[`${ directory }-${ tarPath }`] = true;

    }

};


const installDependency = async function(options: {
    development?: boolean;
    directory: string;
    packageName: string;
    parent: string;
}): Promise<void>{

    const {
        development = false,
        directory,
        packageName,
        parent
    } = options;

    const cacheKey = `${ packageName }-${ directory }-${ parent }`;

    if(!caches.installDependency[cacheKey]){

        /*
         * Before installing a local dependency, install all the local
         * dependencies it has. INCEPTION BONG.
         */
        try{

            // This is chilled, we need to do it so this runs recursively.
            // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
            await installDependencies(directory);

        }catch(error){

            console.error(`Could not install local dependencies: ${ directory }`);
            console.error(error);

            process.exit();

        }

        const dependenciesHash = await getDependenciesHash(directory);
        const sourceCodeHash = await getSourceCodeHash(directory);
        const dependenciesCache = await getDependenciesCache(parent, packageName);
        const sourceCodeCache = await getSourceCodeCache(parent, packageName);

        if(
            dependenciesCache === dependenciesHash &&
            sourceCodeCache === sourceCodeHash
        ){

            console.log(`cached ${ packageName }`);

        /*
         * If the dependencies haven't been installed or have changed since the last
         * dependency installation.
         */
        }else if(dependenciesCache !== dependenciesHash){

            // Build the package
            await buildPackage({ directory });

            const pack = await packPackage({ directory });

            // Install the .tgz into package
            await installPackage({
                development,
                directory: parent,
                tarPath: path.join(directory, pack)
            });

            const newDependenciesHash = await getDependenciesHash(directory);

            // Set the dependencies cache so we don't do this again if unnecessary
            await setDependenciesCache(parent, packageName, newDependenciesHash);

        /*
         * If the source code hasn't been installed or has changed since the last
         * last source code installation.
         */
        }else if(sourceCodeCache !== sourceCodeHash){

            await buildPackage({ directory });

            await copyPackage({
                directory: parent,
                packagePath: directory
            });

            const newSourceCodeHash = await getSourceCodeHash(directory);

            // Set the dependencies cache so we don't do this again if unnecessary
            await setSourceCodeCache(parent, packageName, newSourceCodeHash);

        }

        // eslint-disable-next-line require-atomic-updates
        caches.installDependency[cacheKey] = true;

    }

};


const installDependencies = async function(directory: string): Promise<void>{

    if(!caches.installDependencies[directory]){

        const packageLocalJson = await getPackageLocalJson(directory);
        const dependencies = resolveDependencyMapPaths(packageLocalJson?.dependencies);
        const devDependencies = resolveDependencyMapPaths(packageLocalJson?.devDependencies);

        for(const key of Object.keys(dependencies)){

            await installDependency({
                directory: dependencies[key],
                packageName: key,
                parent: directory
            });

        }

        for(const key of Object.keys(devDependencies)){

            await installDependency({
                development: true,
                directory: devDependencies[key],
                packageName: key,
                parent: directory
            });

        }

        // eslint-disable-next-line require-atomic-updates
        caches.installDependencies[directory] = true;

    }

};


program
.command("link")
.action(async (): Promise<void> => {

    await installDependencies(process.cwd());

});

program
.command("unlink")
.action(async (): Promise<void> => {

    await installDependencies(process.cwd());

});


program.parse(process.argv);
