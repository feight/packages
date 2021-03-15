

import path from "path";

import { cli } from "install-local";
import fs from "fs-extra";
import globby from "globby";

import { getPackageJson } from "./package-json";
import { spawn } from "./spawn";


const caches: {
    buildDependency: Record<string, boolean>;
    copyDependency: Record<string, boolean>;
} = {
    buildDependency: {},
    copyDependency: {}
};


export interface Dependency {
    directory: string;
    packageName: string;
}


export const buildDependency = async function(options: {
    directory: string;
}): Promise<void>{

    const {
        directory
    } = options;

    /*
     * Keep a map of completed builds so that they can be reused if a
     * dependency is used across multiple packages.
     */
    if(!caches.buildDependency[directory]){

        // Build the package
        await spawn({
            command: "npm run build",
            cwd: directory
        });

        // eslint-disable-next-line require-atomic-updates -- This is safe since it's just a cache
        caches.buildDependency[directory] = true;

    }

};


export const copyDependency = async function(options: {
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
    if(!caches.copyDependency[directory]){

        const packageJson = await getPackageJson(packagePath);

        const globs: string[] = [...new Set([
            ...packageJson.files ?? [],
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


export const updateDependencyBinPermissions = async function(options: {
    directory: string;
}): Promise<void>{

    const {
        directory
    } = options;

    const packageJson = await getPackageJson(directory);

    if(packageJson.bin){

        for(const executable of Object.keys(packageJson.bin)){

            const executablePath = path.resolve(path.join(process.cwd(), "node_modules", ".bin", executable));

            await fs.chmod(executablePath, "777");

        }

    }

};


export const getDependencyMap = async function(directory: string): Promise<Dependency[]>{

    const packageJson = await getPackageJson(directory);

    let dependencies: Dependency[] = [];

    const locals = packageJson.localDependencies ?? {};

    for(const packageName of Object.keys(locals)){

        const children = await getDependencyMap(path.join(directory, locals[packageName]));

        dependencies = [
            ...dependencies,
            ...children
        ];

    }

    dependencies = [
        ...dependencies,
        ...Object.keys(locals).map((packageName) => ({
            directory: path.join(directory, locals[packageName]),
            packageName
        }))
    ];

    const existing: Record<string, boolean> = {};

    return dependencies.filter((dependency) => {

        const key = `${ dependency.packageName }-${ dependency.directory }`;

        if(existing[key]){

            return false;

        }

        existing[key] = true;

        return true;

    });

};


export const installDependencies = async function(dependencies: Dependency[]): Promise<void>{

    if(dependencies.length > 0){

        for(const { directory } of dependencies){

            await buildDependency({ directory });

        }

        await cli(["node", "install-local", ...dependencies.map((install) => install.directory)]);

        for(const { directory } of dependencies){

            await updateDependencyBinPermissions({ directory });

        }

    }

};


export const updateDependencies = async function(dependencies: Dependency[]): Promise<void>{

    for(const { directory } of dependencies){

        await buildDependency({ directory });

        await copyDependency({
            directory: process.cwd(),
            packagePath: directory
        });

        await updateDependencyBinPermissions({ directory });

    }

};
