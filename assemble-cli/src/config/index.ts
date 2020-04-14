

/*

    eslint

    @typescript-eslint/no-require-imports: "off",
    @typescript-eslint/no-var-requires: "off",
    import/no-commonjs: "off",
    import/no-dynamic-require: "off",
    security/detect-non-literal-require: "off",

*/


import path from "path";

import "reflect-metadata";

import fs from "fs-extra";
import merge from "deepmerge";
import { Validate } from "@newsteam/schema";

import * as htmlmin from "./htmlmin";
import * as local from "./local";
import * as paths from "./paths";
import * as modernizr from "./modernizr";
import * as webpack from "./webpack";

type ElementType < T extends readonly unknown[] > = T extends readonly (infer ElementType)[] ? ElementType : never;


const cwd = process.cwd();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
require("ts-node").register({
    project: path.join(cwd, "tsconfig.json")
});

const configPathBase = path.resolve(path.join(cwd, ".newsteam.ts"));
const configPathLocal = path.resolve(path.join(cwd, ".newsteam.local.ts"));
const configBase = fs.existsSync(configPathBase) ? require(path.relative(__dirname, configPathBase)) : { config: {} };
const configLocal = fs.existsSync(configPathLocal) ? require(path.relative(__dirname, configPathLocal)) : { config: {} };

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
if(!configBase.config){
    throw new Error(`${ configPathBase } has no exported member 'config'`);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
if(!configLocal.config){
    throw new Error(`${ configPathLocal } has no exported member 'config'`);
}

const overrides: Config = merge.all([
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    configBase.config,
    configLocal.config
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
]);


export const platforms = ["desktop", "mobile", "web"] as const;
export const modes = ["development", "production"] as const;
export const targets = ["client", "server"] as const;


export type Platform = ElementType<typeof platforms>;
export type Mode = ElementType<typeof modes>;
export type Target = ElementType<typeof targets>;


export { ModernizrConfig } from "./modernizr/types";
export { SettingsSchemaTests } from "./paths/settings";


export interface Config{

    local?: local.LocalConfig;

    modernizr?: modernizr.NewsTeamModernizrConfig;

    webpack?: webpack.WebpackConfig;

}


export class NewsTeamConfig{

    cwd: string;

    htmlmin: htmlmin.NewsTeamHTMLMinConfig;

    local: local.NewsTeamLocalConfig;

    modernizr: modernizr.NewsTeamModernizrConfig;

    paths: paths.NewsTeamPathsConfig;

    webpack: webpack.NewsTeamWebpackConfig;

    constructor(config: Config){

        this.cwd = cwd;

        this.htmlmin = new htmlmin.NewsTeamHTMLMinConfig();

        this.local = new local.NewsTeamLocalConfig(config.local);

        this.modernizr = new modernizr.NewsTeamModernizrConfig();

        this.paths = new paths.NewsTeamPathsConfig();

        this.webpack = new webpack.NewsTeamWebpackConfig(config?.webpack);

    }

}


export const config: NewsTeamConfig = Validate.validate(new NewsTeamConfig(overrides));
