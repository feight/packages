

import { rcFile } from "rc-config-loader";
import merge from "deepmerge";

import type { ModernizrConfig } from "@newsteam/cli-tasks";


const modernizrConfig: ModernizrConfig = {
    ...merge.all([
        rcFile("modernizr", {
            configFileName: ".modernizr",
            cwd: __dirname
        })?.config ?? {},
        rcFile("modernizr", {
            configFileName: ".modernizr",
            cwd: process.cwd()
        })?.config ?? {}
    ], {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment -- This is safe in this context
        arrayMerge: (target, source) => [...target, ...source.filter((item) => !target.includes(item))]
    })
};

export class NewsTeamModernizrConfig{

    config: ModernizrConfig;

    constructor(){

        this.config = modernizrConfig;

    }

}
