

import { rcFile } from "rc-config-loader";
import merge from "deepmerge";

import type { Options as HTMLMinifierOptions } from "html-minifier";


const htmlMinifierOptions: HTMLMinifierOptions = merge.all([
    rcFile("htmlmin", {
        configFileName: ".htmlmin",
        cwd: __dirname
    })?.config ?? {},
    rcFile("htmlmin", {
        configFileName: ".htmlmin",
        cwd: process.cwd()
    })?.config ?? {}
]);


export class NewsTeamHTMLMinConfig{

    options: HTMLMinifierOptions;

    constructor(){

        this.options = htmlMinifierOptions;

    }

}
