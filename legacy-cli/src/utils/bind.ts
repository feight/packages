

import type commander from "commander";


export const bind = function(
    name: string,
    command: (program: commander.Command) => commander.Command,
    parent: commander.Command
): commander.Command{

    return command(parent.command(name));

};
