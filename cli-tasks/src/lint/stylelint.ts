

import path from "path";

import stylelint from "stylelint";
import type vinyl from "vinyl";
import { logger } from "@newsteam/legacy-cli-logger";
import type {
    WatchOptions
} from "@newsteam/cli-utils";
import {
    watch
} from "@newsteam/cli-utils";
import type {
    LintErrorData
} from "@newsteam/legacy-cli-errors";
import {
    LintError
} from "@newsteam/legacy-cli-errors";


export class StylelintError extends LintError{

    constructor(data: LintErrorData[]){

        super(data);

        this.name = "StylelintError";

        this.description = "Stylelint Error";

    }

}


export interface StylelintFile extends vinyl{
    stylelint: {
        fixed: boolean;
    };
}


export interface StylelintLintTaskOptions extends WatchOptions{
    cache?: boolean;
    destination: string;
    fix?: boolean;
    source: string;
    label?: string;
}


export const stylelintLintTask = async function(options: StylelintLintTaskOptions): Promise<void>{

    const label = options.label ?? "lint";

    await watch(options, async (files: string[]): Promise<void> => {

        const bar = logger.progress({
            label,
            tag: `stylelint ${ logger.colorizeText(`${ files.length }`, "#444") } ${ options.fix ? logger.colorizeText("(fix)", "#0f0") : "" }`,
            total: files.length + 1
        });

        bar.tick();

        const errors: LintErrorData[] = [];

        // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor -- This is fine for automation
        await Promise.all(files.map((file) => new Promise<void>(async (resolve) => {

            const report = await stylelint.lint({
                cache: options.cache ?? true,
                cacheLocation: ".newsteam/cache/.stylelintcache",
                files: [file],
                fix: options.fix ?? false,
                reportNeedlessDisables: true
            });

            if(report.errored){

                const [result] = report.results;

                errors.push({
                    errors: result.warnings.map((error) => ({
                        column: error.column,
                        file,
                        line: error.line,
                        message: error.text
                    })),
                    file
                });

            }

            if(options.watch){

                logger.log(`lint ${ path.resolve(file) }`, { label });

            }else{

                bar.tick();

            }

            resolve();

        })));

        const error = new StylelintError(errors);

        if(errors.length > 0){

            if(options.watch){

                logger.error(error);

            }else{

                throw error;

            }

        }

    });

};

