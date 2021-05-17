

import { action } from "../../../utils/action";
import { linkTask } from "../../../tasks/link";

import type commander from "commander";


export const assembleLinkCommand = function(command: commander.Command): commander.Command{

    return command
    .action(async (): Promise<void> => action(() => linkTask(true)));


};
