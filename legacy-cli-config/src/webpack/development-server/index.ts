

import { defaults } from "../../defaults";


export interface WebpackDevelopmentServerConfig{

    port?: number;

}


export class NewsTeamWebpackDevelopmentServerConfig{

    port: number;

    constructor(config?: WebpackDevelopmentServerConfig){

        this.port = config?.port ?? defaults.webpack.bundleAnalyzer.port;

    }

}
