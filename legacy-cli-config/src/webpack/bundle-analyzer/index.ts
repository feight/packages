

import { defaults } from "../../defaults";


export interface WebpackBundleAnalyzerConfig{

    enabled?: boolean;

    port?: number;

}


export class NewsTeamWebpackBundleAnalyzerConfig{

    enabled: boolean;

    port: number;

    constructor(config?: WebpackBundleAnalyzerConfig){

        this.enabled = config?.enabled ?? defaults.webpack.bundleAnalyzer.enabled;

        this.port = config?.port ?? defaults.webpack.bundleAnalyzer.port;

    }

}
