

import { defaults } from "../defaults";


export interface WebpackConfig{

    profile?: boolean;

}


export class NewsTeamWebpackConfig{

    profile: boolean;

    constructor(config?: WebpackConfig){

        this.profile = config?.profile ?? defaults.webpack.profile;

    }

}
