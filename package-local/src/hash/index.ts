

import { hashElement } from "folder-hash";
import objectHash from "object-hash";

import { getPackageJson } from "../package-json";


export const getDependenciesHash = async function(directory: string): Promise<string>{

    const packageJson = await getPackageJson(directory);

    return objectHash(packageJson?.dependencies ?? {});

};


export const getSourceCodeHash = async function(directory: string): Promise<string>{

    const sourceCodeHash = await hashElement(directory, {
        files: {
            exclude: [
                "package-local.json",
                "*.tgz"
            ],
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

    return sourceCodeHash.hash;

};
