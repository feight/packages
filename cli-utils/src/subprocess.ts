

/*

    eslint

    import/no-commonjs: "off",
    @typescript-eslint/no-require-imports: "off",
    @typescript-eslint/no-var-requires: "off",
    @typescript-eslint/no-unsafe-assignment: "off",
    @typescript-eslint/no-unsafe-call: "off",
    @typescript-eslint/no-unsafe-member-access: "off",
    @typescript-eslint/no-unsafe-assignment: "off"

    --

    There's quite a lot of hacky stuff going on here. For example, if we don't
    include node-pty through a require, it doesn't work. This means we have no
    idea about the typings.

*/

import childProcess from "child_process";

import through from "through2";
import { logger } from "@newsteam/cli-logger";

const pty = require("node-pty");

const commandColor = "#ff5400";
const dryLabel = `${ logger.chalk.bgHex(commandColor).hex("#000").bold(" DRY RUN ") } `;


// eslint-disable-next-line max-lines-per-function -- Breaking this apart won't make it simpler
export const exec = function(options: {
    command: string;
    detatch?: boolean;
    dry?: boolean;
    filter?: string | RegExp | (string | RegExp)[];
    label?: string;
    environment?: { [key: string]: string | undefined };
}): Promise<string>{

    // eslint-disable-next-line max-lines-per-function -- Breaking this apart won't make it simpler
    return new Promise((resolve: (string: string) => void, reject: (error: Error) => void): void => {

        const execOptions = {
            env: {
                ...process.env,
                ...options.environment ?? undefined
            },
            maxBuffer: 512000
        };

        const {
            command = "",
            detatch = false,
            filter = [],
            label = "anonymous"
        } = options;

        if(command){

            let cmd = Array.isArray(command) ? command.join(" ") : command;

            cmd = cmd
            .replace(/\r\n|\r|\n/gu, " ")
            .replace(/\s\s+/gu, " ")
            .replace(/^\s/gu, "");

            const bashCmd = cmd;

            if(!detatch){

                logger.log(`${ options.dry ? dryLabel : "" }${ logger.chalk.hex(commandColor)(bashCmd) }`, { label });

            }

            // Bail out if this is a dry run
            if(options.dry){

                resolve("");

            }else{

                const subprocess = childProcess.exec(cmd, execOptions, (error, stdout): void => {

                    if(error){

                        if(!detatch){

                            console.log("");

                            logger.error(error.stack, { label });

                        }

                        reject(error);

                    }else{

                        resolve(stdout);

                    }

                });

                if(!detatch && subprocess.stdin){
                    process.stdin.pipe(subprocess.stdin);
                }

                const piper = (std: "stdout" | "stderr"): void => {

                    const proc = std === "stdout" ? subprocess.stdout : subprocess.stderr;

                    if(proc !== null){

                        proc.pipe(through.obj((string: string, encoding, done): void => {

                            let formattedString = string;

                            (Array.isArray(filter) ? filter : [filter]).forEach((filt): void => {
                                formattedString = formattedString.replace(filt, "");
                            });

                            if(!detatch && formattedString.trim()){
                                logger.write(formattedString, { label });
                            }

                            done();

                        }));

                    }

                };

                piper("stdout");
                piper("stderr");

                if(subprocess.stdout !== null){

                    subprocess.stdout.on("end", (): void => {

                        if(!detatch){

                            process.stdin.unref();
                            process.stdin.end();

                        }

                    });

                }

            }

        }else{

            reject(new Error("No command passed to exit(options)"));

        }

    });

};


// eslint-disable-next-line max-lines-per-function -- Not quite too complicated imo
export const spawn = function(options: {
    cwd?: string;
    command: string;
    environment?: { [key: string]: string | undefined };
    filter?: string | RegExp | (string | RegExp)[];
    detatch?: boolean;
    dry?: boolean;
    label?: string;
}): Promise<string>{

    const {
        cwd = process.cwd(),
        command = "",
        environment,
        filter = [],
        detatch = false,
        dry = false,
        label = "anonymous"
    } = options;

    return new Promise((resolve: (string: string) => void, reject: (error: number | Error) => void): void => {

        if(command){

            let cmd = Array.isArray(command) ? command.join(" ") : command;

            cmd = cmd
            .replace(/\r\n|\r|\n/gu, " ")
            .replace(/\s\s+/gu, " ")
            .replace(/^\s/gu, "");

            const bashCmd = cmd;

            if(!detatch){

                logger.log(`${ dry ? dryLabel : "" }${ logger.chalk.hex(commandColor)(bashCmd) }`, { label });

            }

            // Bail out if this is a dry run
            if(dry){

                resolve("");

            }else{

                const [cm, ...args] = bashCmd.split(" ");

                const term = pty.spawn(cm, args, {
                    cols: 500,
                    cwd,
                    env: {
                        ...process.env,
                        ...environment ?? undefined
                    }
                });

                if(!detatch){
                    process.stdin.pipe(term);
                }

                const response: string[] = [];

                term.on("data", (data: string): void => {

                    response.push(data);

                    let formatted = data;

                    (Array.isArray(filter) ? filter : [filter]).forEach((filt): void => {
                        formatted = formatted.replace(filt, "");
                    });

                    if(!detatch && formatted.trim()){
                        logger.write(formatted, { label });
                    }

                });

                term.on("exit", (code: number): void => {

                    term.destroy();

                    if(!detatch){
                        process.stdin.unref();
                        process.stdin.end();
                    }

                    if(code === 1){
                        reject(code);
                    }else{
                        resolve(response.join(""));
                    }

                });

            }

        }else{

            reject(new Error("No command passed to spawn(options)"));

        }

    });

};
