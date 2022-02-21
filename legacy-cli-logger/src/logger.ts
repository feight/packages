

import chalk from "chalk";
import { CLIError } from "@newsteam/legacy-cli-errors";
import codeframe from "codeframe";
import getCursorPosition from "magicdawn-get-cursor-position";
import { rjust } from "justify-text";
import strip from "strip-color";
import stripAnsi from "strip-ansi";
import table from "text-table";
import through from "through2";

import { Progress } from "./progress";

import type vinyl from "vinyl";
import type ProgressBar from "progress";
import type stream from "stream";


const nonBreakingCharacterCode = 160;
const nonBreakingCharacter = String.fromCodePoint(nonBreakingCharacterCode);
const cwd = process.cwd();
const columnWidth = 12;

let lastFormattedLabel: string | undefined = undefined;
let lastLabel: string | undefined = undefined;
let started = false;


export interface LintError{
    column: number;
    file: string;
    line: number;
    message: string;
}


export interface LintErrorFile{
    errors: LintError[];
    filePath: string;
}


export interface LoggerColors{
    error: string;
    errorFileName: string;
    errorLabel: string;
    errorLabelBackground: string;
    errorLabelRepeat: string;
    file: string;
    labelBackground: string;
    label: string;
    labelRepeat: string;
    lintErrorMessage: string;
    progressBar: string;
    status200: string;
    status300: string;
    status400: string;
    status500: string;
    url: string;
    warning: string;
}


export interface LoggerOptions{
    colors?: LoggerColors;
    defaultLabel?: string;
    emojis?: Record<string, string>;
}


export interface LoggerProgressOptions extends ProgressBar.ProgressBarOptions{
    format?: string;
    label: string;
    tag?: string;
}


export class Logger{

    carryAnsi: string;

    chalk: typeof chalk;

    colors: LoggerColors;

    defaultLabel: string;

    emojis: Record<string, string>;

    constructor(options: LoggerOptions = {}){

        this.carryAnsi = "";

        this.chalk = chalk;

        this.defaultLabel = options.defaultLabel ?? "anonymous";

        this.colors = {
            error: options.colors?.error ?? "#ff0000",
            errorFileName: options.colors?.errorFileName ?? "ffae00",
            errorLabel: options.colors?.errorLabel ?? "#eeeeee",
            errorLabelBackground: options.colors?.errorLabelBackground ?? "#7a170e",
            errorLabelRepeat: options.colors?.errorLabelRepeat ?? "#eeeeee",
            file: options.colors?.file ?? "#ff3bdc",
            label: options.colors?.label ?? "#eeeeee",
            labelBackground: options.colors?.labelBackground ?? "#222222",
            labelRepeat: options.colors?.labelRepeat ?? "#222222",
            lintErrorMessage: options.colors?.lintErrorMessage ?? "#cccccc",
            progressBar: options.colors?.progressBar ?? "#474747",
            status200: options.colors?.status200 ?? "#00ff00",
            status300: options.colors?.status300 ?? "#ffff00",
            status400: options.colors?.status400 ?? "#ff0000",
            status500: options.colors?.status500 ?? "#ff0000",
            url: options.colors?.url ?? "#00b1e1",
            warning: options.colors?.warning ?? "##ffa500"
        };

        this.emojis = {
            anonymous: "🤔",
            build: "🔧",
            clean: "🧻",
            config: "🧬",
            console: "🎮",
            datastore: "💾",
            deploy: "💩",
            docker: "🐋",
            error: "💥",
            firestore: "🔥",
            kill: "💀",
            lint: "🔎",
            memcached: "🧠",
            newsteam: "🍆",
            npm: "🍅",
            open: "🌍",
            optimize: "🌟",
            promote: "👍",
            python: "🐍",
            redis: "🧧",
            select: "🔘",
            server: "💻",
            settings: "🧬",
            setup: "💿",
            symlink: "🔗",
            test: "🔬",
            watch: "😳",
            webpack: "📦",
            ...options.emojis
        };

    }

    colorizeText(text: string, hexColor: string): string{

        return chalk.hex(hexColor)(text);

    }

    error(error: CLIError | Error | string = "", options: { color?: string | true; label?: string } = {}): void{

        const {
            color = this.colors.error,
            label = "error"
        } = options;

        if(error instanceof CLIError){

            for(const cliError of error.data){

                const {
                    errors,
                    file
                } = cliError;

                if(errors.length > 0){

                    const errorOutput = errors.map((errorItem): string => {

                        const {
                            message,
                            column,
                            line
                        } = errorItem;

                        const errorPointer = [
                            chalk.red(error.description || error.name),
                            "\n",
                            chalk.hex(this.colors.errorFileName)(file),
                            line && column ? `:${ line }:${ column }` : ""
                        ].join("");

                        if(column !== undefined && line !== undefined){

                            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- Feel like this is a lint bug
                            const errorFrame = codeframe.get({
                                column,
                                file,
                                line
                            });

                            return `${ errorPointer }\n${ chalk.hex(this.colors.lintErrorMessage)(message) }\n\n${ String(errorFrame) }\n`;

                        }

                        return `${ errorPointer }\n${ chalk.hex(this.colors.lintErrorMessage)(message) }\n`;

                    }).join("\n");

                    this.log(errorOutput, {
                        error: true,
                        label
                    });

                }

            }

        }else if(error instanceof Error){

            let output = "";

            if(error.stack && error.name){

                output = `${ error.name }\n\n${ error.stack }`;

            }else if(error.message){

                output = error.message;

            }

            this.log(String(output), {
                color: color === true ? undefined : color,
                error: true,
                label
            });

        }else{

            this.log(error, {
                color: color === true ? undefined : color,
                error: true,
                label
            });

        }

    }

    formatLabel(string: string, error = false, first = false, justify = columnWidth): string{

        const label = stripAnsi(string);
        const clearedLabel = label;
        const emoji = this.emojis[label.toLowerCase()] ? ` ${ this.emojis[label.toLowerCase()] }` : "";
        const formattedLabel = rjust(`${ clearedLabel }${ emoji }`, justify);
        const bgColor = this.colors.labelBackground;
        const errorBgColor = this.colors.errorLabelBackground;
        const firstColor = error ? this.colors.errorLabel : this.colors.label;
        const secondColor = error ? this.colors.errorLabelRepeat : this.colors.labelRepeat;

        const color = label === lastFormattedLabel && !first ? secondColor : firstColor;

        if(label.trim()){
            lastFormattedLabel = label;
        }

        return `${ chalk.hex(color).bgHex(error ? errorBgColor : bgColor)(` ${ formattedLabel } `) }`;

    }

    gulp(options: {
        color?: string;
        label?: string;
        tag?: string;
    } = {}): stream.Transform{

        const {
            color,
            label = "gulp",
            tag = ""
        } = options;

        const log = this.log.bind(this);

        return through({ objectMode: true }, function blank(
            file: vinyl,
            encoding: string,
            done: through.TransformCallback
        ): void{

            if(file.isNull()){

                done();

                return;

            }

            log(`${ tag ? `${ tag } ` : "" }${ file.path }`, {
                color,
                label
            });

            // eslint-disable-next-line @typescript-eslint/no-invalid-this -- Not invalid since that function is bound by the through library
            this.push(file);

            done();

        });

    }

    getLastLabel(): string | undefined{

        return lastLabel;

    }

    inLineFormat(line: string): string{

        return line
        // eslint-disable-next-line security/detect-non-literal-regexp -- this is safe enough for a cli logger
        .replace(new RegExp(`${ String(cwd.replace(/\//gu, "\\/")) }\\/([a-zA-Z0-9-_./]*)(\\]| |$|\\s)`, "gu"), `${ chalk.hex(this.colors.file)("$1") }$2`)
        .replace(/(https?:\/\/[^(\]|\s|")]*)/gu, chalk.hex(this.colors.url)("$1"))
        .replace(/info:\s(POST|GET|PUT|PATCH|DELETE)\s(2\d\d)\s/gu, `info: $1 ${ chalk.hex(this.colors.status200)("$2") } `)
        .replace(/info:\s(POST|GET|PUT|PATCH|DELETE)\s(3\d\d)\s/gu, `info: $1 ${ chalk.hex(this.colors.status300)("$2") } `)
        .replace(/info:\s(POST|GET|PUT|PATCH|DELETE)\s(4\d\d)\s/gu, `info: $1 ${ chalk.hex(this.colors.status400)("$2") } `)
        .replace(/info:\s(POST|GET|PUT|PATCH|DELETE)\s(5\d\d)\s/gu, `info: $1 ${ chalk.hex(this.colors.status500)("$2") } `);

    }

    log(message = "", options: {
        color?: string;
        error?: boolean;
        label?: string;
    } = {}): void{

        const {
            label = message ? this.defaultLabel : "",
            color,
            error = false
        } = options;

        const formattedMessage = this.format(label, String(message), color, error);
        const blank = started ? this.formatLabel(`${ nonBreakingCharacter }`) : "";

        if(lastLabel !== label && label && lastLabel !== "" && started){

            const cursor = getCursorPosition.sync();

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Sometimes when you ctrl+c a process this cursor is undefined
            if(cursor){

                console.log(cursor.col > 1 ? `\n${ blank }` : blank);

            }

        }

        this.setLastLabel(label);

        for(const line of formattedMessage.split("\n")){

            const cursor = getCursorPosition.sync();
            const output = color ? line : this.inLineFormat(line);

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Sometimes when you ctrl+c a process this cursor is undefined
            if(cursor){

                console.log(cursor.col > 1 ? `\n${ output }` : output);

            }

        }

        started = true;

    }

    progress(options: LoggerProgressOptions): Progress{

        return new Progress({
            ...options,
            logger: this
        });

    }

    setLastLabel(label: string): void{

        lastLabel = label;

    }

    strip(string: string): string{

        return stripAnsi(string);

    }

    table(label: string, labels: string[], data: string[][], options: table.Options): void{

        this.log(table([
            labels.map((lbl: string): string => chalk.bold(lbl)),
            ...data
        ], {
            ...options,
            stringLength(string): number{

                return stripAnsi(string).length;

            }
        }), { label });

    }

    warn(message = "", options: {
        label?: string;
    } = {}): void{

        this.log(message, {
            ...options,
            color: this.colors.warning
        });

    }

    write(message?: string, options?: {
        error?: boolean;
        label: string;
    }): void{

        const column = getCursorPosition.sync().col;

        const {
            label = this.defaultLabel,
            error = false
        } = options ?? {};

        // Normalize new line characters
        let output = message ?? "";

        /*
         * Test if there are any unclosed terminal color literals
         *
         * If you find one at the end of the message, store it so it can be
         * prepended to the next written message.
         */
        // eslint-disable-next-line require-unicode-regexp -- Forgot why this was important
        const match = output.match(/\033(?!\[\d*m).*$/gm);

        output = `${ this.carryAnsi }${ output }`;

        [this.carryAnsi] = match ? match : [""];

        const firstLabel = this.formatLabel(label, error);
        const newFirstLabel = label !== lastLabel;
        const blankLabel = this.formatLabel(`${ nonBreakingCharacter }`, error);

        if(column === 1 || newFirstLabel){
            this.setLastLabel(label);
        }

        const labelledOutputArray = output.split("\n").map((line) => {

            const lineLabel = this.formatLabel(label, error);
            const newLineLabel = label !== lastLabel;
            const lbl = newLineLabel ? `${ column === 1 ? blankLabel : `\n${ lineLabel } ` }\n${ lineLabel }` : lineLabel;

            this.setLastLabel(label);

            return this.inLineFormat(line)
            // eslint-disable-next-line no-control-regex -- Replace all clear lines with positional line writes
            .replace(/[\u001B]\[K/gu, `\u001B[K\u001B[${ stripAnsi(lbl).length + 2 }G`)
            // Replace all new lines with new lines and labels
            .replace(/\r/gu, `\r${ lbl } `)
            .replace(/\n/gu, `\n${ lbl } `)
            // eslint-disable-next-line no-control-regex -- Replace all clear lines with positional line writes
            .replace(/[\u001B]\[1G/gu, `\u001B[0K${ lbl } \u001B[${ stripAnsi(lbl).length + 2 }G`);

        });

        const lbl = this.formatLabel(label, error);

        this.setLastLabel(label);

        const labelledOutput = labelledOutputArray.join(`\n${ lbl } `);

        if(column === 1){

            if(newFirstLabel){

                process.stdout.write(`${ blankLabel }\n${ firstLabel } ${ labelledOutput }`);

            }else{

                process.stdout.write(`${ firstLabel }`);

            }

        }else if(newFirstLabel){

            process.stdout.write(`\n${ blankLabel }\n${ firstLabel } ${ labelledOutput }`);

        }else{

            process.stdout.write(`${ labelledOutput }`);

        }

        started = true;

    }

    private format(label: string, message = "", color = "", error = false): string{

        let formattedMessage = message ? strip(message) : "";

        formattedMessage = color ? chalk.hex(color)(formattedMessage) : message;

        return formattedMessage.split("\n").map((line: string): string => `${ this.formatLabel(label, error) } ${ line }`).join("\n");

    }

}
