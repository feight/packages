
export {
    buildModernizrTask,
    BuildModernizrTaskOptions
} from "./build/modernizr";
export { cleanCacheTask } from "./cache/clean";
export { cleanTask } from "./clean";
export {
    eslintLintTask,
    EslintLintTaskOptions
} from "./lint/eslint";
export { localFirestoreEmulatorTask } from "./local/emulators/firestore";
export { localMemcachedEmulatorTask } from "./local/emulators/memcached";
export { localPythonServerTask } from "./local/python/server";
export { localPythonVirtualenvTask } from "./local/python/virtualenv";
export { localGCloudSetupTask } from "./local/setup/gcloud";
export { localPackageSetupTask } from "./local/setup/package";
export { localPlatformSetupTask } from "./local/setup/platform";
export {
    minifyHTMLTask,
    MinifyHTMLTaskOptions
} from "./minify/html";
export { ModernizrConfig } from "./build/modernizr/types";
export { npmInstallTask } from "./npm/install";
export { openBrowserTask } from "./open/browser";
