

import "reflect-metadata";

import { rcFile } from "rc-config-loader";
import merge from "deepmerge";
import { Validate } from "@newsteam/schema";

import * as htmlmin from "./htmlmin";
import * as local from "./local";
import * as paths from "./paths";
import * as modernizr from "./modernizr";


const cwd = process.cwd();


const overrides: Config = merge.all([
    rcFile("newsteam", {
        configFileName: ".newsteam.js",
        cwd
    })?.config ?? {},
    rcFile("newsteam.local", {
        configFileName: ".newsteam.local.js",
        cwd
    })?.config ?? {}
]);


export type Mode = "development" | "production";
export type Platform = "desktop" | "mobile" | "web";
export type Target = "client" | "server";


export { ModernizrConfig } from "./modernizr/types";
export { SettingsSchemaTests } from "./paths/settings";


export interface Config{

    local?: local.LocalConfig;

    modernizr?: modernizr.NewsTeamModernizrConfig;

}


export class NewsTeamConfig{

    cwd: string;

    htmlmin: htmlmin.NewsTeamHTMLMinConfig;

    local: local.NewsTeamLocalConfig;

    modernizr: modernizr.NewsTeamModernizrConfig;

    paths: paths.NewsTeamPathsConfig;

    constructor(config: Config){

        this.cwd = cwd;

        this.htmlmin = new htmlmin.NewsTeamHTMLMinConfig();

        this.local = new local.NewsTeamLocalConfig(config.local);

        this.modernizr = new modernizr.NewsTeamModernizrConfig();

        this.paths = new paths.NewsTeamPathsConfig();

    }

}


export const config: NewsTeamConfig = Validate.validate(new NewsTeamConfig(overrides));
