

import path from "path";

import type { DependencyMap } from "./package-json";


const resolvePath = function(filepath: string): string{

    if(filepath.startsWith("~") && process.env.HOME){
        return path.resolve(path.join(process.env.HOME, filepath.slice(1)));
    }

    return path.resolve(filepath);

};


export const resolveDependencyMapPaths = function(dependencies?: DependencyMap): DependencyMap{

    // Replace all keys in the object with the resolved path
    // eslint-disable-next-line unicorn/no-array-reduce -- see above
    return dependencies ? Object.keys(dependencies).reduce((accumulator, current) => {

        if(dependencies[current]){

            return {
                ...accumulator,
                [current]: resolvePath(dependencies[current])
            };
        }

        return accumulator;

    }, {}) : {};

};
