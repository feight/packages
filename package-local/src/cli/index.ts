

import path from "path";

import "core-js/stable";
import "regenerator-runtime/runtime";

import program from "commander";


import {
    getDependenciesCache,
    getSourceCodeCache,
    setDependenciesCache,
    setSourceCodeCache
} from "../cache";
import { exec } from "../exec";
import { spawn } from "../spawn";
import cliPackageJson from "../../package.json";
import { getPackageLocalJson } from "../package-json";
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


interface InstallOptions{
    development?: boolean;
    directory: string;
    packageName: string;
    parent: string;
}


const runBuild = async function(cwd: string): Promise<void>{

    await spawn({
        command: "npm run build",
        cwd
    });

};


const runPack = async function(cwd: string): Promise<string>{

    const pack = await exec({
        command: "npm pack",
        cwd
    });

    return pack.trim();

};


const runInstall = async function(pack: string, cwd: string, development: boolean): Promise<void>{

    await spawn({
        command: `npm install ${ pack }${ development ? " --save-dev" : "" }`,
        cwd
    });

};


const builds: Record<string, boolean> = {};
const packs: Record<string, string> = {};


// eslint-disable-next-line max-lines-per-function
const install = async function(options: InstallOptions): Promise<void>{

    const {
        development = false,
        directory,
        packageName,
        parent
    } = options;

    /*
     * Before installing a local dependency, install all that dependencies
     * local dependencies.
     */
    try{

        // This is chilled, we need to do it so this runs recursively.
        // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
        await localDependencies(directory);

    }catch(error){

        console.error(`Could not install local dependencies: ${ directory }`);

        console.error(error);

        process.exit();

    }

    const dependenciesHash = await getDependenciesHash(directory);
    const sourceCodeHash = await getSourceCodeHash(directory);
    const dependenciesCache = await getDependenciesCache(parent, packageName);
    const sourceCodeCache = await getSourceCodeCache(parent, packageName);

    /*
     * If the dependencies haven't been installed or have changed since the last
     * dependency installation.
     */
    if(dependenciesCache !== dependenciesHash){

        /*
         * Keep a map of completed builds so that they can be reused if a
         * dependency is used across multiple packages.
         */
        if(!builds[directory]){

            // Build the package
            await runBuild(directory);

            // eslint-disable-next-line require-atomic-updates
            builds[directory] = true;

        }

        if(!packs[directory]){

            // Package the package into a .tgz
            // eslint-disable-next-line require-atomic-updates
            packs[directory] = await runPack(directory);

        }

        // Install the .tgz into package
        await runInstall(path.join(directory, packs[directory]), parent, development);

        // Set the dependencies cache so we don't do this again if unnecessary
        await setDependenciesCache(parent, packageName, dependenciesHash);

    /*
     * If the source code hasn't been installed or has changed since the last
     * last source code installation.
     */
    }else if(sourceCodeCache !== sourceCodeHash){

        console.log(`installed ${ packageName } in ${ parent }`);

    }

};


const localDependencies = async function(directory: string): Promise<void>{

    const packageLocalJson = await getPackageLocalJson(directory);
    const dependencies = resolveDependencyMapPaths(packageLocalJson?.dependencies);
    const devDependencies = resolveDependencyMapPaths(packageLocalJson?.devDependencies);

    for(const key of Object.keys(dependencies)){

        await install({
            directory: dependencies[key],
            packageName: key,
            parent: directory
        });

    }

    for(const key of Object.keys(devDependencies)){

        await install({
            development: true,
            directory: devDependencies[key],
            packageName: key,
            parent: directory
        });

    }

};


program
.command("link")
.action(async (): Promise<void> => {

    await localDependencies(process.cwd());

});

program
.command("unlink")
.action(async (): Promise<void> => {

    await localDependencies(process.cwd());

});


program.parse(process.argv);
