

import { logger } from "@newsteam/legacy-cli-logger";
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
            command: "brew tap homebrew/cask-versions",
            label: "setup"
        });

        await spawn({
            command: "brew update",
            label: "setup"
        });

        await spawn({
            command: "brew tap caskroom/cask",
            label: "setup"
        });

        await spawn({
            command: "brew cask install java",
            label: "setup"
        });

    }

    const info = await exec({
        command: "brew info java --cask",
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
