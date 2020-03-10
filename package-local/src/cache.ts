

import path from "path";

import fs from "fs-extra";

import {
    PackageLocalJson,
    getPackageLocalJson
} from "./package-json";


export const getDependenciesCache = async function(directory: string, packageName: string): Promise<string | undefined>{

    const parentPackageLocalJson = await getPackageLocalJson(directory);

    if(parentPackageLocalJson.cache && parentPackageLocalJson.cache[packageName]){

        return parentPackageLocalJson.cache[packageName].dependencies;

    }

    return undefined;

};


export const getSourceCodeCache = async function(directory: string, packageName: string): Promise<string | undefined>{

    const parentPackageLocalJson = await getPackageLocalJson(directory);

    if(parentPackageLocalJson.cache && parentPackageLocalJson.cache[packageName]){

        return parentPackageLocalJson.cache[packageName].sourceCode;

    }

    return undefined;

};


export const setDependenciesCache = async function(directory: string, packageName: string, hash: string): Promise<void>{

    const parentPackageLocalJson = await getPackageLocalJson(directory);

    const packageLocalJson: PackageLocalJson = {
        ...parentPackageLocalJson,
        cache: {
            ...parentPackageLocalJson.cache,
            [packageName]: {
                ...(parentPackageLocalJson?.cache ?? {})[packageName],
                dependencies: hash
            }
        }
    };

    await fs.writeFile(path.join(directory, "package-local.json"), JSON.stringify(packageLocalJson, null, 2), "utf-8");

};


export const setSourceCodeCache = async function(directory: string, packageName: string, hash: string): Promise<void>{

    const parentPackageLocalJson = await getPackageLocalJson(directory);

    const packageLocalJson: PackageLocalJson = {
        ...parentPackageLocalJson,
        cache: {
            ...parentPackageLocalJson.cache,
            [packageName]: {
                ...(parentPackageLocalJson?.cache ?? {})[packageName],
                sourceCode: hash
            }
        }
    };

    await fs.writeFile(path.join(directory, "package-local.json"), JSON.stringify(packageLocalJson, null, 2), "utf-8");

};
