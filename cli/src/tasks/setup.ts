

import {
    localGCloudSetupTask,
    localPackageSetupTask,
    localPlatformSetupTask
} from "@newsteam/cli-tasks";


export const setupTask = async function(): Promise<void>{

    await localPlatformSetupTask();

    await localGCloudSetupTask(
        "core",
        "beta",
        "cloud-datastore-emulator",
        "cloud-firestore-emulator",
        "app-engine-python",
        "app-engine-python-extras"
    );

    await localPackageSetupTask(
        "pip",
        "java",
        "graphicsmagick",
        "imagemagick",
        "memcached",
        "mysql",
        "mysql-client"
    );

};
