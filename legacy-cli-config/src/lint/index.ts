

import path from "path";

import fs from "fs-extra";

import { defaults } from "../defaults";

import type { GlobMapping } from "../paths";


export interface LintConfig{

    all?: boolean;

    fix?: boolean;

}


export class NewsTeamLintConfig{

    all: boolean;

    fix: boolean;

    constructor(config?: LintConfig){

        this.all = config?.all ?? defaults.lint.all;

        this.fix = config?.fix ?? defaults.lint.fix;

    }

    glob(extensions: string[] | string, all = false): GlobMapping{

        const extensionArray = typeof extensions === "string" ? [extensions] : extensions;
        const extension = extensionArray.length === 1 ? extensionArray[0] : `{${ extensionArray.join(",") }}`;

        const base = path.relative(process.cwd(), fs.realpathSync(path.join(process.cwd(), "src/publication/base")));
        const custom = path.relative(process.cwd(), fs.realpathSync(path.join(process.cwd(), "src/publication/custom")));
        const shared = path.relative(process.cwd(), fs.realpathSync(path.join(process.cwd(), "src/publication/shared")));

        const glob = {
            glob: [
                `${ base }/**/*.${ extension }`,
                `${ shared }/**/*.${ extension }`,
                `src/settings/**/*.${ extension }`
            ],
            ignore: [
                `**/node_modules/**/*.${ extension }`,
                `**/static/**/*.${ extension }`
            ]
        };

        if(all){
            glob.glob.push(`publications/**/*.${ extension }`);
        }else{
            glob.glob.push(`${ custom }/**/*.${ extension }`);
        }

        if(extensions.includes("js")){

            glob.ignore.push("*.json", "*.min.js");

        }

        if(extensions.includes("css")){

            glob.ignore.push("*.min.css");

        }

        if(extensions.includes("ts")){

            glob.ignore.push("*.d.ts");

        }

        return glob;

    }

}
