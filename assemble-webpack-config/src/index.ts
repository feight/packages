
/*
 *  Integrate https://webpack.js.org/loaders/cache-loader/
 *      clean this cache in the clean cache task and add that task to the postinstall
 * maybe use https://webpack.js.org/loaders/thread-loader/
 */


import { Configuration } from "webpack";
import merge from "webpack-merge";

import * as configs from "./config";


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


export const config = function(
    webpackConfig: Configuration = {},
    webpackOptions: ConfigurationOptions = {}
){

    return (
        environment: Environment = {},
        args: Args = {}
    ): Configuration => {

        const options = generateOptions(webpackOptions, environment, args);
        const configuration = merge(webpackConfig, configs.output(options));

        // Deep merge all base configuration with custom configuration
        const merged = merge(
            configs.devtool(options),
            configs.entry(),
            configs.module(options, configuration),
            configs.mode(options),
            configs.node(),
            configs.optimization(options),
            configs.performance(options),
            configs.plugins(options),
            configs.resolve(options),
            configs.stats(),
            configs.watchOptions(),
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
