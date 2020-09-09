

import { hashElement } from "folder-hash";
import objectHash from "object-hash";

import type {
    PackageJson
} from "../package-json";
import {
    getPackageJson
} from "../package-json";
import type { Dependency } from "../dependency";


export const getDependenciesHash = async function(dependencies: Dependency[]): Promise<string>{

    const dependenciesMap: Record<string, PackageJson> = {};

    for(const {
        directory,
        packageName
    } of dependencies){

        const packageJson = await getPackageJson(directory);

        dependenciesMap[packageName] = packageJson;

    }

    return objectHash(dependenciesMap);

};


export const getSourceCodeHash = async function(directory: string): Promise<string>{

    const sourceCodeHash = await hashElement(directory, {
        files: {
            include: [
                "*.js",
                "*.jsx",
                "*.ts",
                "*.tsx",
                "*.mjs",
                "*.json"
            ]
        },
        folders: {
            exclude: [
                "node_modules"
            ]
        }
    });

    return objectHash(sourceCodeHash.hash);

};
