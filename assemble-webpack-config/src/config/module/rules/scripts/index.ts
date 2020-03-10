

import merge from "webpack-merge";
import { Configuration } from "webpack";

import babelLoader from "../../../../shared/loaders/babel";


export const scripts = function(
    config: Configuration
): Configuration{

    const loader = babelLoader();

    return merge(config, {
        module: {
            rules: [
                // Modernizr integration
                {
                    loader: "modernizr-loader",
                    test: /\.modernizrrc.js$/gu
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
                    use: [loader]
                },
                // .js and .jsx script extensions
                {
                    exclude: /node_modules/u,
                    test: /\.jsx?$/u,
                    use: [loader]
                },
                // .ts and .tsx script extensions
                {
                    exclude: /node_modules/u,
                    test: /\.tsx?$/u,
                    use: [loader]
                }
            ]
        }
    });

};
