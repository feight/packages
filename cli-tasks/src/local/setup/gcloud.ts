

import { logger } from "@newsteam/cli-logger";
import {
    exec,
    spawn
} from "@newsteam/cli-utils";


interface Version{
    // This is the gcloud component version format - we don't chose it
    /* eslint-disable @typescript-eslint/naming-convention */
    "current_version_string": string;
    "id": string;
    "is_configuration": boolean;
    "is_hidden": boolean;
    "latest_version_string": string;
    "name": string;
    "size": number;
    "state": {
        "name": string;
    };
    /* eslint-enable @typescript-eslint/naming-convention */
}

const label = "setup";

let versions: Version[] = [];


export const localGCloudSetupTask = async function(component?: string): Promise<void>{

    if(component){

        if(versions.length === 0){

            const rawVersions = await exec({
                command: "gcloud components list --format=json",
                detatch: true
            });

            // This works ok - leaving it alone for now
            // eslint-disable-next-line require-atomic-updates
            versions = JSON.parse(rawVersions);

        }

        const filtered = versions.filter((item): boolean => item.id === component);
        const [version] = filtered;

        if(filtered.length > 0 && version.state.name !== "Not Installed"){

            if(version.latest_version_string === version.current_version_string){

                logger.log(`✔ gcloud ${ component }`, {
                    color: "#00ff00",
                    label
                });

            }else{

                await spawn({
                    command: "gcloud components update --quiet",
                    label
                });

            }

        }else{

            await spawn({
                command: `gcloud components install ${ component } --quiet`,
                label
            });

        }

    }else{

        let installed = "";

        try{

            // Check if the Google Cloud SDK is installed
            installed = await spawn({
                command: "gcloud --version",
                detatch: true
            });

            logger.log("✔ gcloud", {
                color: "#00ff00",
                label
            });

        }catch(error){}

        if(!installed){

            // Install the Google Cloud SDK
            await spawn({
                command: "curl https://sdk.cloud.google.com | bash",
                label
            });

            // Initialized the Google Cloud SDK
            await spawn({
                command: "gcloud init --quiet",
                label
            });

        }

    }

};
