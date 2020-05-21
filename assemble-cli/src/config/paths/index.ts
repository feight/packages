

import * as settings from "./settings";

import { defaults } from "../defaults";


export interface GlobMapping{
    glob: string | string[];
    ignore?: string | string[];
}

export interface ModernizrPaths extends GlobMapping{
    filename: string;
}

export interface WidgetsPaths extends GlobMapping{
    roots: string[];
}


export class NewsTeamPathsConfig{

    build: string;

    clients: string;

    entries: GlobMapping;

    html: GlobMapping;

    modernizr: ModernizrPaths;

    npm: {
        manifests: string[];
    };

    scripts: GlobMapping;

    settings: settings.NewsTeamSettingsPathsConfig;

    source: string;

    static: GlobMapping;

    styles: GlobMapping;

    rss: GlobMapping;

    webpack: {
        config: string;
    };

    widgets: WidgetsPaths;

    yaml: string;

    constructor(){

        this.build = defaults.paths.build;

        this.clients = defaults.paths.clients;

        this.entries = defaults.paths.entries;

        this.html = defaults.paths.html;

        this.modernizr = defaults.paths.modernizr;

        this.npm = defaults.paths.npm;

        this.settings = new settings.NewsTeamSettingsPathsConfig();

        this.source = defaults.paths.source;

        this.scripts = defaults.paths.scripts;

        this.static = defaults.paths.static;

        this.styles = defaults.paths.styles;

        this.rss = defaults.paths.rss;

        this.webpack = defaults.paths.webpack;

        this.widgets = defaults.paths.widgets;

        this.yaml = defaults.paths.yaml;

    }

}
