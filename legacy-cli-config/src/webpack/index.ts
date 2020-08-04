

import * as bundleAnalyzer from "./bundle-analyzer";
import * as developmentServer from "./development-server";

import { defaults } from "../defaults";


export interface WebpackConfig{

    bundleAnalyzer?: bundleAnalyzer.WebpackBundleAnalyzerConfig;

    developmentServer?: developmentServer.WebpackDevelopmentServerConfig;

    profile?: boolean;

}


export class NewsTeamWebpackConfig{

    bundleAnalyzer: bundleAnalyzer.NewsTeamWebpackBundleAnalyzerConfig;

    developmentServer: developmentServer.NewsTeamWebpackDevelopmentServerConfig;

    profile: boolean;

    constructor(config?: WebpackConfig){

        this.bundleAnalyzer = new bundleAnalyzer.NewsTeamWebpackBundleAnalyzerConfig(config?.bundleAnalyzer);

        this.developmentServer = new developmentServer.NewsTeamWebpackDevelopmentServerConfig(config?.developmentServer);

        this.profile = config?.profile ?? defaults.webpack.profile;

    }

}
