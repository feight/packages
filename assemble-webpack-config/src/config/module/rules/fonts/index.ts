

import merge from "webpack-merge";
import { Configuration } from "webpack";

import fileLoader from "../../../../shared/loaders/file";
import { Options } from "../../../..";


export const fonts = function(
    config: Configuration,
    options: Options
): Configuration{

    return merge(config, {
        module: {
            rules: [
                // .ttf .otf .eot .woff and .woff2 font extensions
                {
                    test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]=.*)?$/gu,
                    use: [fileLoader(config, options)]
                }
            ]
        }
    });

};
