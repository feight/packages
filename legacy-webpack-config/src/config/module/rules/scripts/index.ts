

import type {
    Configuration,
    RuleSetRule
} from "webpack";

import { babelLoader } from "../../../../shared/loaders/babel";
import { cacheLoader } from "../../../../shared/loaders/cache";


export const scripts = function(
    config: Configuration
): RuleSetRule[]{

    return [
        // Tinymce imports provider
        /*
         * {
         *  test: /tinymce5\/(themes|plugins|icons)\//u,
         *  use: [
         *      {
         *          loader: "imports-loader",
         *          options: {
         *              imports: [
         *                  {
         *                      moduleName: "tinymce5/tinymce",
         *                      name: "tinymce",
         *                      syntax: "default"
         *                  }
         *              ]
         *          }
         *      }
         *  ]
         *},
         */
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
                cacheLoader(),
                babelLoader(config)
            ]
        },
        // .js and .jsx script extensions
        {
            exclude: /node_modules/u,
            test: /\.jsx?$/u,
            use: [
                cacheLoader(),
                babelLoader(config)
            ]
        },
        // .ts and .tsx script extensions
        {
            exclude: /node_modules/u,
            test: /\.tsx?$/u,
            use: [
                cacheLoader(),
                babelLoader(config, false)
            ]
        }
    ];

};
