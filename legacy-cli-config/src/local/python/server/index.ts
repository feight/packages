

import { validate } from "@newsteam/schema";

import { defaults } from "../../../defaults";


export interface LocalPythonServerConfig{

    /**
     * The server port (defaults to 8080).
     */
    port?: number;

    /**
     * Use dev_app_server.py to server the app instead of running it natively
     */
    useDevAppServer?: boolean;

}

export class NewsTeamLocalServerConfig{

    @validate({
        port: true,
        type: "number"
    })
        port: number;

    @validate("boolean")
        useDevAppServer: boolean;

    constructor(config?: LocalPythonServerConfig){

        this.port = config?.port ?? defaults.local.python.server.port;

        this.useDevAppServer = config?.useDevAppServer ?? defaults.local.python.server.useDevAppServer;

    }

}
