

import { defaults } from "../defaults";


export interface SettingsSchemaTests{
    glob: string | string[];
    schema: string;
}


export class NewsTeamSettingsPathsConfig{

    environments: string;

    glob: string | string[];

    handlers: string;

    validations: SettingsSchemaTests[];

    constructor(){

        this.environments = defaults.paths.settings.environments;

        this.glob = defaults.paths.settings.glob;

        this.handlers = defaults.paths.settings.handlers;

        this.validations = defaults.paths.settings.validations;

    }

}
