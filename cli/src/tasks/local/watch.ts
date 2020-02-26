
import {
    NewsTeamConfig
} from "@newsteam/cli-config";
import {
    minifyHTMLTask
} from "@newsteam/cli-tasks";

import { buildRSSTask } from "../build/rss";
import { buildSettingsTask } from "../build/settings";
import { buildStaticAssetsTask } from "../build/static";
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
