

import path from "path";

import { logger } from "@newsteam/cli-logger";
import modernizr from "gulp-modernizr-build";
import minify from "gulp-babel-minify";
import gulp from "gulp";


export interface BuildModernizrTaskOptions{
    config: {
        addFeatures: string[];
    };
    destination?: string;
    filename?: string;
    label?: string;
}


export const buildModernizrTask = async function(options: BuildModernizrTaskOptions): Promise<void>{

    const {
        config,
        destination = "src/build",
        filename = "modernizr.js",
        label = "build"
    } = options;

    await new Promise((resolve) => {

        gulp.src(__filename)
        .pipe(modernizr(filename, {
            quiet: true,
            ...config
        }))
        .pipe(minify({}, {
            comments: false
        }))
        .pipe(gulp.dest(destination))
        .on("finish", (): void => {

            logger.log(`modernizr ${ path.resolve(path.join(destination, filename)) }`, { label });

            resolve();

        });

    });

};
