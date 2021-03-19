

import { prompt } from "@newsteam/cli-utils";

import { setupFrontEndTask } from "./front-end";
import { setupLocalTask } from "./local";


export const setupTaskTypes = ["local", "frontend"] as const;


export type SetupTaskTypeOption = typeof setupTaskTypes[number];


export interface SetupTaskOptions{
    environment?: string;
    publication?: string;
    type?: SetupTaskTypeOption;
}


export const setupTask = async function(options: SetupTaskOptions): Promise<void>{

    const projectType = await prompt(
        "type",
        [
            {
                name: "Local",
                value: "local"
            },
            {
                name: "Frontend",
                value: "frontend"
            }
        ],
        options.type && setupTaskTypes.includes(options.type) ? options.type : undefined
    );

    if(projectType === "local"){

        await setupLocalTask();

    }else if(projectType === "frontend"){

        await setupFrontEndTask(options);

    }

};
