

import {
    Mode,
    Platform,
    NewsTeamConfig
} from "@newsteam/cli-config";

import { localFirestoreTask } from "./firestore";
import { localServerTask } from "./server";
import { localVirtualenvTask } from "./virtualenv";


export interface LocalTaskOptions{
    mode: Mode;
    platform: Platform;
    watch: boolean;
}


export const localTask = async function(config: NewsTeamConfig, options: LocalTaskOptions): Promise<void>{

    console.log([config, options]);

    await localVirtualenvTask();

    await Promise.all([
        localFirestoreTask(config),
        localServerTask()
    ]);

};
