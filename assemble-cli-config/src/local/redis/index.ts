

import * as server from "./server";


export interface LocalRedisConfig{

    server?: server.LocalRedisServerConfig;

}


export class NewsTeamLocalRedisConfig{

    server: server.LocalRedisServerConfig;

    constructor(config?: LocalRedisConfig){

        this.server = new server.NewsTeamLocalRedisServerConfig(config?.server);

    }

}
