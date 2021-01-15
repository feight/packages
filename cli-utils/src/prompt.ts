

import path from "path";

import fs from "fs-extra";
import inquirer from "inquirer";
import equal from "deep-equal";
import { logger } from "@newsteam/legacy-cli-logger";


export interface PromptChoice<PromptValue>{
    name?: string;
    separator?: string;
    value?: PromptValue;
}


export const prompt = async function<PromptValue>(id: string, choices: PromptChoice<PromptValue>[], value?: PromptValue): Promise<PromptValue>{

    const key = id.replace(/[\W_\s]+/gu, "-").toLowerCase();
    const previousPath = path.join(process.cwd(), `.newsteam/cache/prompts/${ key }.json`);
    const previousExists = await fs.pathExists(previousPath);

    let choice: Record<string, PromptValue> = {};
    let choiceName = "";

    let previousIndex = 0;

    if(previousExists){

        // eslint-disable-next-line security/detect-non-literal-fs-filename -- This previousPath is sanatized and probably safe
        const raw = await fs.readFile(previousPath);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No real choice here, we're read JSON
        const previous = JSON.parse(raw.toString())[key] as PromptChoice<PromptValue>;

        choices.forEach((item, index) => {

            if(equal(item.value, previous)){
                previousIndex = index;
            }

        });

    }

    if(choices.length === 1 && typeof choices[0].value !== "undefined"){

        choiceName = choices[0].name ?? "";
        choice = { [key]: choices[0].value };

    }else if(value){

        choices.forEach((item) => {

            if(equal(item.value, value)){

                choiceName = item.name ?? "";
                choice = { [key]: item.value! };

            }

        });

    }

    if(choice[key]){

        logger.log(`${ logger.chalk.bold(id) }: ${ logger.chalk.cyan(choiceName) }`, { label: "select" });

    }else{

        logger.setLastLabel("select");

        // eslint-disable-next-line require-atomic-updates, @typescript-eslint/no-unsafe-assignment -- afaik this isn't a problem here
        choice = await inquirer.prompt([{
            choices: choices.map((item) => item.separator ? new inquirer.Separator(item.separator) : item),
            default: previousIndex,
            message: `${ id }:`,
            name: key,
            pageSize: 25,
            prefix: logger.formatLabel("select"),
            type: "list"
        }]);

    }

    await fs.ensureDir(path.dirname(previousPath));

    // eslint-disable-next-line security/detect-non-literal-fs-filename -- This previousPath is sanatized and probably safe
    await fs.writeFile(previousPath, JSON.stringify(choice), "utf8");

    return choice[key];

};
