

import { defaults } from "../defaults";


export interface ModernizrConfig{

    addFeatures?: string[];

}


export class NewsTeamModernizrConfig{

    addFeatures: string[];

    constructor(config?: ModernizrConfig){

        this.addFeatures = defaults.modernizr.addFeatures
        .concat(config?.addFeatures ?? [])
        .filter((value, index, self) => self.indexOf(value) === index);

    }

}
