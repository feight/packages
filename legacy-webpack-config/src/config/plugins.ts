

import path from "path";

import AssetsPlugin from "assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { logger } from "@newsteam/legacy-cli-logger";

import type { Options } from "..";


const label = "webpack";


export const plugins = function(
    options: Options
): webpack.Configuration{

    const hash = options.mode !== "development" || !options.watch;

    const bar = logger.progress({
        label,
        total: 100
    });

    const webpackPlugins: webpack.WebpackPluginInstance[] = [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            "process.env.CLIENT": JSON.stringify("browser"),
            // eslint-disable-next-line @typescript-eslint/naming-convention -- This is alright since it's an override of a process env variable
            "process.env.NODE_ENV": JSON.stringify(options.mode)
        }),
        new webpack.ProvidePlugin({
            // eslint-disable-next-line id-length -- This is alright because we need to provide $
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new AssetsPlugin({
            filename: "chunks.json",
            path: path.resolve(options.cwd, "src/build")
        }),
        new MiniCssExtractPlugin({
            chunkFilename: `build/chunks/${ hash ? "[chunkhash].css" : "[id].css" }`,
            filename: `build/chunks/${ hash ? "[chunkhash].css" : "[name].css" }`
        })
    ];

    if(options.progress){

        webpackPlugins.push(new webpack.ProgressPlugin({
            activeModules: false,
            entries: true,
            handler: (percentage: number): void => {

                bar.update(percentage);

            },
            modules: true,
            modulesCount: 10000
        }));

    }

    if(options.watch && options.bundleAnalyzer.enabled){

        webpackPlugins.push(new BundleAnalyzerPlugin({
            analyzerHost: "127.0.0.1",
            analyzerMode: "server",
            analyzerPort: options.bundleAnalyzer.port,
            defaultSizes: "parsed",
            generateStatsFile: false,
            logLevel: "info",
            openAnalyzer: false,
            reportFilename: "report.html",
            statsFilename: "stats.json",
            statsOptions: undefined
        }));

    }

    return {
        plugins: webpackPlugins
    };

};
