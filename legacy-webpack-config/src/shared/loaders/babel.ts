

import type {
    Configuration,
    RuleSetUseItem
} from "webpack";


export const babelLoader = function(config: Configuration): RuleSetUseItem{

    /*
     * This loader transpiles JavaScript files using Babel.
     *
     * https://github.com/babel/babel-loader
     */
    return {
        loader: "babel-loader",
        options: {
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
        }
    };

};
