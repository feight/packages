

import type { RuleSetRule } from "webpack";

import { cacheLoader } from "../../../../shared/loaders/cache";


export const json = function(): RuleSetRule[]{

    return [
        // .json file extensions
        {
            test: /\.json$/u,
            type: "javascript/auto",
            use: [
                cacheLoader(),
                "json-loader"
            ]
        }
    ];

};
