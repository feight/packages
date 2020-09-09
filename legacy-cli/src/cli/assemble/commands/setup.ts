

import type commander from "commander";

import { assembleCliOptions } from "../options";
import { action } from "../../../utils/action";
import type {
    SetupTaskOptions
} from "../../../tasks/setup";
import {
    setupTask
} from "../../../tasks/setup";


export const assembleSetupCommand = function(command: commander.Command): commander.Command{

    return command
    .option(assembleCliOptions.publication.flags, assembleCliOptions.publication.description)
    .option(assembleCliOptions.environment.flags, assembleCliOptions.environment.description)
    .option(assembleCliOptions.setupType.flags, assembleCliOptions.setupType.description)
    .action(async (options: SetupTaskOptions): Promise<void> => action(() => setupTask({
        environment: options.environment,
        publication: options.publication,
        type: options.type
    })));

};
