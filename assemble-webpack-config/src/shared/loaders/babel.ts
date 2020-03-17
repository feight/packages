

import { NewLoader } from "webpack";


export const babelLoader = function(): NewLoader{

    /*
     * This loader transpiles JavaScript files using Babel.
     *
     * https://github.com/babel/babel-loader
     */
    return {
        loader: "babel-loader",
        options: {
            babelrc: false,
            plugins: [
                "syntax-dynamic-import",
                // Required for preact
                [
                    "transform-react-jsx",
                    { pragma: "h" }
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
        }
    };

};
