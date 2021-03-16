

import type {
    Configuration,
    RuleSetRule
} from "webpack";

import { fileLoader } from "../../../../shared/loaders/file";
import type { Options } from "../../../..";


export const files = function(
    config: Configuration,
    options: Options
): RuleSetRule[]{

    return [

        /*
         * .txt and .json file extensions
         */
        {
            exclude: /node_modules/u,
            test: /\.(?:txt)$/u,
            use: [
                fileLoader(config, options)
            ]
        }
    ];

};
