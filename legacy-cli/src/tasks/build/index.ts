
/*

    eslint

    more/no-duplicated-chains: "off"

    --

    Keeping this rule off to keep things simple

*/

import {
    buildModernizrTask,
    BuildModernizrTaskOptions,
    minifyHTMLTask,
    MinifyHTMLTaskOptions,
    npmInstallTask
} from "@newsteam/cli-tasks";
import {
    Mode,
    NewsTeamConfig
} from "@newsteam/legacy-cli-config";

import { buildConsoleTask } from "./console";
import {
    buildEntriesTask,
    BuildEntriesTaskOptions
} from "./entries";
import { buildReleaseTask } from "./release";
import {
    buildRSSTask,
    BuildRSSTaskOptions
} from "./rss";
import {
    buildSettingsTask,
    BuildSettingsTaskOptions
} from "./settings";
import {
    buildStaticAssetsTask,
    BuildStaticAssetsTaskOptions
} from "./static";
import {
    buildWebpackTask,
    BuildWebpackTaskOptions
} from "./webpack";
import {
    buildWidgetsTask,
    BuildWidgetsTaskOptions
} from "./widgets";
import {
    buildYamlTask,
    BuildYamlTaskOptions
} from "./yaml";

import { linkTask } from "../link";
import { cleanTask } from "../clean";


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
