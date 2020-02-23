

import { Options as HTMLMinifierOptions } from "html-minifier";

import { defaults } from "../defaults";


export class NewsTeamHTMLMinConfig{

    glob: string;

    ignore: string | string[];

    options: HTMLMinifierOptions;

    constructor(){

        this.glob = defaults.htmlmin.glob;

        this.ignore = defaults.htmlmin.ignore;

        this.options = defaults.htmlmin.options;

    }

}
