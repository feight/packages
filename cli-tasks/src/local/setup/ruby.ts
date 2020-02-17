

import { logger } from "@newsteam/cli-logger";
import { spawn } from "@newsteam/cli-utils";


const label = "setup";


export const localRubySetupTask = async function(): Promise<void>{

    try{

        // Check if ruby is installed
        await spawn({
            command: "ruby --version",
            detatch: true
        });

        logger.log("✔ ruby", {
            color: "#00ff00",
            label
        });

    }catch(error){

        logger.error([
            "",
            "Ruby is not installed on this machine.",
            "",
            "Please install it manually before you proceed.",
            ""
        ].join("\n"), { label });

        process.exit();

    }

};
