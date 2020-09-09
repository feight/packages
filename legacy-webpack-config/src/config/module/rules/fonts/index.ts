

import { merge } from "webpack-merge";
import type { Configuration } from "webpack";

import { fileLoader } from "../../../../shared/loaders/file";
import type { Options } from "../../../..";


export const fonts = function(
    config: Configuration,
    options: Options
): Configuration{

    return merge(config, {
        module: {
            rules: [

                /*
                 * .ttf .otf .eot .woff and .woff2 font extensions
                 */
                {
                    test: /.(ttf|ttx|otf|eot|woff(2)?)(\?[a-z0-9]=.*)?$/u,
                    use: [
                        fileLoader(config, options)
                    ]
                }
            ]
        }
    });

};
