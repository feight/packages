
/*

    eslint

    security/detect-non-literal-fs-filename: "off"

    --

    This package can only read json and doesn't pose a risk through non-literal
    file names.

*/


import path from "path";
import { promises as fs } from "fs";


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

    readonly localDependencies?: DependencyMap;

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


export const getPackageJson = async function(jsonPath = "package.json"): Promise<PackageJson>{

    const stat = await fs.stat(jsonPath);
    const packageJsonPath = stat.isDirectory() ? path.join(jsonPath, "package.json") : jsonPath;

    await fs.stat(packageJsonPath).catch(() => {

        throw new Error(`File does not exist: ${ packageJsonPath }`);

    });

    const raw = await fs.readFile(packageJsonPath, { encoding: "utf8" });

    return JSON.parse(raw.toString()) as PackageJson;

};

