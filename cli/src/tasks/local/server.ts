

import nodemon from "nodemon";
import { logger } from "@newsteam/cli-logger";
import {
    Mode,
    Platform,
    NewsTeamConfig
} from "@newsteam/cli-config";

import { kill } from "../../utils/kill";


const label = "server";


const awaitServerScript = function(): Promise<string>{

    const serverScript = "src/main.py";

    return new Promise((resolve) => {

        resolve(serverScript);

    });

};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const output = (color?: string): (data: any) => void => (data: any): void => {

    const string = data.toString();

    try{

        const log = JSON.parse(string);

        if(log.message){

            if(
                log.level === "warn" ||
                log.level === "error"
            ){

                logger.error(log.message, {
                    color: log.level === "warn" ? "#ff5400" : "#ff0000",
                    label
                });

            }else{

                logger.log(log.message, {
                    color,
                    label
                });

            }

        }

    }catch(error){

        if(string){

            string.replace(/\n$/gu, "").split("\n").forEach((line: string) => {

                if((/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}.*?\s200\s-/gu).test(line)){

                    logger.log(line, {
                        color: "#555",
                        label
                    });

                }else{

                    logger.log(line, {
                        color,
                        label
                    });

                }

            });

        }

    }

};


const startNodemonServer = function(script: string, environment: {
    [id: string]: string | boolean | number;
}): Promise<void>{

    return new Promise((): void => {

        nodemon({
            env: environment,
            execMap: {
                py: "source env/bin/activate; python3 -u"
            },
            ext: "py",
            script,
            stdout: false,
            watch: [
                "src",
                script
            ]
        })
        .on("readable", function readable(this: typeof nodemon): void{

            /* eslint-disable no-invalid-this */

            this.stdout.on("data", output());
            this.stderr.on("data", output());

            /* eslint-enable no-invalid-this */

        });

    });

};


export interface LocalServerTaskOptions{
    mode: Mode;
    platform: Platform;
    watch: boolean;
}


export const localServerTask = async function(
    config: NewsTeamConfig,
    options: LocalServerTaskOptions
): Promise<void>{

    const script = await awaitServerScript();

    await kill(script);

    await startNodemonServer(script, {
        // Nodemon configurtion - we don't chose these property names
        /* eslint-disable @typescript-eslint/naming-convention */
        FIRESTORE_EMULATOR_HOST: `${ String(config.firestore.host) }:${ String(config.firestore.port) }`,
        local: true,
        mode: options.mode,
        PORT: config.server.port,
        watch: Boolean(options.watch)
        /* eslint-enable @typescript-eslint/naming-convention */
    });

};
