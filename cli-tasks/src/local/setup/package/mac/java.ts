

import { logger } from "@newsteam/cli-logger";
import {
    exec,
    spawn
} from "@newsteam/cli-utils";


const label = "setup";


export const localJavaSetupTask = async function(): Promise<void>{

    try{

        // Check if java is installed
        await spawn({
            command: "java --version",
            detatch: true
        });

        logger.log("✔ java", {
            color: "#00ff00",
            label
        });

    }catch{

        await spawn({
            command: "brew cask install java",
            label: "setup"
        });

    }

    const info = await exec({
        command: "brew cask info java",
        detatch: true
    });

    const [match] = (/(\/Library\/Java\/JavaVirtualMachines\/.*?\.jdk)/gu).exec(info) ?? [];

    if(match){

        try{

            await exec({
                command: `xattr -d com.apple.quarantine ${ match }`,
                detatch: true
            });

        }catch{}

    }

};
