

import path from "path";

import AssetsPlugin from "assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { logger } from "@newsteam/cli-logger";

import { Options } from "..";


const label = "webpack";


export const plugins = function(
    options: Options
): webpack.Configuration{

    const hash = options.mode !== "development" || !options.watch;

    const bar = logger.progress({
        label,
        total: 100
    });

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
            chunkFilename: `build/chunks/${ hash ? "[chunkhash].js" : "[id].css" }`,
            filename: `build/chunks/${ hash ? "[chunkhash].js" : "[name].css" }`
        })
    ].concat(options.watch ? [
        new webpack.NoEmitOnErrorsPlugin()
    ] : [
        // Don't show progress during the watch, it messes up the other output
        new webpack.ProgressPlugin({
            activeModules: false,
            entries: true,
            handler: (percentage: number) => {

                bar.update(percentage);

            },
            modules: true,
            modulesCount: 10000

        /*
         * Needed because the type definitions for this plugin don't match
         * the documentation
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
    ]);

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