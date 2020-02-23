

import nodemon from "nodemon";
import { logger } from "@newsteam/cli-logger";
import { kill } from "@newsteam/cli-utils";


const label = "server";


const awaitServerScript = function(script: string): Promise<string>{

    return new Promise((resolve) => {

        resolve(script);

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
                        color: "#222",
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


const startNodemonServer = function(script: string, environment: LocalPythonServerEnvironment): Promise<void>{

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


export interface LocalPythonServerEnvironment {
    [key: string]: string | boolean | number;
}

export interface LocalPythonVirtualenvTaskConfig{
    script?: string;
    environment: LocalPythonServerEnvironment;
}


export const localPythonServerTask = async function(
    config: LocalPythonVirtualenvTaskConfig
): Promise<void>{

    const script = await awaitServerScript(config?.script ?? "src/main.py");

    await kill(script);

    await startNodemonServer(script, config.environment);

};
