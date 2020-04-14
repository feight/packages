

import path from "path";

import fs from "fs-extra";


import { Dependency } from "./dependency";
import {
    getDependenciesHash,
    getSourceCodeHash
} from "./hash";


export interface CacheMap{

    dependencies?: string;

    sourceCode?: Record<string, string | undefined>;

}


export const getCache = async function(dependencies: Dependency[]): Promise<CacheMap>{

    const cacheDirectory = path.join(process.cwd(), ".local/cache/@newsteam/npm-install-local");
    const cacheJsonPath = path.join(cacheDirectory, "cache.json");
    const packageJSONExists = fs.existsSync(cacheJsonPath);

    let json = {};

    if(packageJSONExists){

        const raw = await fs.readFile(cacheJsonPath);

        json = JSON.parse(raw.toString()) as CacheMap;

    }

    /*
     * If any dependencies don't exist in the node_modules folder invalidate the
     * entire cache.
     */
    for(const { packageName } of dependencies){

        if(!fs.existsSync(path.join(process.cwd(), "node_modules", packageName))){

            return {};

        }

    }

    return json;

};


export const setCache = async function(dependencies: Dependency[]): Promise<void>{

    const cacheDirectory = path.join(process.cwd(), "node_modules/.cache");
    const cacheJsonPath = path.join(cacheDirectory, "npm-install-local.json");

    const cache: CacheMap = {
        dependencies: await getDependenciesHash(dependencies),
        sourceCode: {}
    };

    for(const {
        directory,
        packageName
    } of dependencies){

        cache.sourceCode = cache.sourceCode ?? {};
        cache.sourceCode[packageName] = await getSourceCodeHash(directory);

    }

    await fs.ensureDir(cacheDirectory);
    await fs.writeFile(cacheJsonPath, JSON.stringify(cache, null, 2), "utf-8");

};
