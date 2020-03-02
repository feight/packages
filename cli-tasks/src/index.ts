
import {
    buildModernizrTask,
    BuildModernizrTaskOptions
} from "./build/modernizr";
import { cleanCacheTask } from "./cache/clean";
import { cleanTask } from "./clean";
import {
    eslintLintTask,
    EslintLintTaskOptions
} from "./lint/eslint";
import { localFirestoreEmulatorTask } from "./local/emulators/firestore";
import { localMemcachedEmulatorTask } from "./local/emulators/memcached";
import { localPythonServerTask } from "./local/python/server";
import { localPythonVirtualenvTask } from "./local/python/virtualenv";
import { localGCloudSetupTask } from "./local/setup/gcloud";
import { localPackageSetupTask } from "./local/setup/package";
import { localPlatformSetupTask } from "./local/setup/platform";
import {
    minifyHTMLTask,
    MinifyHTMLTaskOptions
} from "./minify/html";
import { npmInstallTask } from "./npm/install";
import { openBrowserTask } from "./open/browser";

export {
    buildModernizrTask,
    BuildModernizrTaskOptions,
    cleanCacheTask,
    cleanTask,
    eslintLintTask,
    EslintLintTaskOptions,
    localFirestoreEmulatorTask,
    localMemcachedEmulatorTask,
    localPythonServerTask,
    localPythonVirtualenvTask,
    localGCloudSetupTask,
    localPackageSetupTask,
    localPlatformSetupTask,
    minifyHTMLTask,
    MinifyHTMLTaskOptions,
    npmInstallTask,
    openBrowserTask
};
