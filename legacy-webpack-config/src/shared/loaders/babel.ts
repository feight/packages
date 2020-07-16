

import {
    Configuration,
    NewLoader
} from "webpack";


export const babelLoader = function(config: Configuration, legacy = true): NewLoader{

    const legacyOptions = {
        babelrc: false,
        plugins: [
            "@babel/plugin-syntax-dynamic-import",
            // Required for preact
            [
                "@babel/plugin-transform-react-jsx",
                {
                    pragma: "h"
                }
            ]
        ],
        presets: [
            [
                "@babel/preset-env",
                {
                    targets: {
                        browsers: [
                            "last 2 chrome versions",
                            "last 2 edge versions",
                            "last 2 firefox versions",
                            "last 2 safari versions",
                            "last 2 ios_saf versions",
                            "last 1 android versions",
                            "last 2 and_chr versions",
                            "last 2 and_ff versions",
                            "last 2 opera versions",
                            "ie >= 10"
                        ]
                    }
                }
            ]
        ]
    };

    const options = {
        babelrc: false,

        /*
         * Leave comments in the transpiled code. This is important because
         * webpack uses comment to resolve dynamic imports.
         */
        comments: true,
        presets: [
            [
                "@newsteam/babel-preset",
                {
                    development: config.mode === "development",
                    modules: false,
                    targets: {
                        esmodules: true
                    }
                }
            ]
        ]
    };

    /*
     * This loader transpiles JavaScript files using Babel.
     *
     * https://github.com/babel/babel-loader
     */
    return {
        loader: "babel-loader",
        options: legacy ? legacyOptions : options
    };

};
