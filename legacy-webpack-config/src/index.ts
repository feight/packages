

import { config as assembleCliConfig } from "@newsteam/legacy-cli-config";

import * as configs from "./config";

import type { Configuration } from "webpack";


// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This provides a stack trace for deprecation warnings
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
        const configuration = {
            ...options.config,
            ...configs.output(genOptions)
        };

        // Deep merge all base configuration with custom configuration
        const merged = {
            ...configs.cache(genOptions),
            ...configs.devtool(genOptions),
            ...configs.entry(),
            ...configs.module(genOptions, configuration),
            ...configs.mode(genOptions),
            ...configs.node(),
            ...configs.optimization(genOptions),
            ...configs.performance(genOptions),
            ...configs.plugins(genOptions),
            ...configs.resolve(genOptions, configuration),
            ...configs.stats(),
            ...configs.watchOptions(),

            // Force output config
            ...configs.output(genOptions)

        };

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
