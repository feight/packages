
import path from "path";

import webpack, { Configuration } from "webpack";
import merge from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import postcssConfig from "@tamland/postcss-config";
import FileListPlugin from "webpack-file-list-plugin";


import * as configs from "./config";


const plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new FileListPlugin({
        filename: "chunks.json",
        path: path.resolve(process.cwd(), "src/build")
    }),
    new webpack.DefinePlugin({
        "process.env.CLIENT": JSON.stringify("browser"),
        "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new MiniCssExtractPlugin({
        chunkFilename: "build/publication/[id].[chunkhash].bundle.css",
        filename: "build/chunks/[name].[chunkhash].bundle.css"
    })
];

const generateOptions = function(webpackOptions: ConfigurationOptions, environment: Environment, args: Args): Options{

    if(environment.cwd === "x"){
        console.log([environment, args]);
    }

    const optionsDefaults: Options = {
        bundleAnalyzer: true,
        cwd: process.cwd(),
        mode: "development",
        outputPath: "dist",
        ports: {
            bundleAnalyzer: 3001,
            devServer: 3002
        },
        staticFolder: "static",
        target: "client",
        targetPath: "",
        watch: false
    };

    return {
        ...optionsDefaults,
        ...webpackOptions
    };

};

export type Mode = "development" | "production";
export type Platform = "desktop" | "mobile" | "web";
export type Target = "client" | "server";


export interface PortConfigurationOptions{
    bundleAnalyzer: number;
    devServer: number;
}


export interface ConfigurationOptions{
    bundleAnalyzer?: boolean;
    multipleTargeting?: boolean;
    outputPath?: string;
    ports?: PortConfigurationOptions;
    staticFolder?: string;
}


export interface Environment{
    cwd?: string;
    hostname?: string;
    mode?: Mode;
    platform?: Platform;
    target?: Target;
}

export interface Args{
    mode?: Mode;
    watch?: boolean;
}


export interface Options{
    bundleAnalyzer: boolean;
    cwd: string;
    mode: Mode;
    outputPath: string;
    ports: PortConfigurationOptions;
    staticFolder: string;
    target: Target;
    targetPath: string;
    watch: boolean;
}


// eslint-disable-next-line max-lines-per-function
export const config = function(
    webpackConfig: Configuration = {},
    webpackOptions: ConfigurationOptions = {}
): (
    environment: Environment,
    args: Args
) => Configuration{

    // eslint-disable-next-line max-lines-per-function
    return (
        environment: Environment = {},
        args: Args = {}
    ): Configuration => {

        const options = generateOptions(webpackOptions, environment, args);
        const configuration = merge(configs.output(options), webpackConfig);

        // Deep merge all base configuration with custom configuration
        const merged = merge(
            // Configs.devtool(options),
            configs.entry(),
            // Configs.mode(options),

            /*
             * Configs.module(options, configuration),
             * configs.node(),
             */

            /*
             * Configs.output(options),
             * Configs.plugins(options),
             */

            /*
             * Configs.resolve(options),
             * configs.stats(),
             */
            /*
             * configs.target(),
             * configs.watchOptions(),
             */
            {
                cache: true,
                devtool: "source-map",
                mode: "development",
                module: {
                    rules: [
                        {
                            test: require.resolve("jquery"),
                            use: [
                                {
                                    loader: "expose-loader",
                                    options: "jQuery"
                                },
                                {
                                    loader: "expose-loader",
                                    options: "$"
                                }
                            ]
                        },
                        {
                            test: /.(ttf|otf|eot|svg|woff(2)?)(\?[\da-z]+)?$/gu,
                            use: [
                                {
                                    loader: "file-loader",
                                    options: {
                                        name: "[name].[hash].[ext]",
                                        outputPath: "build/publication/fonts/"
                                    }
                                }
                            ]
                        },
                        {
                            test: /.(gif|png|jpg|jpeg?)(\?[\da-z]+)?$/gu,
                            use: [
                                {
                                    loader: "file-loader",
                                    options: {
                                        name: "[name].[hash].[ext]",
                                        outputPath: "build/publication/images/"
                                    }
                                }
                            ]
                        },
                        {
                            test: /^(.{0,3}|.*(?!\.min).{4})\.(js|jsx)$/gu,
                            use: [
                                {
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
                                }
                            ]
                        },
                        {
                            test: /\.min\.css$/gu,
                            use: [
                                MiniCssExtractPlugin.loader,
                                {
                                    loader: "css-loader",
                                    options: {
                                        sourceMap: false
                                    }
                                }
                            ]
                        },
                        {
                            test: /^(.{0,3}|.*(?!\.min).{4})\.(css|scss)$/gu,
                            use: [
                                MiniCssExtractPlugin.loader,
                                {
                                    loader: "css-loader",
                                    options: {
                                        sourceMap: false
                                    }
                                },
                                {
                                    loader: "clean-css-loader",
                                    options: {
                                        compatibility: "ie11",
                                        level: {
                                            1: {
                                                specialComments: 0
                                            }
                                        }
                                    }
                                },
                                {
                                    loader: "postcss-loader",
                                    options: postcssConfig
                                },
                                {
                                    loader: "sass-loader",
                                    options: {
                                        sassOptions: {
                                            includePaths: [
                                                "src/publication",
                                                "src/publication/node_modules",
                                                "node_modules",
                                                "src"
                                            ]
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            test: /\.html$/gu,
                            use: [
                                {
                                    loader: "html-loader",
                                    options: {
                                        collapseWhitespace: true,
                                        minimize: true,
                                        removeComments: true
                                    }
                                }
                            ]
                        }
                    ]
                },
                output: {
                    filename: "build/chunks/[name].[chunkhash].bundle.js",
                    path: "/Users/sweetlikepete/code/newsteam/cosmos-gae/src",
                    publicPath: "/"
                },
                plugins,
                resolve: {
                    alias: {
                        base: "/Users/sweetlikepete/code/newsteam/cosmos-gae/src/publication/base",
                        build: "/Users/sweetlikepete/code/newsteam/cosmos-gae/src/build",
                        custom: "/Users/sweetlikepete/code/newsteam/cosmos-gae/src/publication/custom",
                        settings: "/Users/sweetlikepete/code/newsteam/cosmos-gae/src/settings",
                        shared: "/Users/sweetlikepete/code/newsteam/cosmos-gae/src/publication/shared"
                    },
                    extensions: [".js", ".jsx", ".scss", ".css", ".html"],
                    modules: ["node_modules", "src/publication/custom/node_modules", "src"],
                    symlinks: false
                },
                stats: { warnings: false },
                watch: undefined,
                watchOptions: {
                    aggregateTimeout: 300,
                    ignored: ["**/chunks.json", "node_modules"]
                }
            },
            configuration
        );

        /*
         * Override the entry branch of configuration if one was specified in the
         * custom configuration
         */
        if(configuration.entry){
            merged.entry = configuration.entry;
        }

        return merged;

    };

};
