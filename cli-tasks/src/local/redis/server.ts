

import {
    kill,
    spawn
} from "@newsteam/cli-utils";


interface LocalRedisServerTaskConfig{
    config?: string;
    port: number;
}


export const localRedisServerTask = async function(config: LocalRedisServerTaskConfig): Promise<void>{

    try{

        await kill(config.port);

    }catch(error){}

    await spawn({
        command: `redis-server ${ config.config ?? `--port ${ config.port }` }`,
        label: "redis"
    });

};
