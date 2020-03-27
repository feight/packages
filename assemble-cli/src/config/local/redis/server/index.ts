

import { validate } from "@newsteam/schema";

import { defaults } from "../../../defaults";


export interface LocalRedisServerConfig{

    /**
     * The path to the redis config file.
     */
    config?: string;

    /**
     * The redis server port (defaults to 6379).
     */
    port: number;

}

export class NewsTeamLocalRedisServerConfig{

    @validate({
        allow: undefined,
        type: "string"
    })
    config?: string;

    @validate({
        port: true,
        type: "number"
    })
    port: number;

    constructor(config?: LocalRedisServerConfig){

        this.config = config?.config;
        this.port = config?.port ?? defaults.local.redis.server.port;

    }

}
