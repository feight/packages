

import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import replace from "gulp-replace";
import { Options as HTMLMinifierOptions } from "html-minifier";
import cache from "gulp-cache";
import {
    gulp as gulpUtils,
    watch,
    WatchOptions
} from "@newsteam/cli-utils";


export interface MinifyHTMLTaskOptions extends WatchOptions{
    config: HTMLMinifierOptions;
    destination: string;
    source: string;
    label?: string;
}


export const minifyHTMLTask = async function(options: MinifyHTMLTaskOptions): Promise<void>{

    await watch(options, async (files: string[]): Promise<void> => {

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

    });

};

