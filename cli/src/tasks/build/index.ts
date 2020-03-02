

import {
    Mode,
    Platform,
    NewsTeamConfig
} from "@newsteam/cli-config";
import {
    buildModernizrTask,
    minifyHTMLTask,
    npmInstallTask
} from "@newsteam/cli-tasks";

import { buildConsoleTask } from "./console";
import { buildEntriesTask } from "./entries";
import { buildReleaseTask } from "./release";
import { buildSettingsTask } from "./settings";
import { buildRSSTask } from "./rss";
import { buildStaticAssetsTask } from "./static";
import { buildYamlTask } from "./yaml";

import { cleanTask } from "../clean";
import { configurator } from "../configurator";


export const label = "build";


export interface BuildTaskOptions{
    mode: Mode;
    platform: Platform;
    watch?: boolean;
}


export const buildTask = async function(config: NewsTeamConfig, options: BuildTaskOptions): Promise<void>{

    const configs = configurator(config);

    await cleanTask(config);

    await buildEntriesTask(configs.buildEntriesTask);

    return;

    await buildModernizrTask(configs.buildModernizrTask);

    await buildRSSTask(configs.buildRSSTask);

    await buildSettingsTask(configs.buildSettingsTask);

    await minifyHTMLTask(configs.minifyHTMLTask);

    await buildStaticAssetsTask(configs.buildStaticAssetsTask);

    await buildReleaseTask(config);

    await npmInstallTask(...config.paths.npm.manifests);

    await buildYamlTask(configs.buildYamlTask);

    if(
        options.mode === "production" ||
        config.local.console
    ){

        await buildConsoleTask();

    }

};
