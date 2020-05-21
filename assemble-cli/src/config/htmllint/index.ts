

import { rcFile } from "rc-config-loader";
import merge from "deepmerge";


const htmlLintOptions: HTMLLintOptions = merge.all([
    rcFile("htmllint", {
        configFileName: ".htmllint",
        cwd: __dirname
    })?.config ?? {},
    rcFile("htmllint", {
        configFileName: ".htmllint",
        cwd: process.cwd()
    })?.config ?? {}
]);


export interface HTMLLintOptions{
    config?: string;
    maxerr?: number;
    rules?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [id: string]: any;
    };
}


export class NewsTeamHTMLLintConfig{

    options: HTMLLintOptions;

    constructor(){

        this.options = htmlLintOptions;

    }

}
