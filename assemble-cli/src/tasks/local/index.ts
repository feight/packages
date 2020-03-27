

import {
    localFirestoreEmulatorTask,
    localPythonVirtualenvTask,
    localPythonServerTask,
    localRedisServerTask,
    openBrowserTask
} from "@newsteam/cli-tasks";

import { localWatchTask } from "./watch";

import {
    Mode,
    Platform,
    NewsTeamConfig
} from "../../config";
import { buildTask } from "../build";


export interface LocalTaskOptions{
    mode: Mode;
    platform: Platform;
    watch: boolean;
}


export const localTask = async function(config: NewsTeamConfig, options: LocalTaskOptions): Promise<void>{

    const openDelay = 2000;

    await buildTask(config, options);

    await localPythonVirtualenvTask();

    await Promise.all([
        localWatchTask(config),
        localRedisServerTask(config.local.redis.server),
        localFirestoreEmulatorTask(config.local.emulators.firestore),
        localPythonServerTask({
            environment: {
                // Nodemon configurtion - we don't chose these property names
                /* eslint-disable @typescript-eslint/naming-convention */
                FIRESTORE_EMULATOR_HOST: `${ config.local.emulators.firestore.host }:${ config.local.emulators.firestore.port }`,
                local: true,
                mode: options.mode,
                PORT: config.local.python.server.port,
                watch: Boolean(options.watch)
                /* eslint-enable @typescript-eslint/naming-convention */
            }
        }),
        openBrowserTask(`http://localhost:${ config.local.python.server.port }`, openDelay)
    ]);

};
