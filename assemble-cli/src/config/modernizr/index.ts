

import { rcFile } from "rc-config-loader";
import merge from "deepmerge";
import { ModernizrConfig } from "@newsteam/cli-tasks";


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
        // This is safe in this context
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        arrayMerge: (target, source) => target.concat(source.filter((item) => !target.includes(item)))
    })
};


export class NewsTeamModernizrConfig{

    config: ModernizrConfig;

    constructor(){

        this.config = modernizrConfig;

    }

}
