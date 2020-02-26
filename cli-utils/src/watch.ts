

import glob from "glob-promise";
import chokidar from "chokidar";


export interface WatchOptions{
    glob: string | string[];
    ignore?: string | string[];
    ignoreInitial?: boolean;
    watch?: boolean;
}


export const watch = async function(
    options: WatchOptions,
    task: (files: string[]) => Promise<void>
): Promise<void>{

    const globs = typeof options.glob === "string" ? [options.glob] : options.glob;

    if(options.watch){

        const callback = (path: string): void => {

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            task([path]);

        };

        await new Promise(() => {

            // This has to be dynamic and should be security by whoever uses it
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            const watcher = chokidar.watch(globs, {
                ignored: options.ignore,
                ignoreInitial: options?.ignoreInitial ?? false,
                persistent: true,
                useFsEvents: false
            });

            watcher
            .on("add", callback)
            .on("change", callback)
            .on("unlink", callback);

        });

    }else{

        const files = await Promise.all(globs.map((line: string) => glob(line, {
            ignore: options.ignore
        })));

        await task(files.flat());

    }

};
