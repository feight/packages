
import { localFirestoreEmulatorTask } from "./local/emulators/firestore";
import { localMemcachedEmulatorTask } from "./local/emulators/memcached";
import { localPythonServerTask } from "./local/python/server";
import { localPythonVirtualenvTask } from "./local/python/virtualenv";
import { localGCloudSetupTask } from "./local/setup/gcloud";
import { localPackageSetupTask } from "./local/setup/package";
import { localPlatformSetupTask } from "./local/setup/platform";


export {
    localFirestoreEmulatorTask,
    localMemcachedEmulatorTask,
    localPythonServerTask,
    localPythonVirtualenvTask,
    localGCloudSetupTask,
    localPackageSetupTask,
    localPlatformSetupTask
};
