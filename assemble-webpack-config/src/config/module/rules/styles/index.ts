

import { merge } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {
    Configuration,
    RuleSetUseItem
} from "webpack";
import postcssConfig from "@newsteam/postcss-config";
import sass from "sass";

import { cacheLoader } from "../../../../shared/loaders/cache";

/*
 * This plugin extracts CSS into separate files. It creates a CSS
 * file per JS file which contains CSS. It supports On-Demand-Loading
 * of CSS and SourceMaps.
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 */
const miniCssExtractPlugin = (): RuleSetUseItem => ({
    loader: MiniCssExtractPlugin.loader,
    options: {
        esModule: true
    }
});


/*
 * The css-loader interprets @import and url() like
 * import/require() and will resolve them.
 *
 * https://github.com/webpack-contrib/css-loader
 */
const cssLoader = (): RuleSetUseItem => ({
    loader: "css-loader",
    options: {
        sourceMap: true
    }
});


/*
 * A clean-css loader for webpack.
 *
 * clean-css is a fast and efficient CSS optimizer for Node.js platform
 * and any modern browser.
 *
 * https://www.npmjs.com/package/clean-css-loader
 */
const cleanCssLoader = (): RuleSetUseItem => ({
    loader: "clean-css-loader",
    options: {
        compatibility: "ie11",
        level: {
            1: {
                specialComments: 0
            }
        }
    }
});

/*
 * Loader for webpack to process CSS with PostCSS
 *
 * https://github.com/postcss/postcss-loader
 */
const postCssLoader = (): RuleSetUseItem => ({
    loader: "postcss-loader",
    options: postcssConfig
});


/*
 * Loads a Sass/SCSS file and compiles it to CSS.
 *
 * https://github.com/webpack-contrib/sass-loader
 */
const sassLoader = (): RuleSetUseItem => ({
    loader: "sass-loader",
    options: {
        implementation: sass,
        sassOptions: {
            includePaths: [
                "src/publication",
                "src/publication/node_modules",
                "node_modules",
                "src"
            ]
        },
        sourceMap: true
    }
});


export const styles = function(
    config: Configuration
): Configuration{

    return merge(config, {
        module: {
            rules: [
                {
                    test: /\.min\.css$/u,
                    use: [
                        miniCssExtractPlugin(),
                        cacheLoader(),
                        cssLoader()
                    ]
                },
                {
                    test: /^(.{0,3}|.*(?!\.min).{4})\.(css|scss)$/u,
                    use: [
                        miniCssExtractPlugin(),
                        cacheLoader(),
                        cssLoader(),
                        cleanCssLoader(),
                        postCssLoader(),
                        sassLoader()
                    ]
                }
            ]
        }
    });

};
