

import type { RuleSetUseItem } from "webpack";


export const cacheLoader = function(): RuleSetUseItem{

    /*
     * The cache-loader allow to Caches the result of following loaders on disk
     * (default) or in the database.
     *
     * https://github.com/webpack-contrib/cache-loader
     */
    return {
        loader: "cache-loader",
        options: {
            cacheDirectory: ".newsteam/cache/webpack/cache-loader"
        }
    };

};