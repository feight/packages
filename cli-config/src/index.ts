

import "reflect-metadata";

import { rcFile } from "rc-config-loader";
import merge from "deepmerge";
import { Validate } from "@newsteam/schema";

import * as htmlmin from "./htmlmin";
import * as local from "./local";
import * as paths from "./paths";
import * as modernizr from "./modernizr";
import * as npm from "./npm";
import * as rss from "./rss";


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


export interface Config{

    local?: local.LocalConfig;

    modernizr?: modernizr.NewsTeamModernizrConfig;

}


export class NewsTeamConfig{

    cwd: string;

    htmlmin: htmlmin.NewsTeamHTMLMinConfig;

    local: local.NewsTeamLocalConfig;

    npm: npm.NewsTeamNPMConfig;

    modernizr: modernizr.NewsTeamModernizrConfig;

    paths: paths.NewsTeamPathsConfig;

    rss: rss.NewsTeamRSSConfig;

    constructor(config: Config){

        this.cwd = cwd;

        this.htmlmin = new htmlmin.NewsTeamHTMLMinConfig();

        this.local = new local.NewsTeamLocalConfig(config.local);

        this.npm = new npm.NewsTeamNPMConfig();

        this.modernizr = new modernizr.NewsTeamModernizrConfig(config.modernizr);

        this.paths = new paths.NewsTeamPathsConfig();

        this.rss = new rss.NewsTeamRSSConfig();

    }

}


const unvalidated = new NewsTeamConfig(overrides);


export const config: NewsTeamConfig = Validate.validate(unvalidated);
