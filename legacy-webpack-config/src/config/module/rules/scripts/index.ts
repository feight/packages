

import type {
    Configuration,
    RuleSetRule
} from "webpack";

import { babelLoader } from "../../../../shared/loaders/babel";


export const scripts = function(
    config: Configuration
): RuleSetRule[]{

    return [
        // Modernizr integration
        {
            loader: "modernizr-loader",
            test: /\.modernizrrc.js$/u
        },
        // .mjs script extension
        {
            test: /\.mjs$/u,

            /*
             * Bypasses webpack's built-in json importing, we want to
             * match node_modules too because it'll help with tree
             * shaking of external dependencies where possible.
             */
            type: "javascript/auto",
            use: [
                babelLoader(config)
            ]
        },
        // .js and .jsx script extensions
        {
            exclude: /node_modules/u,
            test: /\.jsx?$/u,
            use: [
                babelLoader(config)
            ]
        },
        // .ts and .tsx script extensions
        {
            exclude: /node_modules/u,
            test: /\.tsx?$/u,
            use: [
                babelLoader(config)
            ]
        }
    ];

};
