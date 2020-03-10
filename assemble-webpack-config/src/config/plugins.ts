

import path from "path";

import DuplicatePackageCheckerPlugin from "duplicate-package-checker-webpack-plugin";
import merge from "webpack-merge";
import AssetsPlugin from "assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";


import { Options } from "..";


export const plugins = function(
    options: Options
): webpack.Configuration{

    const hash = options.mode !== "development" || !options.watch;

    const webpackPlugins = [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new AssetsPlugin({
            filename: "webpack-assets.json",
            path: path.resolve(options.cwd, "src/build")
        }),
        new webpack.DefinePlugin({
            "process.env.CLIENT": JSON.stringify("browser"),
            // This is alright since it's an override of a process env variable
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new MiniCssExtractPlugin({
            chunkFilename: hash ? "[chunkhash].css" : "[id].css",
            filename: hash ? "[chunkhash].css" : "[name].css"
        })
    ];

    if(options.watch){

        webpackPlugins.push(new BundleAnalyzerPlugin({
            analyzerHost: "127.0.0.1",
            analyzerMode: "server",
            analyzerPort: options.ports.bundleAnalyzer,
            defaultSizes: "parsed",
            generateStatsFile: false,
            logLevel: "info",
            openAnalyzer: false,
            reportFilename: "report.html",
            statsFilename: "stats.json",
            statsOptions: null
        }));

    }

    return {
        plugins: webpackPlugins
    };

};
