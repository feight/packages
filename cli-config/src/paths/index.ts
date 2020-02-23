

import * as settings from "./settings";

import { defaults } from "../defaults";


export class NewsTeamPathsConfig{

    build: string;

    clients: string;

    settings: settings.NewsTeamSettingsPathsConfig;

    source: string;

    yaml: string;

    constructor(){

        this.build = defaults.paths.build;

        this.clients = defaults.paths.clients;

        this.settings = new settings.NewsTeamSettingsPathsConfig();

        this.source = defaults.paths.source;

        this.yaml = defaults.paths.yaml;

    }

}
