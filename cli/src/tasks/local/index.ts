

import {
    Mode,
    Platform,
    NewsTeamConfig
} from "@newsteam/cli-config";


import { localFirestoreTask } from "./firestore";
import { localMemcachedTask } from "./memcached";
import { localServerTask } from "./server";
import { localVirtualenvTask } from "./virtualenv";

import { open } from "../../utils/open";


export interface LocalTaskOptions{
    mode: Mode;
    platform: Platform;
    watch: boolean;
}


export const localTask = async function(config: NewsTeamConfig, options: LocalTaskOptions): Promise<void>{

    const openDelay = 2000;

    await localVirtualenvTask();

    await Promise.all([
        localMemcachedTask(),
        localFirestoreTask(config),
        localServerTask(config, options),
        open(`http://localhost:${ config.server.port }`, openDelay)
    ]);

};
