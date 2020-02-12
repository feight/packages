

import chalk from "chalk";
import codeframe from "codeframe";
import getCursorPosition from "magicdawn-get-cursor-position";
import strip from "strip-color";
import stripAnsi from "strip-ansi";
import { rjust } from "justify-text";
import table from "text-table";


const nonBreakingCharacterCode = 160;
const nonBreakingCharacter = String.fromCharCode(nonBreakingCharacterCode);
const cwd = process.cwd();

let lastFormattedLabel: string | null = null;
let lastLabel: string | null = null;
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
    errorColor: string;
    errorLabelBgColor: string;
    errorLabelColor: string;
    errorLabelColorRepeat: string;
    fileColor: string;
    labelBgColor: string;
    labelColor: string;
    labelColorRepeat: string;
    lintErrorMessageColor: string;
    status200: string;
    status300: string;
    status400: string;
    status500: string;
    urlColor: string;
}


export interface LoggerOptions{
    colors?: LoggerColors;
    defaultLabel?: string;
    emojis?: { [id: string]: string };
}


export class Logger{

    carryAnsi: string;

    colors: LoggerColors;

    defaultLabel: string;

    emojis: { [id: string]: string };

    constructor(options: LoggerOptions = {}){

        this.carryAnsi = "";

        this.defaultLabel = options.defaultLabel ?? "anonymous";

        this.colors = {
            errorColor: options.colors?.errorColor ?? "#ff0000",
            errorLabelBgColor: options.colors?.errorLabelBgColor ?? "#7a170e",
            errorLabelColor: options.colors?.errorLabelColor ?? "#eeeeee",
            errorLabelColorRepeat: options.colors?.errorLabelColorRepeat ?? "#eeeeee",
            fileColor: options.colors?.fileColor ?? "#ff3bdc",
            labelBgColor: options.colors?.labelBgColor ?? "#222222",
            labelColor: options.colors?.labelColor ?? "#eeeeee",
            labelColorRepeat: options.colors?.labelColorRepeat ?? "#555555",
            lintErrorMessageColor: options.colors?.lintErrorMessageColor ?? "#999999",
            status200: options.colors?.status200 ?? "#00ff00",
            status300: options.colors?.status300 ?? "#ffff00",
            status400: options.colors?.status400 ?? "#ff0000",
            status500: options.colors?.status500 ?? "#ff0000",
            urlColor: options.colors?.urlColor ?? "#00b1e1"
        };

        this.emojis = {
            anonymous: "🤔",
            clean: "🧻",
            datastore: "💾",
            deploy: "💩",
            error: "💥",
            firestore: "🔥",
            kill: "💀",
            lint: "🔎",
            memcached: "🧠",
            open: "👀",
            optimize: "🌟",
            server: "💻",
            setup: "💿",
            tamland: "🍆",
            webpack: "📦",
            ...options.emojis ?? {}
        };

    }

    command(label = "", command = ""): void{

        this.log(command.split(" && ").join("\n"), {
            color: "#ff5400",
            label
        });

    }

    error(message: string | Error = "", options: { color?: string | true; label?: string } = {}): void{

        const {
            color = this.colors.errorColor,
            label = this.defaultLabel
        } = options;

        let formattedLabel = label;
        let formattedMessage = message;

        if(!message){
            formattedLabel = "Error";
            formattedMessage = label;
        }

        if(formattedMessage instanceof Error){

            if(formattedMessage.stack && formattedMessage.name){

                formattedMessage = `${ formattedMessage.name }\n\n${ formattedMessage.stack }`;

            }else if(formattedMessage.message){

                formattedMessage = formattedMessage.message;

            }

        }

        this.log(String(formattedMessage), {
            color: color === true ? undefined : color,
            error: true,
            label: formattedLabel
        });

    }

    lint(files: LintErrorFile[]): void{

        files.forEach((errorFile): void => {

            if(errorFile.errors.length > 0){

                const errorOutput = errorFile.errors.map((error): string => {

                    const errorFrame = codeframe.get({
                        column: error.column,
                        file: errorFile.filePath,
                        line: error.line - 1
                    });

                    const errorPointer = `${ errorFile.filePath }:${ error.line }:${ error.column }`;

                    return `${ errorPointer }\n${ chalk.hex(this.colors.lintErrorMessageColor)(error.message) }\n\n${ String(errorFrame) }\n`;

                }).join("\n");

                this.log(errorOutput, {
                    label: "lint"
                });

                process.stdout.write("\u0007");

            }

        });

    }

    log(message = "", options: {
        color?: string;
        error?: boolean;
        label?: string;
    } = {}): void{

        const {
            label = message ? this.defaultLabel : "",
            color = undefined,
            error = false
        } = options;

        const testLabel = `${ label } ${ String(error) }`;
        const formattedMessage = this.format(label, String(message), color, error);
        const blank = started ? this.formatLabel(`${ nonBreakingCharacter }`) : "";

        if(lastLabel !== testLabel && label && started){

            const cursor = getCursorPosition.sync();

            console.log(cursor.col > 1 ? `\n${ blank }` : blank);

        }

        lastLabel = testLabel;

        formattedMessage.split("\n").forEach((line): void => {

            const cursor = getCursorPosition.sync();
            const output = this.inLineFormat(line);

            console.log(cursor.col > 1 ? `\n${ output }` : output);

        });

        started = true;

    }

    table(label: string, labels: string[], data: string[][], options: table.Options): void{

        this.log(table([labels.map((lbl: string): string => chalk.bold(lbl))].concat(data), {
            ...options,
            stringLength(string): number{

                return stripAnsi(string).length;

            }
        }), { label });

    }

    write(message? : string, options?: {
        error?: boolean;
        label: string;
    }): void{

        // Normalize new line characters
        let output = (message ?? "")
        .replace(/\r\n/gu, "\n")
        .replace(/\n\r/gu, "\n")
        .replace(/\r/gu, "\n");

        /*
         * Test if there are any unclosed terminal color literals
         *
         * If you find one at the end of the message, store it so it can be
         * prepended to the next written message.
         */
        // eslint-disable-next-line require-unicode-regexp
        const match = output.match(/\033(?!\[\d*m).*$/gm);

        output = `${ this.carryAnsi }${ output }`;

        [this.carryAnsi] = match ? match : [""];

        const {
            label = this.defaultLabel,
            error = false
        } = options ?? {};

        let lbl = this.formatLabel(label);

        const testLabel = `${ label } ${ String(error) }`;
        const blank = started ? this.formatLabel(`${ nonBreakingCharacter }`) : "";
        const cursor = getCursorPosition.sync();

        /*
         * If this you're writing to the first col and your first character is a
         * new line, replace it with a label
         */
        if(cursor.col === 1){
            output = output.replace(/^\n/gu, `${ lbl } `);
        }

        // If this is the first of a repeating label series
        if(lastLabel !== testLabel){

            // Add a blank log above it
            console.log(cursor.col > 1 ? `\n${ blank }` : blank);

            // Add a label
            process.stdout.write(`${ lbl } `);

            // Set the last label
            lastLabel = testLabel;

            // Get another label so you won't have double bolding
            lbl = this.formatLabel(label);

        }

        output = output
        // Replace all clear lines with positional line writes
        // eslint-disable-next-line no-control-regex
        .replace(/[\u001B]\[K\n/gu, `\u001B[K\u001B[${ stripAnsi(lbl).length + 2 }G`)
        // Replace all new lines with new lines and labels
        .replace(/\n/gu, `\n${ lbl } `)
        // Replace all clear lines with positional line writes
        // eslint-disable-next-line no-control-regex
        .replace(/[\u001B]\[1G/gu, `\u001B[0K${ lbl }\u001B[${ stripAnsi(lbl).length + 2 }G`);

        // If a new label was writen into the output set the last label
        if(output.includes(lbl)){
            lastLabel = testLabel;
        }else if(cursor.col === 1){
            output = `${ lbl } ${ output }`;
        }

        process.stdout.write(`${ this.inLineFormat(output) }`);

    }

    private format(label: string, message = "", color = "", error = false): string{

        let formattedMessage = message ? strip(message) : "";

        formattedMessage = color ? chalk.hex(color)(formattedMessage) : message;

        return formattedMessage.split("\n").map((line: string): string => `${ this.formatLabel(label, error) } ${ line }`).join("\n");

    }

    private formatLabel(string: string, error = false): string{

        const label = stripAnsi(string);
        const clearedLabel = label;
        const justify = 12;
        const emoji = this.emojis[label.toLowerCase()] ? ` ${ this.emojis[label.toLowerCase()] }` : "";
        const formattedLabel = rjust(`${ clearedLabel }${ emoji }`, justify);
        const bgColor = this.colors.labelBgColor;
        const errorBgColor = this.colors.errorLabelBgColor;
        const firstColor = error ? this.colors.errorLabelColor : this.colors.labelColor;
        const secondColor = error ? this.colors.errorLabelColorRepeat : this.colors.labelColorRepeat;

        const color = label === lastFormattedLabel ? secondColor : firstColor;

        if(label.trim()){
            lastFormattedLabel = label;
        }

        return `${ chalk.hex(color).bgHex(error ? errorBgColor : bgColor)(` ${ formattedLabel } `) }`;

    }

    private inLineFormat(line: string): string{

        return line
        // Not really a security concern here
        // eslint-disable-next-line security/detect-non-literal-regexp
        .replace(new RegExp(`${ String(cwd.replace(/\//gu, "\\/")) }\\/(.*?)(\\]|$|\\s)`, "gu"), `${ chalk.hex(this.colors.fileColor)("$1") }$2`)
        .replace(/(https?:\/\/[^(\]|\s|")]*)/gu, chalk.hex(this.colors.urlColor)("$1"))
        .replace(/info:\s(POST|GET|PUT|PATCH|DELETE)\s(2\d\d)\s/gu, `info: $1 ${ chalk.hex(this.colors.status200)("$2") } `)
        .replace(/info:\s(POST|GET|PUT|PATCH|DELETE)\s(3\d\d)\s/gu, `info: $1 ${ chalk.hex(this.colors.status300)("$2") } `)
        .replace(/info:\s(POST|GET|PUT|PATCH|DELETE)\s(4\d\d)\s/gu, `info: $1 ${ chalk.hex(this.colors.status400)("$2") } `)
        .replace(/info:\s(POST|GET|PUT|PATCH|DELETE)\s(5\d\d)\s/gu, `info: $1 ${ chalk.hex(this.colors.status500)("$2") } `);

    }

}

export const logger = new Logger();
