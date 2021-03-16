

import type { RuleSetRule } from "webpack";


export const html = function(): RuleSetRule[]{

    return [
        // .html file extensions
        {
            test: /\.html$/u,
            use: [
                {
                    loader: "html-loader",
                    options: {
                        minimize: {
                            collapseWhitespace: true,
                            removeComments: true
                        },
                        sources: false
                    }
                }
            ]
        }
    ];

};
