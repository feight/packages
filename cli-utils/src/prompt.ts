

import path from "path";

import fs from "fs-extra";
import inquirer from "inquirer";


export interface PromptChoice{
    name?: string;
    separator?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This value could be any
    value?: any;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This promise could return any
export const prompt = async function(id: string, choices: PromptChoice[]): Promise<any>{

    const key = id.replace(/[\W_\s]+/gu, "-").toLowerCase();
    const previousPath = path.join(process.cwd(), `.local/cache/@newsteam/cli-utils/prompts/${ key }.json`);
    const previousExists = await fs.pathExists(previousPath);

    let previous: PromptChoice | undefined = undefined;

    if(previousExists){

        // eslint-disable-next-line security/detect-non-literal-fs-filename -- This previousPath is sanatized and probably safe
        const raw = await fs.readFile(previousPath);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No real choice here, we're read JSON
        previous = JSON.parse(raw.toString())[key] as PromptChoice;

    }

    if(choices.length === 1){

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- No real choice here, we're read JSON
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

    // eslint-disable-next-line security/detect-non-literal-fs-filename -- This previousPath is sanatized and probably safe
    await fs.writeFile(previousPath, JSON.stringify(choice), "utf8");

    return choice[key];

};
