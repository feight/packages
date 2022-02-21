

import { NewsTeamLocalDockerContainerConfig } from "../container";
import { defaults } from "../../../defaults";

import type { LocalDockerContainerConfig } from "../container";


export type LocalDockerElasticSearchConfig = LocalDockerContainerConfig;

export class NewsTeamLocalDockerElasticSearchConfig extends NewsTeamLocalDockerContainerConfig{

    constructor(config?: LocalDockerElasticSearchConfig){

        super({
            environment: config?.environment ?? defaults.local.docker.elasticsearch.environment,
            name: "cosmos-elasticsearch",
            port: config?.port ?? defaults.local.docker.elasticsearch.port,
            recipe: config?.recipe ?? defaults.local.docker.elasticsearch.recipe,
            volume: config?.volume ?? defaults.local.docker.elasticsearch.volume
        });

    }

}
