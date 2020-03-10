

import merge from "webpack-merge";
import { Configuration } from "webpack";


export const html = function(config: Configuration): Configuration{

    return merge(config, {
        module: {
            rules: [
                // .html file extensions
                {
                    test: /\.html$/u,
                    use: {
                        loader: "html-loader",
                        options: {
                            collapseWhitespace: true,
                            minimize: true,
                            removeComments: true
                        }
                    }
                }
            ]
        }
    });

};
