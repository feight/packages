

import { NewsTeamLocalDockerContainerConfig } from "../container";
import { defaults } from "../../../defaults";

import type { LocalDockerContainerConfig } from "../container";


export type LocalDockerMySQLConfig = LocalDockerContainerConfig;

export class NewsTeamLocalDockerMySQLConfig extends NewsTeamLocalDockerContainerConfig{

    constructor(config?: LocalDockerMySQLConfig){

        super({
            environment: config?.environment ?? defaults.local.docker.mysql.environment,
            name: "cosmos-mysql",
            port: config?.port ?? defaults.local.docker.mysql.port,
            recipe: config?.recipe ?? defaults.local.docker.mysql.recipe,
            volume: config?.volume ?? defaults.local.docker.elasticsearch.volume
        });

    }

}
