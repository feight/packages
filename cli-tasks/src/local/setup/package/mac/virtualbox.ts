

import { logger } from "@newsteam/cli-logger";
import { spawn } from "@newsteam/cli-utils";


const label = "setup";


export const localVirtualboxSetupTask = async function(): Promise<void>{

    try{

        // Check if virtualbox is installed
        await spawn({
            command: "brew cask info virtualbox",
            detatch: true
        });

        logger.log("✔ virtualbox", {
            color: "#00ff00",
            label
        });

    }catch(error){

        await spawn({
            command: "brew cask install virtualbox",
            label: "setup"
        });

    }

};
