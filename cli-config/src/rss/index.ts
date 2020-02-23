

import { defaults } from "../defaults";


export class NewsTeamRSSConfig{

    glob: string;

    ignore: string | string[];

    constructor(){

        this.glob = defaults.rss.glob;

        this.ignore = defaults.rss.ignore;

    }

}
