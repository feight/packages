

import { config } from "@newsteam/legacy-cli-config";
import type commander from "commander";

import { assembleCliOptions } from "../options";
import { action } from "../../../utils/action";
import { localTask } from "../../../tasks/local";
import type { LocalTaskOptions } from "../../../tasks/local";

export const assembleLocalCommand = function(command: commander.Command): commander.Command{

    return command
    .option(assembleCliOptions.mode.flags, assembleCliOptions.mode.description, assembleCliOptions.mode.fn, assembleCliOptions.mode.default)
    .option(assembleCliOptions.publication.flags, assembleCliOptions.publication.description)
    .option(assembleCliOptions.environment.flags, assembleCliOptions.environment.description)
    .option(assembleCliOptions.link.flags, assembleCliOptions.link.description, assembleCliOptions.link.default)
    .action(async (options: LocalTaskOptions): Promise<void> => action(() => localTask(config, {
        environment: options.environment,
        link: options.link,
        mode: options.mode,
        publication: options.publication
    })));

};
