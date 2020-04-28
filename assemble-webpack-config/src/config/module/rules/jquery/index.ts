

import merge from "webpack-merge";
import { Configuration } from "webpack";

import { cacheLoader } from "../../../../shared/loaders/cache";


export const jquery = function(
    config: Configuration
): Configuration{

    return merge(config, {
        module: {
            rules: [
                {
                    test: require.resolve("jquery"),
                    use: [
                        // CacheLoader(),
                        {
                            loader: "expose-loader",
                            options: "jQuery"
                        },
                        {
                            loader: "expose-loader",
                            options: "$"
                        }
                    ]
                }
            ]
        }
    });

};
