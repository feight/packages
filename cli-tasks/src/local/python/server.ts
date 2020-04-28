
import nodemon from "nodemon";
import { logger } from "@newsteam/cli-logger";
import { kill } from "@newsteam/cli-utils";


const label = "server";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const output = (color?: string): (data: any) => void => (data: any): void => {

    // This is actually quite safe since all objects have a toString method
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const string = data.toString() as string;

    try{

        const log = JSON.parse(string) as {
            message?: string;
            level?: "warn" | "error";
        };

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

            String(string)
            .replace(/\n$/gu, "").split("\n")
            .forEach((line: string) => {

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


export interface LocalPythonServerEnvironment {
    [key: string]: string | boolean | number;
}

export interface LocalPythonVirtualenvTaskOptions{
    script?: string;
    environment?: LocalPythonServerEnvironment;
    ignore?: string[];
    watch?: string[];
}


export const localPythonServerTask = async function(
    options: LocalPythonVirtualenvTaskOptions
): Promise<void>{

    const script = options?.script ?? "main.py";
    const environment = options?.environment ?? {};
    const ignore = options?.ignore ?? [
        "node_modules/*",
        "build/*"
    ];
    const watch = options?.watch ?? [
        "src",
        script
    ];

    await kill(script);

    await new Promise((): void => {

        nodemon({
            env: {
                ...environment,
                /* eslint-disable @typescript-eslint/naming-convention */
                APPLICATION_ID: "dev~None",
                CURRENT_VERSION_ID: "None.1",
                GAE_APPLICATION: "dev~None",
                GAE_VERSION: "None.1"
                /* eslint-enable @typescript-eslint/naming-convention */
            },
            execMap: {
                py: "cd src; source ../env/bin/activate; python3 -u"
            },
            ext: "py",
            ignore,
            script,
            stdout: false,
            watch
        })
        .on("readable", function readable(this: typeof nodemon): void{

            /* eslint-disable no-invalid-this */

            this.stdout.on("data", output());
            this.stderr.on("data", output());

            /* eslint-enable no-invalid-this */

        });

    });

};
