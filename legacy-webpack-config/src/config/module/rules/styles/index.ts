

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type {
    Configuration,
    RuleSetUseItem,
    RuleSetRule
} from "webpack";
import postcssConfig from "@newsteam/postcss-config";
import sass from "sass";

import type { Options } from "../../../..";

/*
 * This plugin extracts CSS into separate files. It creates a CSS
 * file per JS file which contains CSS. It supports On-Demand-Loading
 * of CSS and SourceMaps.
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 */
const miniCssExtractPlugin = (
    config: Configuration,
    options: Options
): RuleSetUseItem => ({
    loader: MiniCssExtractPlugin.loader,
    options: {
        esModule: true,
        publicPath: config.output ? config.output.publicPath : `/${ options.staticFolder }/`
    }
});


/*
 * The css-loader interprets @import and url() like
 * import/require() and will resolve them.
 *
 * https://github.com/webpack-contrib/css-loader
 */
const cssLoader = (
    options: Options,
    modules = false,
    sourceMap = true
): RuleSetUseItem => {

    const baseOptions = {
        sourceMap
    };

    const developmentLocalIdentName = "/[path][name].[ext]::.[local]";
    const productionLocalIdentName = "[hash:base64]";

    return {
        loader: "css-loader",
        options: modules ? {
            ...baseOptions,
            importLoaders: 3,
            modules: {
                exportLocalsConvention: "camelCaseOnly",
                exportOnlyLocals: options.target === "server",
                localIdentName: options.mode === "development" ? developmentLocalIdentName : productionLocalIdentName
            }
        } : {
            ...baseOptions
        }
    };

};


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
    options: {
        postcssOptions: postcssConfig
    }
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
    config: Configuration,
    options: Options
): RuleSetRule[]{

    return [
        {
            test: /\.min\.css$/u,
            use: [
                miniCssExtractPlugin(config, options),
                cssLoader(options)
            ]
        },
        {
            include: /\.module\.scss$/u,
            test: /^(.{0,3}|.*(?!\.min).{4})\.scss$/u,
            use: [
                miniCssExtractPlugin(config, options),
                cssLoader(options, true),
                cleanCssLoader(),
                postCssLoader(),
                sassLoader()
            ]
        },
        {
            exclude: /\.module\.scss$/u,
            test: /^(.{0,3}|.*(?!\.min).{4})\.scss$/u,
            use: [
                miniCssExtractPlugin(config, options),
                cssLoader(options),
                cleanCssLoader(),
                postCssLoader(),
                sassLoader()
            ]
        },
        {
            include: /node_modules/u,
            test: /^(.{0,3}|.*(?!\.min).{4})\.css$/u,
            use: [
                miniCssExtractPlugin(config, options),
                cssLoader(options)
            ]
        }
    ];

};
