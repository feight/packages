

import type { RuleSetRule } from "webpack";

import { cacheLoader } from "../../../../shared/loaders/cache";


export const jquery = function(): RuleSetRule[]{

    return [
        {
            test: require.resolve("jquery"),
            use: [
                cacheLoader(),
                {
                    loader: "expose-loader",
                    options: {
                        exposes: [
                            {
                                globalName: "$",
                                override: true
                            },
                            {
                                globalName: "jQuery",
                                override: true
                            }
                        ]
                    }
                }
            ]
        }
    ];

};
