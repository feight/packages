

import path from "path";

import fs from "fs-extra";

import {
    kill,
    spawn
} from "@newsteam/cli-utils";


interface LocalRedisServerTaskConfig{
    config?: string;
    port?: number;
}


export const localRedisServerTask = async function(config: LocalRedisServerTaskConfig): Promise<void>{

    if(config.port){

        try{

            await kill(config.port);

        }catch(error){}

    }

    const configPath = config.config ? path.join(process.cwd(), config.config) : undefined;
    const configExists = configPath && fs.existsSync(configPath);
    const options = [
        configExists ? config.config : undefined,
        config.port ? `--port ${ config.port }` : undefined
    ].filter(Boolean);

    await spawn({
        command: `redis-server ${ options.join(" ") }`,
        label: "redis"
    });

};
