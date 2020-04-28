

import merge from "webpack-merge";
import { Configuration } from "webpack";

import { cacheLoader } from "../../../../shared/loaders/cache";
import { fileLoader } from "../../../../shared/loaders/file";
import { Options } from "../../../..";


export const files = function(
    config: Configuration,
    options: Options
): Configuration{

    return merge(config, {
        module: {
            rules: [

                /*
                 * CacheLoader(),
                 * .txt and .json file extensions
                 */
                {
                    exclude: /node_modules/u,
                    test: /\.(?:txt)$/u,
                    use: [fileLoader(config, options)]
                }
            ]
        }
    });

};
