

import { merge } from "webpack-merge";
import { Configuration } from "webpack";

import { cacheLoader } from "../../../../shared/loaders/cache";


export const html = function(config: Configuration): Configuration{

    return merge(config, {
        module: {
            rules: [
                // .html file extensions
                {
                    test: /\.html$/u,
                    use: [
                        cacheLoader(),
                        {
                            loader: "html-loader",
                            options: {
                                minimize: {
                                    collapseWhitespace: true,
                                    removeComments: true
                                }
                            }
                        }
                    ]
                }
            ]
        }
    });

};
