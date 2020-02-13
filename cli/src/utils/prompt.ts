

import path from "path";

import fs from "fs-extra";
import inquirer from "inquirer";


export interface Choice{
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prompt = async function(id: string, choices: Choice[]): Promise<any>{

    const key = id.replace(/[\W_\s]+/gu, "-").toLowerCase();
    const previousPath = path.join(process.cwd(), `node_modules/.cache/tamland/prompts/${ key }.json`);
    const previousExists = await fs.pathExists(previousPath);

    let previous = null;

    if(previousExists){

        const raw = await fs.readFile(previousPath);
        const project = JSON.parse(raw.toString())[key].project;

        [previous] = choices
        .map((choice, index): number | false => choice.value.project === project ? index : false)
        .filter((value): boolean => value !== false);

    }

    if(choices.length === 1){

        return choices[0].value;

    }

    const choice = await inquirer.prompt([{
        choices,
        default: previous,
        message: `Select ${ id }:`,
        name: key,
        type: "list"
    }]);

    await fs.ensureDir(path.dirname(previousPath));
    await fs.writeFile(previousPath, JSON.stringify(choice), "utf8");

    return choice[key];

};
