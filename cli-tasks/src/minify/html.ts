

import { gulp as gulpUtils } from "@newsteam/cli-utils";
import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import replace from "gulp-replace";
import { Options as HTMLMinifierOptions } from "html-minifier";
import cache from "gulp-cache";
import glob from "glob-promise";
import chokidar from "chokidar";


const minifyFiles = async function(files: string[], options: MinifyHTMLTaskOptions): Promise<void>{

    await new Promise((resolve) => {

        gulp.src(files, { base: options.source })
        .pipe(gulpUtils.print({
            label: options.label ?? "build",
            tag: "minify"
        }))
        .pipe(cache(
            htmlmin(options.config),
            {
                name: "htmlmin"
            }
        ))
        .pipe(replace(/> <(\/?(html|head|main|section|title|meta|link|body|base|svg|div|li|ul|p|h1|h2|h3|h4|h5|h6))/gu, "><$1"))
        .pipe(replace(/<(\/?(li|title|html|div|svg|main))> /gu, "<$1>"))
        .pipe(gulp.dest(options.destination))
        .on("end", resolve);

    });

};


export interface MinifyHTMLTaskOptions{
    config: HTMLMinifierOptions;
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
                minifyFiles([path], options);

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

        await minifyFiles(files, options);

    }

};

