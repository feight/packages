

import merge from "webpack-merge";
import { Configuration } from "webpack";


export const json = function(config: Configuration): Configuration{

    return merge(config, {
        module: {
            rules: [
                // .json file extensions
                {
                    test: /\.json$/u,
                    type: "javascript/auto",
                    use: ["json-loader"]
                }
            ]
        }
    });

};
