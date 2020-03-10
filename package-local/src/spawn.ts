
// Doesn't work without require and it's safe to do it here since it's just a test
// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const pty = require("node-pty");


export const spawn = function(options: {
    cwd?: string;
    command: string;
    environment?: string;
    filter?: string | RegExp | (string | RegExp)[];
    detatch?: boolean;
}): Promise<string>{

    const {
        cwd = process.cwd(),
        command = "",
        environment = process.env,
        filter = [],
        detatch = false
    } = options;

    return new Promise((resolve: (string: string) => void, reject: (error: number | Error) => void): void => {

        if(command){

            let cmd = Array.isArray(command) ? command.join(" ") : command;

            cmd = cmd
            .replace(/\r\n|\r|\n/gu, "")
            .replace(/\s\s+/gu, " ")
            .replace(/^\s/gu, "");

            const bashCmd = cmd;

            if(!detatch){
                console.log(bashCmd);
            }

            const [cm, ...args] = bashCmd.split(" ");

            const term = pty.spawn(cm, args, {
                cols: 500,
                cwd,
                env: environment
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

                if(!detatch){
                    process.stdout.write(formatted);
                }

            });

            term.on("exit", (code: number): void => {

                term.destroy();

                if(!detatch){
                    process.stdin.unref();
                    process.stdin.end();
                }

                if(code === 0){
                    resolve(response.join(""));
                }else{
                    reject(code);
                }

            });

        }else{

            reject(new Error("No command passed to spawn(options)"));

        }

    });

};
