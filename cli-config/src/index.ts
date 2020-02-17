

import "reflect-metadata";

import { rcFile } from "rc-config-loader";
import { Validate } from "@newsteam/schema";

import * as local from "./local";


const overrides: Config = rcFile("newsteam")?.config ?? {};


export type Mode = "development" | "production";


export type Platform = "desktop" | "mobile" | "web";


export type Target = "client" | "server";


export interface Config{

    local?: local.LocalConfig;

}


export class NewsTeamConfig{

    cwd: string;

    local: local.NewsTeamLocalConfig;

    constructor(config: Config){

        this.cwd = process.cwd();

        this.local = new local.NewsTeamLocalConfig(config.local);

    }

}


const unvalidated = new NewsTeamConfig(overrides);


export const config = Validate.validate(unvalidated);
