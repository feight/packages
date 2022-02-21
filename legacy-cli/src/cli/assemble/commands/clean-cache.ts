

import { cleanCacheTask } from "@newsteam/cli-tasks";

import { action } from "../../../utils/action";

import type commander from "commander";


export const assembleCleanCacheCommand = function(command: commander.Command): commander.Command{

    return command
    .action(async (): Promise<void> => action(() => cleanCacheTask()));

};
