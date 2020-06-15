

import {
    localGCloudSetupTask,
    localPackageSetupTask,
    localPlatformSetupTask
} from "@newsteam/cli-tasks";


export const setupLocalTask = async function(): Promise<void>{

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
        "openssl",
        "graphicsmagick",
        "imagemagick",
        "memcached",
        "mysql",
        "mysql-client",
        "redis"
    );

};
