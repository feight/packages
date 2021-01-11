

import type stream from "stream";

import ProgressBar from "progress";
import through from "through2";
import type vinyl from "vinyl";
import chalk from "chalk";

import type { Logger } from ".";


export interface ProgressOptions extends ProgressBar.ProgressBarOptions{
    format?: string;
    label: string;
    logger: Logger;
    tag?: string;
}


export class Progress extends ProgressBar{

    logger: Logger;

    constructor(options: ProgressOptions){

        const logger = options.logger;
        const tag = options.tag ?? "";
        const format = options.format ?? `:bar ${ tag ? `${ tag } ` : "" }`;
        const label = options.label;

        if(logger.getLastLabel() !== label){

            logger.log("");

        }

        logger.setLastLabel(label);

        super(`${ logger.formatLabel(label) } ${ format }`, {
            ...options,
            complete: chalk.hex(logger.colors.progressBar)("█"),
            incomplete: chalk.hex("#090909")("█"),
            width: 15
        });

        this.logger = logger;

    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any -- This is passed to the super of this class which has an any type for this value
    gulpTick(tokens?: any): stream.Transform{

        const tick = this.tick.bind(this);

        return through({ objectMode: true }, function blank(
            file: vinyl,
            encoding: string,
            done: through.TransformCallback
        ): void{

            if(file.isNull()){

                done();

                return;

            }

            tick(tokens);

            // eslint-disable-next-line @typescript-eslint/no-invalid-this -- Not invalid since that function is bound by the through library
            this.push(file);

            done();

        });

    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any -- This is passed to the super of this class which has an any type for this value
    tick(tokens?: any): void{

        if(typeof tokens === "object"){

            // Replacing all object keys with inline formatted properties
            // eslint-disable-next-line unicorn/no-array-reduce -- see above
            super.tick(Object.keys(tokens).reduce((accumulator, current) => {

                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- It's not unsafe to check for truthyness
                if(tokens[current]){

                    return {
                        ...accumulator,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- This is safe enough
                        [current]: this.logger.inLineFormat(String(tokens[current]))
                    };

                }

                return accumulator;

            }, {}));

        }else{

            super.tick(tokens);

        }

    }

}
