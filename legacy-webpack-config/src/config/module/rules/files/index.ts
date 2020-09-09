

import { merge } from "webpack-merge";
import type { Configuration } from "webpack";

import { cacheLoader } from "../../../../shared/loaders/cache";
import { fileLoader } from "../../../../shared/loaders/file";
import type { Options } from "../../../..";


export const files = function(
    config: Configuration,
    options: Options
): Configuration{

    return merge(config, {
        module: {
            rules: [

                /*
                 * .txt and .json file extensions
                 */
                {
                    exclude: /node_modules/u,
                    test: /\.(?:txt)$/u,
                    use: [
                        cacheLoader(),
                        fileLoader(config, options)
                    ]
                }
            ]
        }
    });

};
