

import {
    Command,
    flags
} from "@oclif/command";


export default class LegacyTestCommand extends Command{

    static description = "describe the command here";

    static examples = ["$ newsteam legacy:test"];

    static flags = {

        all: flags.boolean({
            char: "a",
            default: false
        }),

        fix: flags.boolean({
            char: "f",
            default: false,
            description: "run autofix on lints"
        }),

        help: flags.help({
            char: "h"
        }),

        type: flags.enum({
            char: "t",
            default: "all",
            description: "specify which lint type to run",
            options: [
                "all",
                "eslint",
                "flake8",
                "htmllint",
                "stylelint"
            ]
        })

    };

    static args = [
        {
            default: process.cwd(),
            description: "path",
            name: "path",
            required: false
        }
    ];

    async run(){

        const cmd = this.parse(LegacyTestCommand);
        const path = cmd.args.path as string;
        const type = cmd.flags.type;

        this.log(`hello ${ path } ${ type }  from ./src/commands/hello.ts`);

    }

}

