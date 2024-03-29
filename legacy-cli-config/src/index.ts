

/*

    eslint

    node/global-require: "off",
    @typescript-eslint/no-require-imports: "off",
    @typescript-eslint/no-var-requires: "off",
    import/no-commonjs: "off",
    import/no-dynamic-require: "off",
    security/detect-non-literal-require: "off",

    --

    Since this is all configuration it makes sense to disable these rules to
    make things easier.

*/


import path from "path";

import "reflect-metadata";

import fs from "fs-extra";
import merge from "deepmerge";
import { Validate } from "@newsteam/schema";

import * as htmllint from "./htmllint";
import * as htmlmin from "./htmlmin";
import * as lint from "./lint";
import * as local from "./local";
import * as paths from "./paths";
import * as modernizr from "./modernizr";
import * as webpack from "./webpack";

// eslint-disable-next-line @typescript-eslint/no-shadow -- copy pasted from stack overflow
type ElementType < T extends readonly unknown[] > = T extends readonly (infer ElementType)[] ? ElementType : never;


const cwd = process.cwd();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call -- This is required for runtime ts execution
require("ts-node").register({
    project: path.join(cwd, "tsconfig.json"),
    transpileOnly: true
});

const configPathBase = path.resolve(path.join(cwd, ".newsteam.ts"));
const configPathLocal = path.resolve(path.join(cwd, ".newsteam.local.ts"));
const configBase = (fs.existsSync(configPathBase) ? require(path.relative(__dirname, configPathBase)) : { config: {} }) as { config?: Config };
const configLocal = (fs.existsSync(configPathLocal) ? require(path.relative(__dirname, configPathLocal)) : { config: {} }) as { config?: Config };

if(!configBase.config){
    throw new Error(`${ configPathBase } has no exported member 'config'`);
}

if(!configLocal.config){
    throw new Error(`${ configPathLocal } has no exported member 'config'`);
}

const overrides: Config = merge.all([
    configBase.config,
    configLocal.config
]);


export const modes = ["development", "production"] as const;
export const targets = ["client", "server"] as const;


export type Mode = ElementType<typeof modes>;
export type Target = ElementType<typeof targets>;


export type { ModernizrConfig } from "./modernizr/types";
export type { SettingsSchemaTests } from "./paths/settings";


export interface Config{

    lint?: lint.LintConfig;

    local?: local.LocalConfig;

    modernizr?: modernizr.NewsTeamModernizrConfig;

    webpack?: webpack.WebpackConfig;

}


export class NewsTeamConfig{

    cwd: string;

    htmllint: htmllint.NewsTeamHTMLLintConfig;

    htmlmin: htmlmin.NewsTeamHTMLMinConfig;

    lint: lint.NewsTeamLintConfig;

    local: local.NewsTeamLocalConfig;

    modernizr: modernizr.NewsTeamModernizrConfig;

    paths: paths.NewsTeamPathsConfig;

    webpack: webpack.NewsTeamWebpackConfig;

    constructor(config: Config){

        this.cwd = cwd;

        this.htmllint = new htmllint.NewsTeamHTMLLintConfig();

        this.htmlmin = new htmlmin.NewsTeamHTMLMinConfig();

        this.lint = new lint.NewsTeamLintConfig(config.lint);

        this.local = new local.NewsTeamLocalConfig(config.local);

        this.modernizr = new modernizr.NewsTeamModernizrConfig();

        this.paths = new paths.NewsTeamPathsConfig();

        this.webpack = new webpack.NewsTeamWebpackConfig(config.webpack);

    }

}


export const config: NewsTeamConfig = Validate.validate(new NewsTeamConfig(overrides));
