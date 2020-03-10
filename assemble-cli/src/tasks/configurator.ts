
/*

    eslint

    more/no-duplicated-chains: "off",

*/

import {
    BuildModernizrTaskOptions,
    EslintLintTaskOptions,
    MinifyHTMLTaskOptions
} from "@newsteam/cli-tasks";


import { BuildEntriesTaskOptions } from "./build/entries";
import { BuildRSSTaskOptions } from "./build/rss";
import { BuildSettingsTaskOptions } from "./build/settings";
import { BuildStaticAssetsTaskOptions } from "./build/static";
import { BuildYamlTaskOptions } from "./build/yaml";
import { BuildWidgetsTaskOptions } from "./build/widgets";
import { TestSettingsTaskOptions } from "./test/settings";

import { NewsTeamConfig } from "../config";


export interface Configuration{

    buildEntriesTask: BuildEntriesTaskOptions;

    buildModernizrTask: BuildModernizrTaskOptions;

    buildRSSTask: BuildRSSTaskOptions;

    buildSettingsTask: BuildSettingsTaskOptions;

    buildStaticAssetsTask: BuildStaticAssetsTaskOptions;

    buildWidgetsTask: BuildWidgetsTaskOptions;

    buildYamlTask: BuildYamlTaskOptions;

    eslintLintTask: EslintLintTaskOptions;

    minifyHTMLTask: MinifyHTMLTaskOptions;

    testSettingsTask: TestSettingsTaskOptions;

}


export const configurator = function(config: NewsTeamConfig): Configuration{

    const destination = config.paths.build;
    const source = config.paths.source;

    return {
        buildEntriesTask: {
            destination,
            glob: [
                "src/publication/custom/pages/*/index.{js,scss}",
                "src/publication/custom/pages/**/index.{js,scss}",
                "src/publication/custom/app/entry/index.{js,scss}",
                "src/publication/custom/app/push/index.js",
                "src/publication/custom/app/entry/amp/index.scss",
                "src/publication/custom/app/entry/mobile/index.scss"
            ],
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
        eslintLintTask: {
            destination,
            glob: config.paths.javascript.glob,
            ignore: config.paths.javascript.ignore,
            source
        },
        minifyHTMLTask: {
            config: config.htmlmin.options,
            destination,
            glob: config.paths.html.glob,
            ignore: config.paths.html.ignore,
            source
        },
        testSettingsTask: {
            validations: config.paths.settings.validations
        }
    };

};
