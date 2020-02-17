

import * as emulators from "./emulators";
import * as python from "./python";


export interface LocalConfig{

    emulators?: emulators.LocalEmulatorsConfig;

    python?: python.LocalPythonConfig;

}


export class NewsTeamLocalConfig{

    emulators: emulators.NewsTeamLocalEmulatorsConfig;

    python: python.NewsTeamLocalPythonConfig;

    constructor(config?: LocalConfig){

        this.emulators = new emulators.NewsTeamLocalEmulatorsConfig(config?.emulators);
        this.python = new python.NewsTeamLocalPythonConfig(config?.python);

    }

}
