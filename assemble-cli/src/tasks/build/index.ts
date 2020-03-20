

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
import { buildWebpackTask } from "./webpack";
import { buildWidgetsTask } from "./widgets";

import { linkTask } from "../link";
import {
    Mode,
    Platform,
    NewsTeamConfig
} from "../../config";
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

    await linkTask();

    await buildEntriesTask(configs.buildEntriesTask);

    await buildWidgetsTask(configs.buildWidgetsTask);

    await buildStaticAssetsTask(configs.buildStaticAssetsTask);

    await minifyHTMLTask(configs.minifyHTMLTask);

    await buildRSSTask(configs.buildRSSTask);

    await buildModernizrTask(configs.buildModernizrTask);

    await buildYamlTask(configs.buildYamlTask);

    await buildSettingsTask(configs.buildSettingsTask);

    await buildReleaseTask(config);

    await npmInstallTask(...config.paths.npm.manifests);

    await buildWebpackTask({
        config: "./.webpack.config.ts",
        mode: options.mode,
        platform: options.platform,
        profile: false
    });

    if(
        options.mode === "production" ||
        config.local.console
    ){

        await buildConsoleTask();

    }

};
