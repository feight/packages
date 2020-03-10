
import {
    buildModernizrTask,
    minifyHTMLTask
} from "@newsteam/cli-tasks";

import {
    NewsTeamConfig
} from "../../config";
import { buildEntriesTask } from "../build/entries";
import { buildRSSTask } from "../build/rss";
import { buildSettingsTask } from "../build/settings";
import { buildStaticAssetsTask } from "../build/static";
import { buildWidgetsTask } from "../build/widgets";
import { buildYamlTask } from "../build/yaml";
import { configurator } from "../configurator";


export const label = "watch";


export const localWatchTask = async function(config: NewsTeamConfig): Promise<void>{

    const configs = configurator(config);

    const watchConfig = {
        ignoreInitial: true,
        label,
        watch: true
    };

    await Promise.all([
        buildEntriesTask({
            ...configs.buildEntriesTask,
            ...watchConfig
        }),
        buildModernizrTask({
            ...configs.buildModernizrTask,
            ...watchConfig
        }),
        buildRSSTask({
            ...configs.buildRSSTask,
            ...watchConfig
        }),
        buildSettingsTask({
            ...configs.buildSettingsTask,
            ...watchConfig
        }),
        buildStaticAssetsTask({
            ...configs.buildStaticAssetsTask,
            ...watchConfig
        }),
        buildWidgetsTask({
            ...configs.buildWidgetsTask,
            ...watchConfig
        }),
        buildYamlTask({
            ...configs.buildYamlTask,
            ...watchConfig
        }),
        minifyHTMLTask({
            ...configs.minifyHTMLTask,
            ...watchConfig
        })
    ]);

};
