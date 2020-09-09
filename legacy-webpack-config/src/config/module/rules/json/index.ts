

import { merge } from "webpack-merge";
import type { Configuration } from "webpack";

import { cacheLoader } from "../../../../shared/loaders/cache";


export const json = function(config: Configuration): Configuration{

    return merge(config, {
        module: {
            rules: [
                // .json file extensions
                {
                    test: /\.json$/u,
                    type: "javascript/auto",
                    use: [
                        cacheLoader(),
                        "json-loader"
                    ]
                }
            ]
        }
    });

};
