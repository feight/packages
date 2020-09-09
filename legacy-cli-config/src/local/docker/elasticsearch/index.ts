

import type {
    LocalDockerContainerConfig
} from "../container";
import {
    NewsTeamLocalDockerContainerConfig
} from "../container";
import { defaults } from "../../../defaults";


export type LocalDockerElasticSearchConfig = LocalDockerContainerConfig;

export class NewsTeamLocalDockerElasticSearchConfig extends NewsTeamLocalDockerContainerConfig{

    constructor(config?: LocalDockerElasticSearchConfig){

        super({
            environment: config?.environment ?? defaults.local.docker.elasticsearch.environment,
            name: "elasticsearch",
            port: config?.port ?? defaults.local.docker.elasticsearch.port,
            recipe: config?.recipe ?? defaults.local.docker.elasticsearch.recipe
        });

    }

}
