

import path from "path";

import stylelint from "stylelint";
import vinyl from "vinyl";
import { logger } from "@newsteam/cli-logger";
import {
    watch,
    WatchOptions
} from "@newsteam/cli-utils";
import {
    LintError,
    LintErrorData
} from "@newsteam/cli-errors";


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
            tag: `stylelint ${ files.length } files ${ options.fix ? "(fix)" : "" }`,
            total: files.length
        });

        bar.tick();

        const errors: LintErrorData[] = [];

        // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
        await Promise.all(files.map((file) => new Promise(async (resolve) => {

            const report = await stylelint.lint({
                cache: options.cache ?? true,
                cacheLocation: ".local/cache/@newsteam/cli-tasks/.stylelintcache",
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

