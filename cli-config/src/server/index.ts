

import { validate } from "@newsteam/schema";

import { defaults } from "../defaults";


export interface ServerConfig{

    /**
     * The server port (defaults to 8080).
     */
    port: number;

}

export class NewsTeamServerConfig{

    @validate({
        port: true,
        type: "number"
    })
    port: number;

    constructor(overrides?: ServerConfig){

        this.port = overrides?.port ?? defaults.server.port;

    }

}
