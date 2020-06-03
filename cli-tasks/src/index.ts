
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
export {
    flake8LintTask,
    Flake8LintTaskOptions
} from "./lint/flake8";
export {
    HTMLLintOptions,
    htmllintLintTask,
    HtmllintLintTaskOptions
} from "./lint/htmllint";
export {
    stylelintLintTask,
    StylelintLintTaskOptions
} from "./lint/stylelint";
export { localDatastoreEmulatorTask } from "./local/emulators/datastore";
export { localDockerMachineTask } from "./local/docker/machine";
export { localDockerRunTask } from "./local/docker/run";
export { localFirestoreEmulatorTask } from "./local/emulators/firestore";
export { localMemcachedEmulatorTask } from "./local/emulators/memcached";
export { localPythonServerTask } from "./local/python/server";
export { localPythonVirtualenvTask } from "./local/python/virtualenv";
export { localGCloudSetupTask } from "./local/setup/gcloud";
export { localPackageSetupTask } from "./local/setup/package";
export { localPlatformSetupTask } from "./local/setup/platform";
export { localRedisServerTask } from "./local/redis/server";
export {
    minifyHTMLTask,
    MinifyHTMLTaskOptions
} from "./minify/html";
export { ModernizrConfig } from "./build/modernizr/types";
export { npmInstallTask } from "./npm/install";
export { openBrowserTask } from "./open/browser";
