

import { cleanCacheTask } from "@newsteam/cli-tasks";
import type commander from "commander";

import { action } from "../../../utils/action";


export const assembleCleanCacheCommand = function(command: commander.Command): commander.Command{

    return command
    .action(async (): Promise<void> => action(() => cleanCacheTask()));

};
