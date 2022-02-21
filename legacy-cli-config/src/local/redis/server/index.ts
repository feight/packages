

import { validate } from "@newsteam/schema";

import { defaults } from "../../../defaults";


export interface LocalRedisServerConfig{

    /**
     * The path to the redis config file (defaults to redis.conf).
     */
    config?: string;

    /**
     * The firestore host (defaults to 127.0.0.1).
     */
    host: string;

    /**
     * The redis server port (defaults to 6379).
     * If a config file exists it will source the port from the config.
     */
    port?: number;

}

export class NewsTeamLocalRedisServerConfig{

    @validate({
        allow: undefined,
        type: "string"
    })
        config: string;

    @validate({
        hostname: true,
        ip: true,
        type: "string"
    })
        host: string;

    @validate({
        port: true,
        type: "number"
    })
        port: number;

    constructor(config?: LocalRedisServerConfig){

        this.config = config?.config ?? defaults.local.redis.server.config;
        this.host = config?.host ?? defaults.local.emulators.firestore.host;
        this.port = config?.port ?? defaults.local.redis.server.port;

    }

}
