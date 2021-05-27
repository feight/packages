

import { config } from "@newsteam/legacy-cli-config";
import { optimizeTask } from "@newsteam/cli-tasks";
import type commander from "commander";

import { action } from "../../../utils/action";


export const assembleOptimizeCommand = function(command: commander.Command): commander.Command{

    return command
    .action(async (): Promise<void> => action(() => optimizeTask({
        glob: config.paths.entries.glob
    })));

};
