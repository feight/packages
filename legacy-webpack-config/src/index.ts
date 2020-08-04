
/*
 *  Integrate https://webpack.js.org/loaders/cache-loader/
 *      clean this cache in the clean cache task and add that task to the postinstall
 * maybe use https://webpack.js.org/loaders/thread-loader/
 */

import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import { config as assembleCliConfig } from "@newsteam/legacy-cli-config";

import * as configs from "./config";


// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- This provides a stack trace for deprecation warnings
(process as any).traceDeprecation = true;


const generateOptions = function(options: ConfigOptions, environment: Environment, args: Args): Options{

    const optionsDefaults: Options = {
        bundleAnalyzer: assembleCliConfig.webpack.bundleAnalyzer,
        cwd: process.cwd(),
        developmentServer: assembleCliConfig.webpack.developmentServer,
        mode: args.mode ?? "development",
        progress: true,
        staticFolder: "static",
        target: "client",
        targetPath: "",
        watch: args.watch ?? false
    };

    return {
        ...optionsDefaults,
        ...options
    };

};

export type Mode = "development" | "production";
export type Platform = "desktop" | "mobile" | "web";
export type Target = "client" | "server";


export interface ConfigOptions{
    bundleAnalyzer?: {
        enabled: boolean;
        port: number;
    };
    config?: Configuration;
    progress?: boolean;
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
    bundleAnalyzer: {
        enabled: boolean;
        port: number;
    };
    config?: Configuration;
    cwd: string;
    developmentServer: {
        port: number;
    };
    mode: Mode;
    progress: boolean;
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

        const genOptions = generateOptions(options, environment, args);
        const configuration = merge(options.config ?? {}, configs.output(genOptions));

        // Deep merge all base configuration with custom configuration
        const merged = merge(
            configs.devtool(genOptions),
            configs.entry(),
            configs.module(genOptions, configuration),
            configs.mode(genOptions),
            configs.node(),
            configs.optimization(genOptions),
            configs.performance(genOptions),
            configs.plugins(genOptions),
            configs.resolve(genOptions),
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
