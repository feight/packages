

import { defaults } from "../defaults";


export class NewsTeamSettingsPathsConfig{

    environments: string;

    handlers: string;

    constructor(){

        this.environments = defaults.paths.settings.environments;

        this.handlers = defaults.paths.settings.handlers;

    }

}
