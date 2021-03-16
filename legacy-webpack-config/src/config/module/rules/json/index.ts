

import type { RuleSetRule } from "webpack";


export const json = function(): RuleSetRule[]{

    return [
        // .json file extensions
        {
            test: /\.json$/u,
            type: "javascript/auto",
            use: [
                "json-loader"
            ]
        }
    ];

};
