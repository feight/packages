

import { localFirestoreEmulatorTask } from "./local/emulators/firestore";
import { localMemcachedEmulatorTask } from "./local/emulators/memcached";
import { localPythonServerTask } from "./local/python/server";
import { localPythonVirtualenvTask } from "./local/python/virtualenv";
import { localBrewSetupTask } from "./local/setup/brew";
import { localGCloudSetupTask } from "./local/setup/gcloud";
import { localJavaSetupTask } from "./local/setup/java";
import { localPipSetupTask } from "./local/setup/pip";
import { localRubySetupTask } from "./local/setup/ruby";
import { localXcodeSetupTask } from "./local/setup/xcode";


export {
    localFirestoreEmulatorTask,
    localMemcachedEmulatorTask,
    localPythonServerTask,
    localPythonVirtualenvTask,
    localBrewSetupTask,
    localGCloudSetupTask,
    localJavaSetupTask,
    localPipSetupTask,
    localRubySetupTask,
    localXcodeSetupTask
};
