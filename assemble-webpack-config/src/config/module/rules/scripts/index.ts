

import merge from "webpack-merge";
import { Configuration } from "webpack";

import { babelLoader } from "../../../../shared/loaders/babel";
import { cacheLoader } from "../../../../shared/loaders/cache";


export const scripts = function(
    config: Configuration
): Configuration{

    return merge(config, {
        module: {
            rules: [
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
                        // CacheLoader(),
                        babelLoader()
                    ]
                },
                // .js and .jsx script extensions
                {
                    exclude: /node_modules/u,
                    test: /\.jsx?$/u,
                    use: [
                        // CacheLoader(),
                        babelLoader()
                    ]
                },
                // .ts and .tsx script extensions
                {
                    exclude: /node_modules/u,
                    test: /\.tsx?$/u,
                    use: [
                        // CacheLoader(),
                        babelLoader()
                    ]
                }
            ]
        }
    });

};
