

import commander from "commander";

import { action } from "../../../utils/action";
import { linkTask } from "../../../tasks/link";


export const assembleLinkCommand = function(command: commander.Command): commander.Command{

    return command
    .action(async (): Promise<void> => action(() => linkTask(true)));


};
