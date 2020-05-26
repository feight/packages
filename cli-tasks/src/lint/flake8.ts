

import path from "path";

import gulp from "gulp";
import flake8 from "@thollingshead/gulp-flake8";
import {
    watch,
    WatchOptions
} from "@newsteam/cli-utils";
import { logger } from "@newsteam/cli-logger";
import {
    LintError,
    LintErrorData
} from "@newsteam/cli-errors";


export class Flake8LintError extends LintError{

    constructor(data: LintErrorData[]){

        super(data);

        this.name = "Flake8LintError";

        this.description = "Flake8 Error";

    }

}

export interface Flake8LintTaskOptions extends WatchOptions{
    destination: string;
    fix?: boolean;
    source: string;
    label?: string;
}


export const flake8LintTask = async function(options: Flake8LintTaskOptions): Promise<void>{

    const label = options.label ?? "lint";

    await watch(options, async (files: string[]): Promise<void> => {

        const bar = logger.progress({
            label,
            tag: `flake8 ${ logger.colorizeText(`${ files.length }`, "#444") } ${ options.fix ? logger.colorizeText("(fix)", "#0f0") : "" }`,
            total: files.length + 1
        });

        bar.tick();

        const errors: LintErrorData[] = [];

        await new Promise((resolve) => {

            gulp.src(files, { base: options.source })
            .pipe(options.watch ? logger.gulp({
                label,
                tag: "lint"
            }) : bar.gulpTick(bar))
            .pipe(flake8())
            .pipe(flake8.reporter((response) => {

                if(response.flake8.errorCount > 0){

                    const errorsMap: {
                        [ id: string ]: LintErrorData["errors"] | undefined;
                    } = {};

                    response.flake8.errorList.forEach((error) => {

                        errorsMap[error.filename] = errorsMap[error.filename] ?? [];

                        if(errorsMap[error.filename] !== undefined){

                            (errorsMap[error.filename] as LintErrorData["errors"]).push({
                                column: Number(error.column),
                                file: error.filename,
                                line: Number(error.row),
                                message: error.reason
                            });

                        }

                    });

                    Object.keys(errorsMap).forEach((filename) => {

                        errors.push({
                            errors: errorsMap[filename] as LintErrorData["errors"],
                            file: filename
                        });

                    });

                }

                if(options.watch){

                    logger.log(`lint ${ path.resolve(files[0]) }`, { label });

                }

            }))
            .on("end", resolve);

        });

        const error = new Flake8LintError(errors);

        if(errors.length > 0){

            if(options.watch){

                logger.error(error);

            }else{

                throw error;

            }

        }

    });

};

