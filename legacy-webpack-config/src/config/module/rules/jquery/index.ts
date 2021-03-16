

import type { RuleSetRule } from "webpack";


export const jquery = function(): RuleSetRule[]{

    return [
        {
            test: require.resolve("jquery"),
            use: [
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
