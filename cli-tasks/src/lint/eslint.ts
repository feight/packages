

import path from "path";

// eslint-disable-next-line node/no-extraneous-import -- this isn't extraneous, it's a dependency of @newsteam/eslint
import { CLIEngine } from "eslint";
import { logger } from "@newsteam/legacy-cli-logger";
import { watch } from "@newsteam/cli-utils";
import { LintError } from "@newsteam/legacy-cli-errors";

import type vinyl from "vinyl";
import type { WatchOptions } from "@newsteam/cli-utils";
import type { LintErrorData } from "@newsteam/legacy-cli-errors";


export class ESLintError extends LintError{

    constructor(data: LintErrorData[]){

        super(data);

        this.name = "ESLintError";

        this.description = "ESLint Error";

    }

}


export interface ESLintFile extends vinyl{
    eslint: {
        fixed: boolean;
    };
}


export interface EslintLintTaskOptions extends WatchOptions{
    cache?: boolean;
    destination: string;
    fix?: boolean;
    source: string;
    label?: string;
}


export const eslintLintTask = async function(options: EslintLintTaskOptions): Promise<void>{

    const label = options.label ?? "lint";

    const eslintCLI = new CLIEngine({
        cache: options.cache ?? true,
        cacheLocation: ".newsteam/cache/.eslintcache",
        fix: options.fix ?? false,
        useEslintrc: true
    });

    await watch(options, async (files: string[]): Promise<void> => {

        const bar = logger.progress({
            label,
            tag: `eslint ${ logger.colorizeText(`${ files.length }`, "#444") } ${ options.fix ? logger.colorizeText("(fix)", "#0f0") : "" }`,
            total: files.length + 1
        });

        bar.tick();

        await new Promise<void>((resolve) => {

            const errors: LintErrorData[] = [];

            for(const file of files){

                const report = eslintCLI.executeOnFiles([file]);

                if(options.fix){
                    CLIEngine.outputFixes(report);
                }

                const [result] = report.results;

                if(result.errorCount > 0){

                    errors.push({
                        errors: result.messages.map((error) => ({
                            column: error.column,
                            file,
                            line: error.line,
                            message: `${ error.message } ${ error.ruleId ? `(${ error.ruleId })` : "" }`
                        })),
                        file
                    });

                }

                if(options.watch){

                    logger.log(`lint ${ path.resolve(file) }`, { label });

                }else{

                    bar.tick();

                }

            }

            const error = new ESLintError(errors);

            if(errors.length > 0){

                if(options.watch){

                    logger.error(error);

                }else{

                    throw error;

                }

            }

            resolve();

        });

    });

};

