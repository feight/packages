

import { defaults } from "../defaults";

import * as docker from "./docker";
import * as emulators from "./emulators";
import * as python from "./python";
import * as redis from "./redis";


export interface LocalConfig{

    console?: boolean;

    docker?: docker.LocalDockerConfig;

    emulators?: emulators.LocalEmulatorsConfig;

    python?: python.LocalPythonConfig;

    redis?: redis.LocalRedisConfig;

}


export class NewsTeamLocalConfig{

    console: boolean;

    docker: docker.NewsTeamLocalDockerConfig;

    emulators: emulators.NewsTeamLocalEmulatorsConfig;

    python: python.NewsTeamLocalPythonConfig;

    redis: redis.NewsTeamLocalRedisConfig;

    constructor(config?: LocalConfig){

        this.console = config?.console ?? defaults.local.console;

        this.docker = new docker.NewsTeamLocalDockerConfig(config?.docker);

        this.emulators = new emulators.NewsTeamLocalEmulatorsConfig(config?.emulators);

        this.python = new python.NewsTeamLocalPythonConfig(config?.python);

        this.redis = new redis.NewsTeamLocalRedisConfig(config?.redis);

    }

}
