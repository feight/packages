

import path from "path";

import { rcFile } from "rc-config-loader";
import merge from "deepmerge";

import type { HTMLLintOptions } from "@newsteam/cli-tasks";


const htmlLintOptions: HTMLLintOptions = merge.all([
    rcFile("htmllint", {
        configFileName: ".htmllint",
        cwd: path.join(__dirname, "..")
    })?.config ?? {},
    rcFile("htmllint", {
        configFileName: ".htmllint",
        cwd: process.cwd()
    })?.config ?? {}
]);


export class NewsTeamHTMLLintConfig{

    options: HTMLLintOptions;

    constructor(){

        this.options = htmlLintOptions;

    }

}
