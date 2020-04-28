

import {
    buildModernizrTask,
    minifyHTMLTask
} from "@newsteam/cli-tasks";

import { NewsTeamConfig } from "../../config";
import {
    BuildTaskOptions, generateBuildTaskConfigs
} from "../build";
import { buildEntriesTask } from "../build/entries";
import { buildRSSTask } from "../build/rss";
import { buildSettingsTask } from "../build/settings";
import { buildStaticAssetsTask } from "../build/static";
import { buildWebpackTask } from "../build/webpack";
import { buildWidgetsTask } from "../build/widgets";
import { buildYamlTask } from "../build/yaml";


export const label = "watch";


export const localWatchTask = async function(config: NewsTeamConfig, options: BuildTaskOptions): Promise<void>{

    const buildTaskConfigs = generateBuildTaskConfigs(config, options);

    const watchConfig = {
        ignoreInitial: true,
        label,
        watch: true
    };

    await Promise.all([
        buildEntriesTask({
            ...buildTaskConfigs.buildEntriesTask,
            ...watchConfig
        }),
        buildModernizrTask({
            ...buildTaskConfigs.buildModernizrTask,
            ...watchConfig
        }),
        buildRSSTask({
            ...buildTaskConfigs.buildRSSTask,
            ...watchConfig
        }),
        buildSettingsTask({
            ...buildTaskConfigs.buildSettingsTask,
            ...watchConfig
        }),
        buildStaticAssetsTask({
            ...buildTaskConfigs.buildStaticAssetsTask,
            ...watchConfig
        }),
        buildWidgetsTask({
            ...buildTaskConfigs.buildWidgetsTask,
            ...watchConfig
        }),
        buildYamlTask({
            ...buildTaskConfigs.buildYamlTask,
            ...watchConfig
        }),
        minifyHTMLTask({
            ...buildTaskConfigs.minifyHTMLTask,
            ...watchConfig
        }),
        buildWebpackTask({
            ...buildTaskConfigs.buildWebpackTask,
            ...watchConfig
        })
    ]);

};
