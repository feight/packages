

import {
    cleanCacheTask,
    cleanTask as clean
} from "@newsteam/cli-tasks";
import { NewsTeamConfig } from "@newsteam/assemble-cli-config";


interface CleanTaskOptions{
    cache?: boolean;
}


export const cleanTask = async function(config: NewsTeamConfig, options: CleanTaskOptions = {}): Promise<void>{

    await clean(
        "**/.DS_Store",
        "src/**/*.pyc",
        config.paths.build,
        config.paths.clients
    );

    if(options.cache){

        await cleanCacheTask();

    }

};
