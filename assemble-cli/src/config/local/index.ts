

import * as emulators from "./emulators";
import * as python from "./python";
import * as redis from "./redis";

import { defaults } from "../defaults";


export interface LocalConfig{

    console?: boolean;

    emulators?: emulators.LocalEmulatorsConfig;

    python?: python.LocalPythonConfig;

    redis?: redis.LocalRedisConfig;

}


export class NewsTeamLocalConfig{

    console: boolean;

    emulators: emulators.NewsTeamLocalEmulatorsConfig;

    python: python.NewsTeamLocalPythonConfig;

    redis: redis.NewsTeamLocalRedisConfig;

    constructor(config?: LocalConfig){

        this.console = config?.console ?? defaults.local.console;

        this.emulators = new emulators.NewsTeamLocalEmulatorsConfig(config?.emulators);

        this.python = new python.NewsTeamLocalPythonConfig(config?.python);

        this.redis = new redis.NewsTeamLocalRedisConfig(config?.redis);

    }

}
