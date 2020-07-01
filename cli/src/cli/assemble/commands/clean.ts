

import commander from "commander";
import { config } from "@newsteam/cli-config";

import { action } from "../../../utils/action";
import { cleanTask } from "../../../tasks/clean";


export const assembleCleanCommand = function(command: commander.Command): commander.Command{

    return command
    .action(async (): Promise<void> => action(() => cleanTask(config, { cache: true })));

};
