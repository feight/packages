

import { defaults } from "../defaults";


export interface WebpackConfig{

    bundleAnalyzerPort?: number;

    devServerPort?: number;

    profile?: boolean;

}


export class NewsTeamWebpackConfig{

    bundleAnalyzerPort: number;

    devServerPort: number;

    profile: boolean;

    constructor(config?: WebpackConfig){

        this.bundleAnalyzerPort = config?.bundleAnalyzerPort ?? defaults.webpack.bundleAnalyzerPort;

        this.devServerPort = config?.devServerPort ?? defaults.webpack.devServerPort;

        this.profile = config?.profile ?? defaults.webpack.profile;

    }

}
