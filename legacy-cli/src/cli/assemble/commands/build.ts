

import { config } from "@newsteam/legacy-cli-config";

import { assembleCliOptions } from "../options";
import { action } from "../../../utils/action";
import { buildTask } from "../../../tasks/build";

import type { BuildTaskOptions } from "../../../tasks/build";
import type commander from "commander";


export const assembleBuildCommand = function(command: commander.Command): commander.Command{

    return command
    .option(assembleCliOptions.mode.flags, assembleCliOptions.mode.description, assembleCliOptions.mode.fn, assembleCliOptions.mode.default)
    .option(assembleCliOptions.publication.flags, assembleCliOptions.publication.description)
    .option(assembleCliOptions.environment.flags, assembleCliOptions.environment.description)
    .option(assembleCliOptions.link.flags, assembleCliOptions.link.description, assembleCliOptions.link.default)
    .action(async (options: BuildTaskOptions): Promise<void> => action(() => buildTask(config, {
        environment: options.environment,
        link: options.link,
        mode: options.mode,
        publication: options.publication
    })));

};
