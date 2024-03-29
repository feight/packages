

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

    readonly author?: Author | string;

    readonly bin?: BinMap | string;

    readonly bugs?: Bugs | string;

    readonly bundledDependencies?: string[];

    readonly config?: Config;

    readonly contributors?: Author[] | string[];

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

    readonly localDependencies?: DependencyMap;

    readonly main?: string;

    readonly man?: string[] | string;

    readonly name: string;

    readonly optionalDependencies?: DependencyMap;

    readonly os?: string[];

    readonly peerDependencies?: DependencyMap;

    readonly preferGlobal?: boolean;

    readonly private?: boolean;

    readonly publishConfig?: PublishConfig;

    readonly repository?: Repository | string;

    readonly scripts?: ScriptsMap;

    readonly version?: string;

}

export interface Author {
    name: string;
    email?: string;
    homepage?: string;
}

export type BinMap = Record<string, string>;

export interface Bugs {
    email: string;
    url: string;
}

export interface Config {
    name?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is chilled, we're not going to use this anyway
    config?: Record<string, any>;
}

export type DependencyMap = Record<string, string>;

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

export type ScriptsMap = Record<string, string>;


export const getPackageJson = async function(directory: string): Promise<PackageJson>{

    const packageJSONPath = path.join(directory, "package.json");
    const packageJSONExists = fs.existsSync(packageJSONPath);

    if(packageJSONExists){

        const raw = await fs.readFile(packageJSONPath);

        return JSON.parse(raw.toString()) as PackageJson;

    }

    throw new Error(`Could not find package.json in directory ${ directory }`);

};


export const getCacheJson = async function(directory: string): Promise<CacheMap>{

    const cacheDirectory = path.join(directory, ".newsteam/cache");
    const cacheJsonPath = path.join(cacheDirectory, "npm-install-local.json");
    const packageJSONExists = fs.existsSync(cacheJsonPath);

    let json = {};

    if(packageJSONExists){

        const raw = await fs.readFile(cacheJsonPath);

        json = JSON.parse(raw.toString()) as CacheMap;

    }

    return json;

};

