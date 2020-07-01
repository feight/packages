

import commander from "commander";
import { config } from "@newsteam/cli-config";

import { assembleCliOptions } from "../options";
import { action } from "../../../utils/action";
import {
    testTask,
    TestTaskLintType
} from "../../../tasks/test";


export interface AssembleLintCommandOptions{
    all: boolean;
    fix: boolean;
    type: TestTaskLintType;
}


export const assembleLintCommand = function(command: commander.Command): commander.Command{

    return command
    .option(assembleCliOptions.lintType.flags, assembleCliOptions.lintType.description, assembleCliOptions.lintType.default)
    .option(assembleCliOptions.lintAll.flags, assembleCliOptions.lintAll.description, assembleCliOptions.lintAll.default)
    .option(assembleCliOptions.lintFix.flags, assembleCliOptions.lintFix.description, assembleCliOptions.lintFix.default)
    .action(async (options: AssembleLintCommandOptions): Promise<void> => action(() => testTask(config, {
        all: options.all,
        fix: options.fix,
        tests: false,
        type: options.type
    })));

};
