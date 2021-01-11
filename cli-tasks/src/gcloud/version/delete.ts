

import { exec } from "@newsteam/cli-utils";


export const googleCloudDeleteVersionsTask = async function(options: {
    label?: string;
    project: string;
    version: string[] | string;
}): Promise<void>{

    const versions = typeof options.version === "string" ? [options.version] : options.version;

    await Promise.all(versions.map((version) => exec({
        command: `
            gcloud app versions delete ${ version }
            --project ${ options.project }
            --quiet
        `,
        dry: true,
        label: options.label ?? "gcloud"
    })));

};
