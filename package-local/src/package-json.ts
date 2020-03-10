

import path from "path";

import fs from "fs-extra";


export interface CacheItem {

    dependencies: string;

    sourceCode: string;

}

export type CacheMap = Record<string, CacheItem>;


export interface PackageLocalJson extends Object {

    readonly cache?: CacheMap;

    readonly dependencies?: DependencyMap;

    readonly devDependencies?: DependencyMap;

}


export interface PackageJson extends Object {

    readonly author?: string|Author;

    readonly bin?: string|BinMap;

    readonly bugs?: string|Bugs;

    readonly bundledDependencies?: string[];

    readonly config?: Config;

    readonly contributors?: string[]|Author[];

    readonly cpu?: string[];

    readonly dependencies?: DependencyMap;

    readonly description?: string;

    readonly devDependencies?: DependencyMap;

    readonly directories?: Directories;

    readonly engines?: Engines;

    readonly files?: string[];

    readonly homepage?: string;

    readonly keywords?: string[];

    readonly license?: string;

    readonly main?: string;

    readonly man?: string|string[];

    readonly name: string;

    readonly optionalDependencies?: DependencyMap;

    readonly os?: string[];

    readonly peerDependencies?: DependencyMap;

    readonly preferGlobal?: boolean;

    readonly private?: boolean;

    readonly publishConfig?: PublishConfig;

    readonly repository?: string|Repository;

    readonly scripts?: ScriptsMap;

    readonly version?: string;

}

export interface Author {
    name: string;
    email?: string;
    homepage?: string;
}

export interface BinMap {
    [commandName: string]: string;
}

export interface Bugs {
    email: string;
    url: string;
}

export interface Config {
    name?: string;
    // This is chilled, we're not going to use this anyway
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: Record<string, any>;
}

export interface DependencyMap {
    [dependencyName: string]: string;
}

export interface Directories {
    lib?: string;
    bin?: string;
    man?: string;
    doc?: string;
    example?: string;
}

export interface Engines {
    node?: string;
    npm?: string;
}

export interface PublishConfig {
    registry?: string;
}

export interface Repository {
    type: string;
    url: string;
}

export interface ScriptsMap {
    [scriptName: string]: string;
}


export const getPackageJson = async function(directory: string): Promise<PackageJson>{

    const packageJSONPath = path.join(directory, "package.json");
    const packageJSONExists = fs.existsSync(packageJSONPath);

    if(packageJSONExists){

        const raw = await fs.readFile(path.join(directory, "package.json"));

        return JSON.parse(raw.toString()) as PackageJson;

    }

    throw new Error(`Could not find package.json in directory ${ directory }`);

};


export const getPackageLocalJson = async function(directory: string): Promise<PackageLocalJson>{

    const packageJSONPath = path.join(directory, "package-local.json");
    const packageJSONExists = fs.existsSync(packageJSONPath);

    let json = {};

    if(packageJSONExists){

        const raw = await fs.readFile(path.join(directory, "package-local.json"));

        json = JSON.parse(raw.toString()) as PackageLocalJson;

    }

    return json;

};
