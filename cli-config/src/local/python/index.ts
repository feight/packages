

import * as server from "./server";


export interface LocalPythonConfig{

    server?: server.LocalPythonServerConfig;

}


export class NewsTeamLocalPythonConfig{

    server: server.NewsTeamLocalServerConfig;

    constructor(config?: LocalPythonConfig){

        this.server = new server.NewsTeamLocalServerConfig(config?.server);

    }

}
