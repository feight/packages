

import { logger } from "@newsteam/legacy-cli-logger";
import { spawn } from "@newsteam/cli-utils";


const label = "setup";


export const localXcodeSelectSetupTask = async function(): Promise<void>{

    let installed = "";

    try{

        // Check if xcode-select is installed
        installed = await spawn({
            command: "xcode-select --version",
            detatch: true
        });

        logger.log("✔ xcode-select", {
            color: "#00ff00",
            label
        });

    }catch{}

    if(!installed){

        // Install xcode-select
        await spawn({
            command: "xcode-select --install",
            label
        });

    }

};
