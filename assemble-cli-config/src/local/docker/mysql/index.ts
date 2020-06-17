

import {
    NewsTeamLocalDockerContainerConfig,
    LocalDockerContainerConfig
} from "../container";
import { defaults } from "../../../defaults";


export type LocalDockerMySQLConfig = LocalDockerContainerConfig;

export class NewsTeamLocalDockerMySQLConfig extends NewsTeamLocalDockerContainerConfig{

    constructor(config?: LocalDockerMySQLConfig){

        super({
            environment: config?.environment ?? defaults.local.docker.mysql.environment,
            name: "mysql",
            port: config?.port ?? defaults.local.docker.mysql.port,
            recipe: config?.recipe ?? defaults.local.docker.mysql.recipe
        });

    }

}
