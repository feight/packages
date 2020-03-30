
/*
 *  Integrate https://webpack.js.org/loaders/cache-loader/
 *      clean this cache in the clean cache task and add that task to the postinstall
 * maybe use https://webpack.js.org/loaders/thread-loader/
 */


import { Configuration } from "webpack";
import merge from "webpack-merge";

import * as configs from "./config";


const generateOptions = function(options: ConfigOptions, environment: Environment, args: Args): Options{

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
        ...options
    };

};

export type Mode = "development" | "production";
export type Platform = "desktop" | "mobile" | "web";
export type Target = "client" | "server";


export interface PortConfigOptions{
    bundleAnalyzer: number;
    devServer: number;
}


export interface ConfigOptions{
    bundleAnalyzer?: boolean;
    config?: Configuration;
    outputPath?: string;
    ports?: PortConfigOptions;
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
    config?: Configuration;
    cwd: string;
    mode: Mode;
    outputPath: string;
    ports: PortConfigOptions;
    staticFolder: string;
    target: Target;
    targetPath: string;
    watch: boolean;
}


export const config = function(
    options: ConfigOptions = {}
){

    return (
        environment: Environment = {},
        args: Args = {}
    ): Configuration => {

        const opts = generateOptions(options, environment, args);
        const config = merge(options.config ?? {}, configs.output(opts));

        // Deep merge all base configuration with custom configuration
        const merged = merge(
            configs.devtool(opts),
            configs.entry(),
            configs.module(opts, config),
            configs.mode(opts),
            configs.node(),
            configs.optimization(opts),
            configs.performance(opts),
            configs.plugins(opts),
            configs.resolve(opts),
            configs.stats(),
            configs.watchOptions(),
            config
        );

        /*
         * Override the entry branch of configuration if one was specified in the
         * custom configuration
         */
        if(config.entry){
            merged.entry = config.entry;
        }

        return merged;

    };

};
