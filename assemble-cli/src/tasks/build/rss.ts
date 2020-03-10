

import gulp from "gulp";
import {
    gulp as gulpUtils,
    watch,
    WatchOptions
} from "@newsteam/cli-utils";


export interface BuildRSSTaskOptions extends WatchOptions{
    destination: string;
    source: string;
    label?: string;
}


export const buildRSSTask = async function(options: BuildRSSTaskOptions): Promise<void>{

    await watch(options, async (files: string[]): Promise<void> => {

        await new Promise((resolve) => {

            gulp.src(files, { base: options.source })
            .pipe(gulpUtils.print({
                label: options.label ?? "build",
                tag: "compile"
            }))
            .pipe(gulp.dest(options.destination))
            .on("end", resolve);

        });

    });

};

