
export type { BuildModernizrTaskOptions } from "./build/modernizr";
export { buildModernizrTask } from "./build/modernizr";
export { cleanCacheTask } from "./cache/clean";
export { cleanTask } from "./clean";
export type { GoogleCloudDeployTaskOptions } from "./gcloud/deploy";
export { googleCloudDeployTask } from "./gcloud/deploy";
export type { GoogleCloudPromoteTaskOptions } from "./gcloud/promote";
export { googleCloudPromoteTask } from "./gcloud/promote";
export type { EslintLintTaskOptions } from "./lint/eslint";
export { eslintLintTask } from "./lint/eslint";
export type { Flake8LintTaskOptions } from "./lint/flake8";
export { flake8LintTask } from "./lint/flake8";
export type {
    HTMLLintOptions, HtmllintLintTaskOptions
} from "./lint/htmllint";
export { htmllintLintTask } from "./lint/htmllint";
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
export type { MinifyHTMLTaskOptions } from "./minify/html";
export { minifyHTMLTask } from "./minify/html";
export type { ModernizrConfig } from "./build/modernizr/types";
export { npmInstallTask } from "./npm/install";
export { openBrowserTask } from "./open/browser";
export type { OptimizeTaskOptions } from "./optimize";
export { optimizeTask } from "./optimize";
export type { StylelintLintTaskOptions } from "./lint/stylelint";
export { stylelintLintTask } from "./lint/stylelint";
