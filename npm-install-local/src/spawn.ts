
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

const pty = require("node-pty");


export const spawn = function(options: {
    cwd?: string;
    command: string;
    environment?: string;
    filter?: (RegExp | string)[] | RegExp | string;
    detatch?: boolean;
}): Promise<string>{

    const {
        cwd = process.cwd(),
        command = "",
        environment = process.env,
        filter = [],
        detatch = false
    } = options;

    return new Promise((resolve: (string: string) => void, reject: (error: Error | number) => void): void => {

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

                for(const filt of Array.isArray(filter) ? filter : [filter]){
                    formatted = formatted.replace(filt, "");
                }

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
