

import { rcFile } from "rc-config-loader";
import merge from "deepmerge";

import { ModernizrConfig } from "./types";


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
        arrayMerge: (target, source) => target.concat(source.filter((item) => !target.includes(item)))
    })
};


export class NewsTeamModernizrConfig{

    config: ModernizrConfig;

    constructor(){

        this.config = modernizrConfig;

    }

}
