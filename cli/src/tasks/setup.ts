

import {
    localBrewSetupTask,
    localGCloudSetupTask,
    localJavaSetupTask,
    localPipSetupTask,
    localRubySetupTask,
    localXcodeSetupTask
} from "@newsteam/cli-tasks";


export const setupTask = async function(): Promise<void>{

    await localXcodeSetupTask();

    await localGCloudSetupTask();
    await localGCloudSetupTask("core");
    await localGCloudSetupTask("beta");
    await localGCloudSetupTask("cloud-datastore-emulator");
    await localGCloudSetupTask("cloud-firestore-emulator");
    await localGCloudSetupTask("app-engine-python");
    await localGCloudSetupTask("app-engine-python-extras");

    await localPipSetupTask();
    await localRubySetupTask();
    await localJavaSetupTask();

    await localBrewSetupTask();
    await localBrewSetupTask("graphicsmagick");
    await localBrewSetupTask("imagemagick");
    await localBrewSetupTask("memcached");
    await localBrewSetupTask("mysql");
    await localBrewSetupTask("mysql-client");

};
