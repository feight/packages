

import { logger } from "@newsteam/legacy-cli-logger";

import { exec } from "./subprocess";


export const kill = async function(id: number | string): Promise<void>{

    try{

        await exec({
            command: [
                "ps -ax",
                "|",
                `grep '[${ String(id)[0] }]${ String(id).slice(1, String(id).length) }'`,
                "|",
                "awk '{print $1}'",
                "|",
                "xargs kill -9"
            ].join(""),
            detatch: true,
            label: "kill"
        });

    }catch{

        logger.warn(`Could not kill process '${ id }'`);

    }

};
