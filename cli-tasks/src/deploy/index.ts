

import path from "path";

import { logger } from "@newsteam/cli-logger";
import { exec } from "@newsteam/cli-utils";

import {
    deleteVersion,
    getVersions
} from "../gcloud";


const label = "deploy";
const persistOldVersions = 5;


export interface LocalDeployTaskOptions{
    yaml: string;
    version?: string;
    project: string;
    promote?: boolean;
    verbosity?: "debug" | "info" | "warning" | "error" | "critical" | "none";
}


export const deployTask = async function(
    options: LocalDeployTaskOptions
): Promise<void>{

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- This magic number converts to seconds
    const version = options.version ?? Math.round(new Date().getTime() / 1000);
    const promote = !options.version;

    if(options.version && !Number.isNaN(Number(options.version))){
        throw new Error("Can't use a number as a version");
    }

    if(!options.version){

        logger.log(logger.colorizeText("Automatically deleting old versions...", "#0f0"), { label });

        let gcpVersions = await getVersions({
            label,
            project: options.project
        });

        // Only gcpVersions with numeric ids
        gcpVersions = gcpVersions.filter((gcpVersion) => !Number.isNaN(Number(gcpVersion.id)));
        // Sorted by id because the id is a timestamp and we wanted the oldest
        gcpVersions = gcpVersions.sort((gcpVersionA, gcpVersionB) => Number(gcpVersionA.id) - Number(gcpVersionB.id));
        // Of those, only select gcpVersions that aren't being used
        gcpVersions = gcpVersions.filter((gcpVersion) => !gcpVersion.traffic_split);
        // Of those, select all but the most recent so we always have fallbacks
        gcpVersions = gcpVersions.filter((gcpVersion, index) => index < gcpVersions.length - persistOldVersions);

        if(options.yaml === "thisisnevertrue"){

            // DELETE THOSE SUCKAS
            await Promise.all(gcpVersions.map((gcpVersion) => deleteVersion({
                project: options.project,
                version: gcpVersion.id
            })));

        }

    }

    const command = `
        gcloud app deploy
        ${ path.resolve(options.yaml) },
        --version=${ version },
        --project=${ options.project },
        --verbosity=${ options.verbosity ?? "error" },
        ${ promote ? "" : "--no-promote" }
        --quiet
    `;

    console.log(command);

    if(options.yaml === "thisisnevertrue"){

        await exec({
            command,
            label: "deploy"
        });

    }

};

