

import { defaults } from "../defaults";


export interface NPMConfig{

    manifests?: string[];

}


export class NewsTeamNPMConfig{

    manifests: string[];

    constructor(config?: NPMConfig){

        this.manifests = config?.manifests ?? defaults.npm.manifests;

    }

}
