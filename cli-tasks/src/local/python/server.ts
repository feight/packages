

import {
    exec,
    kill
} from "@newsteam/cli-utils";
import { logger } from "@newsteam/legacy-cli-logger";
import nodemon from "nodemon";


const label = "server";


// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Data gets converted to string later, so it supports any value
const output = (color?: string): (data: any) => void => (data: any): void => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- This is actually quite safe since all objects have a toString method
    const string = data.toString() as string;

    try{

        const log = JSON.parse(string) as {
            message?: string;
            level?: "error" | "warn";
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

    }catch{

        if(string){

            String(string)
            .replace(/\n$/gu, "").split("\n")
            .forEach((line: string) => {

                // eslint-disable-next-line security/detect-unsafe-regex, max-len -- not sure why this isn't safe, anyway it's just for local
                const re = /(?<ip>\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}).*\[(?<date>.*?)\s(?<time>.*?)\]\s"(?<method>[A-Z]*?)\s(?<path>.*?)\sHTTP\/(?<http>.*?)"\s(?<code>\d{1,3}).*/gu;
                const match = re.exec(logger.strip(line));

                if(match?.groups){

                    const code = Number(match.groups.code);

                    logger.log(`${ match.groups.method } ${ code } ${ match.groups.path }`, {
                        color: ((): string | undefined => {

                            /* eslint-disable @typescript-eslint/no-magic-numbers -- these are potential http codes */
                            if(code >= 200 && code < 300 || code === 304){
                                return "#222";
                            }else if(code >= 400 && code < 500){
                                return "#ffa500";
                            }else if(code >= 500 && code < 600){
                                return "#f00";
                            }
                            /* eslint-enable @typescript-eslint/no-magic-numbers */

                            return color;

                        })(),
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


export type LocalPythonServerEnvironment = Record<string, boolean | number | string>;


export interface LocalPythonVirtualenvTaskOptions{
    script?: string;
    environment?: LocalPythonServerEnvironment;
    ignore?: string[];
    monitor?: boolean;
    port?: number;
    useDevAppServer?: boolean;
    watch?: string[];
}


export const localPythonServerTask = async function(
    options: LocalPythonVirtualenvTaskOptions
): Promise<void>{

    const monitor = options.monitor === undefined ? true : options.monitor;

    const environment: Record<string, string> = {
        ...options.environment ?? {},
        /* eslint-disable @typescript-eslint/naming-convention -- These are GCloud environment variables, we don't pick the names */
        APPLICATION_ID: "dev~None",
        CURRENT_VERSION_ID: "None.1",
        GAE_APPLICATION: "dev~None",
        GAE_VERSION: "None.1"
        /* eslint-enable @typescript-eslint/naming-convention */
    };

    /*
     * Currently there are issues with logging when you run the python server through NodeMon
     * i.e. the server stops logging after every second restart
     * we should probably drop this, leaving it here until we are happy with logging
     */
    if(monitor){

        const script = options.script ?? "main.py";
        const ignore = options.ignore ?? [
            "node_modules/*",
            "build/*"
        ];
        const watch = options.watch ?? [
            "src",
            script
        ];

        await kill(script);

        await new Promise((): void => {

            nodemon({
                env: environment,
                execMap: {
                    py: "cd src; source ../env/bin/activate; python3 -u"
                },
                ext: "py json",
                ignore,
                script,
                stdout: false,
                watch
            })
            .on("readable", function readable(this: typeof nodemon): void{

                this.stdout.on("data", output());
                this.stderr.on("data", output());

            });

        });

    }else{

        const script = options.script ?? "src/local.py";

        await kill(script);

        await exec({
            command: `
                source env/bin/activate;
                cd src;
                ${ Object.keys(environment).map((key) => `export ${ key }=${ environment[key] }`).join("; ") };
                python3 main.py -u;
            `,
            label
        });

    }

};
