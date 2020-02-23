

import {
    NewsTeamConfig
} from "@newsteam/cli-config";
import {
    MinifyHTMLTaskOptions
} from "@newsteam/cli-tasks/lib/minify/html";

import { BuildStaticAssetsTaskOptions } from "./build/static";
import { BuildYamlTaskOptions } from "./build/yaml";


export interface Configuration{

    buildStaticAssetsTask: BuildStaticAssetsTaskOptions;

    buildYamlTask: BuildYamlTaskOptions;

    minifyHTMLTask: MinifyHTMLTaskOptions;

}


export const configurator = function(config: NewsTeamConfig): Configuration{

    const destination = config.paths.build;

    return {
        buildStaticAssetsTask: {
            destination
        },
        buildYamlTask: {
            destination,
            paths: {
                environments: config.paths.settings.environments,
                handlers: config.paths.settings.handlers,
                yaml: config.paths.yaml
            }
        },
        minifyHTMLTask: {
            config: config.htmlmin.options,
            destination,
            glob: config.htmlmin.glob,
            ignore: config.htmlmin.ignore,
            source: config.paths.source
        }
    };

};
