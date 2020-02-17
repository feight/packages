

import {
    Mode,
    Platform,
    NewsTeamConfig
} from "@newsteam/cli-config";
import {
    localFirestoreEmulatorTask,
    localMemcachedEmulatorTask,
    localPythonVirtualenvTask,
    localPythonServerTask
} from "@newsteam/cli-tasks";
import {
    open
} from "@newsteam/cli-utils";


export interface LocalTaskOptions{
    mode: Mode;
    platform: Platform;
    watch: boolean;
}


export const localTask = async function(config: NewsTeamConfig, options: LocalTaskOptions): Promise<void>{

    const openDelay = 2000;

    await localPythonVirtualenvTask();

    await Promise.all([
        localMemcachedEmulatorTask(),
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
        open(`http://localhost:${ config.local.python.server.port }`, openDelay)
    ]);

};
