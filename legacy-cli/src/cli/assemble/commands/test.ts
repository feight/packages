

import { config } from "@newsteam/legacy-cli-config";


import { assembleCliOptions } from "../options";
import { action } from "../../../utils/action";
import { testTask } from "../../../tasks/test";

import type { AssembleLintCommandOptions } from "./lint";
import type commander from "commander";


type AssembleTestCommandOptions = AssembleLintCommandOptions;


export const assembleTestCommand = function(command: commander.Command): commander.Command{

    return command
    .option(assembleCliOptions.lintType.flags, assembleCliOptions.lintType.description, assembleCliOptions.lintType.default)
    .option(assembleCliOptions.lintAll.flags, assembleCliOptions.lintAll.description, assembleCliOptions.lintAll.default)
    .option(assembleCliOptions.lintFix.flags, assembleCliOptions.lintFix.description, assembleCliOptions.lintFix.default)
    .action(async (options: AssembleTestCommandOptions): Promise<void> => action(() => testTask(config, {
        all: options.all,
        fix: options.fix,
        type: options.type
    })));

};
