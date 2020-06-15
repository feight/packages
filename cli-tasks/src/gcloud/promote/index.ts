

import {
    exec,
    prompt
} from "@newsteam/cli-utils";


import {
    GcloudAppVersion,
    getVersions
} from "../version";


const label = "promote";


export interface GoogleCloudPromoteTaskOptions{
    project: string;
}


export const googleCloudPromoteTask = async function(
    options: GoogleCloudPromoteTaskOptions
): Promise<void>{

    const percentBase = 100;

    const versions = await getVersions({
        label,
        project: options.project
    });

    const version = await prompt<GcloudAppVersion>("version", versions.map((versionItem) => ({
        name: `
            ${ Number.isNaN(Number(versionItem.id)) ? versionItem.id : versionItem.last_deployed_time.datetime }
            |
            ${ versionItem.traffic_split * percentBase }%
        `
        .replace(/\n/gu, " ")
        .split(" ")
        .filter(Boolean)
        .join(" "),
        value: versionItem
    })));

    await exec({
        command: `
            gcloud app services set-traffic
            --splits ${ version.id }=1
            --project ${ options.project }
            --quiet
        `,
        dry: true,
        label: "promote"
    });

};
