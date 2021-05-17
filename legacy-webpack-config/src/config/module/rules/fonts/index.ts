

import { fileLoader } from "../../../../shared/loaders/file";

import type {
    Configuration,
    RuleSetRule
} from "webpack";
import type { Options } from "../../../..";


export const fonts = function(
    config: Configuration,
    options: Options
): RuleSetRule[]{

    return [

        /*
         * .ttf .otf .eot .woff and .woff2 font extensions
         */
        {
            test: /.(ttf|ttx|otf|eot|woff(2)?)(\?[a-z0-9]=.*)?$/u,
            use: [
                fileLoader(config, options)
            ]
        }
    ];

};
