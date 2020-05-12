

import stream from "stream";

import ProgressBar from "progress";
import through from "through2";
import vinyl from "vinyl";
import chalk from "chalk";

import { Logger } from ".";


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

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    gulpTick(tokens?: any): stream.Transform{

        const tick = this.tick.bind(this);

        return through({ objectMode: true }, function blank(
            file: vinyl,
            encoding: string,
            done: through.TransformCallback
        ): void{

            if(file.isNull()){
                return done();
            }

            tick(tokens);

            // Not invalid since that function is bound by the through library
            // eslint-disable-next-line @typescript-eslint/no-invalid-this
            this.push(file);

            return done();

        });

    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    tick(tokens?: any): void{

        if(typeof tokens === "object"){

            super.tick(Object.keys(tokens).reduce((accumulator, current) => {

                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if(tokens[current]){

                    return {
                        ...accumulator,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
