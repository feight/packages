

import { validate } from "@newsteam/schema";

import { defaults } from "../../../defaults";


export interface LocalPythonServerConfig{

    /**
     * The server port (defaults to 8080).
     */
    port: number;

}

export class NewsTeamLocalServerConfig{

    @validate({
        port: true,
        type: "number"
    })
    port: number;

    constructor(config?: LocalPythonServerConfig){

        this.port = config?.port ?? defaults.local.python.server.port;

    }

}
