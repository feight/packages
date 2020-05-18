

import path from "path";

import fs from "fs-extra";
import { exec } from "@newsteam/cli-utils";
import { logger } from "@newsteam/cli-logger";

import { NewsTeamConfig } from "../../config";


import { label } from ".";


export const buildReleaseTask = async function(config: NewsTeamConfig): Promise<void>{

    const bar = logger.progress({
        label,
        tag: "release info",
        total: 2
    });

    bar.tick();

    const stdout = await exec({
        command: "git log --merges --max-count=500",
        detatch: true
    });

    const lines = stdout.split("\n");

    const rawCommits: string[][] = [];
    let commit = [lines[0]];

    lines.forEach((line, index) => {
        if(index >= 1){
            if(line.startsWith("commit ")){
                rawCommits.push(commit);
                commit = [];
                commit.push(line);
            }else{
                commit.push(line);
            }
        }
    });

    const commits = rawCommits.map((item) => {

        const pr = item[5].trim();

        if(pr.startsWith("Merge pull request #")){

            let message = "";

            const minItemIndex = 7;

            item.forEach((string, index) => {
                if(index >= minItemIndex){
                    message += string.trim();
                }
            });

            return {
                author: {
                    email: item[2].replace("Author: ", "").split("<")[1].replace(">", "").trim(),
                    name: item[2].replace("Author: ", "").split("<")[0].trim()
                },
                date: item[3].replace("Date: ", "").trim(),
                id: item[0].replace("commit ", "").trim(),
                merge: {
                    id: item[1].replace("Merge: ", "").trim()
                },
                message,
                pull: pr.split("#")[1].split(" ")[0],
                raw: item.join("\n")
            };

        }

    }).filter((item) => item !== undefined);

    const indent = 4;
    const file = path.resolve(path.join(config.paths.build, "releases.json"));

    await fs.writeFile(
        file,
        JSON.stringify(
            {
                releases: commits
            },
            undefined,
            indent
        ),
        "utf8"
    );

    bar.tick();

};
