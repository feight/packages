
/*

    eslint

    more/no-duplicated-chains: "off"

    --

    Keeping this rule off to keep things simple

*/

import {
    buildModernizrTask,
    minifyHTMLTask,
    npmInstallTask
} from "@newsteam/cli-tasks";
import type {
    Mode,
    NewsTeamConfig
} from "@newsteam/legacy-cli-config";
import type {
    BuildModernizrTaskOptions,
    MinifyHTMLTaskOptions
} from "@newsteam/cli-tasks";

import { buildConsoleTask } from "./console";
import { buildEntriesTask } from "./entries";
import { buildReleaseTask } from "./release";
import { buildRSSTask } from "./rss";
import { buildSettingsTask } from "./settings";
import { buildStaticAssetsTask } from "./static";
import { buildWebpackTask } from "./webpack";
import { buildWidgetsTask } from "./widgets";
import { buildYamlTask } from "./yaml";
import type { BuildYamlTaskOptions } from "./yaml";
import type { BuildWidgetsTaskOptions } from "./widgets";
import type { BuildWebpackTaskOptions } from "./webpack";
import type { BuildStaticAssetsTaskOptions } from "./static";
import type { BuildSettingsTaskOptions } from "./settings";
import type { BuildRSSTaskOptions } from "./rss";
import type { BuildEntriesTaskOptions } from "./entries";

import { cleanTask } from "../clean";
import { linkTask } from "../link";


export const label = "build";


export interface BuildTaskOptions{
    clean?: boolean;
    environment?: string;
    link: boolean;
    mode: Mode;
    publication: string;
}


export interface BuildTaskConfigurations{

    buildEntriesTask: BuildEntriesTaskOptions;

    buildModernizrTask: BuildModernizrTaskOptions;

    buildRSSTask: BuildRSSTaskOptions;

    buildSettingsTask: BuildSettingsTaskOptions;

    buildStaticAssetsTask: BuildStaticAssetsTaskOptions;

    buildWebpackTask: BuildWebpackTaskOptions;

    buildWidgetsTask: BuildWidgetsTaskOptions;

    buildYamlTask: BuildYamlTaskOptions;

    minifyHTMLTask: MinifyHTMLTaskOptions;

}


export const generateBuildTaskConfigs = function(config: NewsTeamConfig, options: BuildTaskOptions): BuildTaskConfigurations{

    const destination = config.paths.build;
    const source = config.paths.source;

    return {
        buildEntriesTask: {
            destination,
            glob: config.paths.entries.glob,
            source
        },
        buildModernizrTask: {
            config: config.modernizr.config,
            destination,
            filename: config.paths.modernizr.filename,
            glob: config.paths.modernizr.glob
        },
        buildRSSTask: {
            destination,
            glob: config.paths.rss.glob,
            ignore: config.paths.rss.ignore,
            source
        },
        buildSettingsTask: {
            destination,
            glob: config.paths.settings.glob,
            source
        },
        buildStaticAssetsTask: {
            destination,
            glob: config.paths.static.glob
        },
        buildWebpackTask: {
            config: config.paths.webpack.config,
            mode: options.mode,
            profile: config.webpack.profile
        },
        buildWidgetsTask: {
            destination,
            glob: config.paths.widgets.glob,
            roots: config.paths.widgets.roots,
            source
        },
        buildYamlTask: {
            destination,
            glob: [
                config.paths.settings.environments,
                config.paths.settings.handlers,
                config.paths.yaml
            ],
            paths: {
                environments: config.paths.settings.environments,
                handlers: config.paths.settings.handlers,
                yaml: config.paths.yaml
            }
        },
        minifyHTMLTask: {
            config: config.htmlmin.options,
            destination,
            glob: config.paths.html.glob,
            ignore: config.paths.html.ignore,
            source
        }
    };

};


export const buildTask = async function(config: NewsTeamConfig, options: BuildTaskOptions): Promise<void>{

    const clean = typeof options.clean === "undefined" ? true : options.clean;

    const buildTaskConfigs = generateBuildTaskConfigs(config, options);

    await linkTask(options.link ? true : options.publication);

    if(clean){

        await cleanTask(config);

    }

    await buildEntriesTask(buildTaskConfigs.buildEntriesTask);

    await buildWidgetsTask(buildTaskConfigs.buildWidgetsTask);

    await buildStaticAssetsTask(buildTaskConfigs.buildStaticAssetsTask);

    await minifyHTMLTask(buildTaskConfigs.minifyHTMLTask);

    await buildRSSTask(buildTaskConfigs.buildRSSTask);

    await buildModernizrTask(buildTaskConfigs.buildModernizrTask);

    await buildYamlTask(buildTaskConfigs.buildYamlTask);

    await buildSettingsTask(buildTaskConfigs.buildSettingsTask);

    await buildReleaseTask(config);

    await npmInstallTask(...config.paths.npm.manifests);

    await buildWebpackTask(buildTaskConfigs.buildWebpackTask);

    if(
        options.mode === "production" ||
        config.local.console
    ){

        await buildConsoleTask();

    }

};
