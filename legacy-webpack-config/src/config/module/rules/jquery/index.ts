

import { merge } from "webpack-merge";
import type { Configuration } from "webpack";

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
                        cacheLoader(),
                        {
                            loader: "expose-loader",
                            options: {
                                exposes: [
                                    {
                                        globalName: "$",
                                        override: true
                                    },
                                    {
                                        globalName: "jQuery",
                                        override: true
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    });

};
