
/*

    eslint

    more/no-duplicated-chains: "off",

*/

import { NewsTeamConfig } from "@newsteam/cli-config";
import { EslintLintTaskOptions } from "@newsteam/cli-tasks/lib/lint/eslint";
import { MinifyHTMLTaskOptions } from "@newsteam/cli-tasks/lib/minify/html";

import { BuildRSSTaskOptions } from "./build/rss";
import { BuildSettingsTaskOptions } from "./build/settings";
import { BuildStaticAssetsTaskOptions } from "./build/static";
import { BuildYamlTaskOptions } from "./build/yaml";
import { TestSettingsTaskOptions } from "./test/settings";


export interface Configuration{

    buildRSSTask: BuildRSSTaskOptions;

    buildSettingsTask: BuildSettingsTaskOptions;

    buildStaticAssetsTask: BuildStaticAssetsTaskOptions;

    buildYamlTask: BuildYamlTaskOptions;

    eslintLintTask: EslintLintTaskOptions;

    minifyHTMLTask: MinifyHTMLTaskOptions;

    testSettingsTask: TestSettingsTaskOptions;

}


// eslint-disable-next-line max-lines-per-function
export const configurator = function(config: NewsTeamConfig): Configuration{

    const destination = config.paths.build;
    const source = config.paths.source;


    return {
        buildRSSTask: {
            destination,
            glob: config.rss.glob,
            ignore: config.rss.ignore,
            source
        },
        buildSettingsTask: {
            destination,
            glob: "src/publication/{base,custom,shared}/settings/**/*.{js,json}",
            source
        },
        buildStaticAssetsTask: {
            destination,
            glob: "src/publication/{base,custom,shared}/static/**/*.*"
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
            glob: [
                "src/publication/{base,custom,shared}/**/*.{js,jsx}",
                "src/settings/**/*.{js,jsx}"
            ],
            ignore: [
                "*.json",
                "*.min.js",
                "**/node_modules/**/*.{js,jsx}",
                "**/static/**/*.{js,jsx}"
            ],
            source
        },
        minifyHTMLTask: {
            config: config.htmlmin.options,
            destination,
            glob: config.htmlmin.glob,
            ignore: config.htmlmin.ignore,
            source
        },
        testSettingsTask: {
            validations: [
                {
                    glob: "src/publication/shared/settings/index.json",
                    optional: true,
                    schema: "src/settings/schema/shared/index.json"
                },
                {
                    glob: "src/publication/{base,custom}/settings/index.json",
                    schema: "src/settings/schema/index.json"
                },
                {
                    glob: "src/publication/{base,custom,shared}/widgets/*/index.json",
                    schema: "src/settings/schema/widget.json"
                },
                {
                    glob: [
                        "src/publication/custom/settings/publications/*/index.json",
                        "src/publication/custom/settings/publication.json"
                    ],
                    schema: "src/settings/schema/publication.json"
                },
                {
                    glob: "src/publication/custom/settings/account.json",
                    schema: "src/settings/schema/account.json"
                },
                {
                    glob: "src/publication/custom/settings/cosmosd.json",
                    schema: "src/settings/schema/cosmosd.json"
                },
                {
                    glob: "src/publication/custom/settings/environments.json",
                    schema: "src/settings/schema/environments.json"
                },
                {
                    glob: "src/publication/custom/settings/handlers.json",
                    schema: "src/settings/schema/handlers.json"
                },
                {
                    glob: "src/publication/custom/settings/mappings.json",
                    schema: "src/settings/schema/mappings.json"
                },
                {
                    glob: "src/publication/custom/settings/offers.json",
                    schema: "src/settings/schema/offers.json"
                }
            ]
        }
    };

};
