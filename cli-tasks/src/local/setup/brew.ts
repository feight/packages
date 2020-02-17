

import { logger } from "@newsteam/cli-logger";
import {
    exec,
    spawn
} from "@newsteam/cli-utils";


const label = "setup";


export const localBrewSetupTask = async function(formula?: string): Promise<void>{

    if(formula){

        const list = await exec({
            command: "brew list",
            detatch: true
        });

        const exists = list
        .replace(/\n/gu, " ")
        .split(" ")
        .filter(Boolean)
        .includes(formula);

        const rawJSON = await exec({
            command: `brew info ${ formula } --json`,
            detatch: true
        });

        const [latest] = JSON.parse(rawJSON);
        const updated = latest.linked_keg === latest.versions.stable;

        if(exists && updated){

            logger.log(`✔ brew ${ formula }`, {
                color: "#00ff00",
                label
            });

        }else if(exists){

            await spawn({
                command: `brew upgrade ${ formula }`,
                label
            });

        }else{

            await spawn({
                command: `brew install ${ formula }`,
                label
            });

        }

    }else{

        try{

            // Check if Homebrew is installed
            await spawn({
                command: "brew --version",
                detatch: true
            });

            logger.log("✔ brew", {
                color: "#00ff00",
                label
            });

        }catch(error){

            await spawn({
                command: "/usr/bin/ruby -e \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)\"",
                label: "setup"
            });

        }

    }

};
