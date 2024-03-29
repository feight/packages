

import childProcess from "child_process";

import through from "through2";


export const exec = function(options: {
    cwd?: string;
    command: string;
    detatch?: boolean;
    filter?: (RegExp | string)[] | RegExp | string;
    label?: string;
}): Promise<string>{

    return new Promise((resolve: (string: string) => void, reject: (error: Error) => void): void => {

        const {
            cwd = process.cwd(),
            command = "",
            detatch = false,
            filter = [],
            label = "anonymous"
        } = options;

        if(command){

            let cmd = Array.isArray(command) ? command.join(" ") : command;

            cmd = cmd
            .replace(/\r\n|\r|\n/gu, "")
            .replace(/\s\s+/gu, " ")
            .replace(/^\s/gu, "");

            // eslint-disable-next-line promise/prefer-await-to-callbacks -- no choice
            const subprocess = childProcess.exec(cmd, { cwd }, (error, stdout): void => {

                if(error){

                    if(!detatch){

                        console.log("");

                        console.error(error.stack, { label });

                    }

                    reject(error);

                }else{

                    resolve(stdout);

                }

            });

            if(!detatch && subprocess.stdin){
                process.stdin.pipe(subprocess.stdin);
            }

            const piper = (std: "stderr" | "stdout"): void => {

                const proc = std === "stdout" ? subprocess.stdout : subprocess.stderr;

                if(proc !== null){

                    proc.pipe(through.obj((string: string, encoding, done): void => {

                        let formattedString = string;

                        for(const filt of Array.isArray(filter) ? filter : [filter]){
                            formattedString = String(formattedString).replace(filt, "");
                        }

                        if(!detatch){
                            process.stdout.write(formattedString);
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
                        process.stdin.end();
                    }

                });

            }

        }else{

            reject(new Error("No command passed to exit(options)"));

        }

    });


};
