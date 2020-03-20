

import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import replace from "gulp-replace";
import { Options as HTMLMinifierOptions } from "html-minifier";
import cache from "gulp-cache";
import {
    watch,
    WatchOptions
} from "@newsteam/cli-utils";
import { logger } from "@newsteam/cli-logger";


export interface MinifyHTMLTaskOptions extends WatchOptions{
    config: HTMLMinifierOptions;
    destination: string;
    source: string;
    label?: string;
}


export const minifyHTMLTask = async function(options: MinifyHTMLTaskOptions): Promise<void>{

    const label = options.label ?? "build";

    await watch(options, async (files: string[]): Promise<void> => {

        const bar = logger.progress({
            label,
            tag: "html",
            total: files.length
        });

        await new Promise((resolve) => {

            gulp.src(files, { base: options.source })
            .pipe(options.watch ? logger.gulp({
                label,
                tag: "built html"
            }) : bar.gulpTick(bar))
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

