

import path from "path";

import fs from "fs-extra";
import inquirer from "inquirer";


export interface PromptChoice{
    name?: string;
    separator?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prompt = async function(id: string, choices: PromptChoice[]): Promise<any>{

    const key = id.replace(/[\W_\s]+/gu, "-").toLowerCase();
    const previousPath = path.join(process.cwd(), `.local/cache/@newsteam/cli-utils/prompts/${ key }.json`);
    const previousExists = await fs.pathExists(previousPath);

    // The previous value could be any value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let previous: any;

    if(previousExists){

        // This previousPath is sanatized and probably safe
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        const raw = await fs.readFile(previousPath);

        // No real choice here, we're read JSON
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        previous = JSON.parse(raw.toString())[key];

    }

    if(choices.length === 1){

        // No real choice here, we're read JSON
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return choices[0].value;

    }

    const choice: { [id: string]: string} = await inquirer.prompt([{
        choices: choices.map((item) => item.separator ? new inquirer.Separator(item.separator) : item),
        default: previous,
        message: `Select ${ id }:`,
        name: key,
        type: "list"
    }]);

    await fs.ensureDir(path.dirname(previousPath));

    // This previousPath is sanatized and probably safe
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fs.writeFile(previousPath, JSON.stringify(choice), "utf8");

    return choice[key];

};
