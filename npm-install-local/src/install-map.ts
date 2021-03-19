
import { getCache } from "./cache";
import type { Dependency } from "./dependency";
import { getDependencyMap } from "./dependency";
import {
    getDependenciesHash,
    getSourceCodeHash
} from "./hash";


export interface Pipeline{
    install: Dependency[];
    update: Dependency[];
    updated: Dependency[];
}


export const getInstallMap = async function(): Promise<{
    dependencies: Dependency[];
    pipeline: Pipeline;
}>{

    const root = process.cwd();
    const dependencies = await getDependencyMap(root);

    const pipeline: Pipeline = {
        install: [],
        update: [],
        updated: []
    };

    const cache = await getCache(dependencies);

    const depsHash = await getDependenciesHash(dependencies);
    const depsCache = cache.dependencies;

    for(const {
        directory,
        packageName
    } of dependencies){

        const codeHash = await getSourceCodeHash(directory);
        const codeCache = (cache.sourceCode ?? {})[packageName];

        if(
            depsCache === depsHash &&
            codeCache === codeHash
        ){

            pipeline.updated.push({
                directory,
                packageName
            });

        }else if(depsCache !== depsHash){

            pipeline.install.push({
                directory,
                packageName
            });

        }else if(codeCache !== codeHash){

            pipeline.update.push({
                directory,
                packageName
            });

        }

    }

    return {
        dependencies,
        pipeline
    };

};
