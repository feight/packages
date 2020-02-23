

import { gulp as gulpUtils } from "@newsteam/cli-utils";
import gulp from "gulp";
import glob from "glob-promise";
import chokidar from "chokidar";


const buildRSS = async function(files: string[], options: MinifyHTMLTaskOptions): Promise<void>{

    await new Promise((resolve) => {

        gulp.src(files, { base: options.source })
        .pipe(gulpUtils.print({
            label: options.label ?? "build",
            tag: "compile"
        }))
        .pipe(gulp.dest(options.destination))
        .on("end", resolve);

    });

};


export interface MinifyHTMLTaskOptions{
    destination: string;
    glob: string;
    source: string;
    ignore?: string | string[];
    ignoreInitial?: boolean;
    label?: string;
    watch?: boolean;
}


export const minifyHTMLTask = async function(options: MinifyHTMLTaskOptions): Promise<void>{

    if(options.watch){

        await new Promise(() => {

            const watcher = chokidar.watch(options.glob, {
                ignored: options.ignore,
                ignoreInitial: options?.ignoreInitial ?? false,
                persistent: true,
                useFsEvents: false
            });

            const callback = (path: string): void => {

                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                buildRSS([path], options);

            };

            watcher
            .on("add", callback)
            .on("change", callback)
            .on("unlink", callback);

        });

    }else{

        const files = await glob(options.glob, {
            ignore: options.ignore
        });

        await buildRSS(files, options);

    }

};

