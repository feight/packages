

import type commander from "commander";
import { config } from "@newsteam/legacy-cli-config";

import { assembleCliOptions } from "../options";
import { action } from "../../../utils/action";
import type { PromoteTaskOptions } from "../../../tasks/promote";
import { promoteTask } from "../../../tasks/promote";


export const assemblePromoteCommand = function(command: commander.Command): commander.Command{

    return command
    .option(assembleCliOptions.publication.flags, assembleCliOptions.publication.description)
    .option(assembleCliOptions.environment.flags, assembleCliOptions.environment.description)
    .action(async (options: PromoteTaskOptions): Promise<void> => action(() => promoteTask(config, {
        environment: options.environment,
        publication: options.publication
    })));

};
