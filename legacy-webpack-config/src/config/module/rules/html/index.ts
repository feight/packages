

import type { RuleSetRule } from "webpack";

import { cacheLoader } from "../../../../shared/loaders/cache";


export const html = function(): RuleSetRule[]{

    return [
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
    ];

};
