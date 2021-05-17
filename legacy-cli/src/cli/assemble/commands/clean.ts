

import { config } from "@newsteam/legacy-cli-config";

import { action } from "../../../utils/action";
import { cleanTask } from "../../../tasks/clean";

import type commander from "commander";


export const assembleCleanCommand = function(command: commander.Command): commander.Command{

    return command
    .action(async (): Promise<void> => action(() => cleanTask(config, { cache: true })));

};
