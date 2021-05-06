

import path from "path";

import { logger } from "@newsteam/legacy-cli-logger";
import { exec } from "@newsteam/cli-utils";

import {
    getVersions,
    googleCloudDeleteVersionsTask
} from "../version";


const label = "deploy";
const persistOldVersions = 5;


export interface GoogleCloudDeployTaskOptions{
    yaml: string;
    version?: string;
    project: string;
    promote?: boolean;
    verbosity?: "critical" | "debug" | "error" | "info" | "none" | "warning";
}


export const googleCloudDeployTask = async function(
    options: GoogleCloudDeployTaskOptions
): Promise<void>{

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- This magic number converts to seconds
    const version = options.version ?? Math.round(Date.now() / 1000);
    const promote = !options.version;

    if(options.version && !Number.isNaN(Number(options.version))){
        throw new Error("Can't use a number as a version");
    }

    if(!options.version){

        logger.log("Automatically deleting old versions...", { label });
        logger.log("", { label });

        let gcpVersions = await getVersions({
            label,
            project: options.project
        });

        // Only gcpVersions with numeric ids
        gcpVersions = gcpVersions.filter((gcpVersion) => !Number.isNaN(Number(gcpVersion.id)));

        // Sorted by id because the id is a timestamp and we wanted the oldest
        gcpVersions.sort((gcpVersionA, gcpVersionB) => Number(gcpVersionA.id) - Number(gcpVersionB.id));

        // Of those, only select gcpVersions that aren't being used
        gcpVersions = gcpVersions.filter((gcpVersion) => !gcpVersion.traffic_split);

        // Of those, select all but the most recent so we always have fallbacks
        gcpVersions = gcpVersions.filter((gcpVersion, index) => index < gcpVersions.length - persistOldVersions);

        // DELETE THOSE SUCKAS
        await googleCloudDeleteVersionsTask({
            label,
            project: options.project,
            version: gcpVersions.map((gcpVersion) => gcpVersion.id)
        });

    }

    await exec({
        command: `
            gcloud app deploy
            ${ path.resolve(options.yaml) }
            --version ${ version }
            --project ${ options.project }
            --verbosity ${ options.verbosity ?? "error" }
            ${ promote ? "" : "--no-promote" }
            --quiet
        `,
        dry: true,
        label: "deploy"
    });

};

