

import merge from "webpack-merge";
import { Configuration } from "webpack";


export const jquery = function(
    config: Configuration
): Configuration{

    return merge(config, {
        module: {
            rules: [
                {
                    // Doesn't matter this isn't present here
                    // eslint-disable-next-line node/no-missing-require
                    test: require.resolve("jquery"),
                    use: [
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
