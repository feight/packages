

import { NewLoader } from "webpack";


export const cacheLoader = function(): NewLoader{

    /*
     * The cache-loader allow to Caches the result of following loaders on disk
     * (default) or in the database.
     *
     * https://github.com/webpack-contrib/cache-loader
     */
    return {
        loader: "cache-loader",
        options: {
            cacheDirectory: ".local/cache/webpack/cache-loader"
        }
    };

};
