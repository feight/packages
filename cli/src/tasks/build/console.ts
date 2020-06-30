

import { exec } from "@newsteam/cli-utils";


const label = "console";


export const buildConsoleTask = async function(): Promise<void>{

    await exec({
        command: [
            "export NODE_OPTIONS=--max_old_space_size=4096",
            "&&",
            "cd src/cosmos/console3",
            "&&",
            "$(npm bin)/grunt build"
        ].join(" "),
        label
    });

};
