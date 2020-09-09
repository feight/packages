

import { exec } from "@newsteam/cli-utils";

import { promptEnvironment } from "../../utils/prompt-environment";
import { promptPublication } from "../../utils/prompt-publication";

import type { SetupTaskOptions } from ".";


const dry = true;

const label = "setup";


export type SetupFrontEndTaskOptions = SetupTaskOptions;


export const setupFrontEndTask = async function(options: SetupFrontEndTaskOptions): Promise<void>{

    const publication = await promptPublication(options.publication);
    const environment = await promptEnvironment(publication, options.environment);

    await exec({
        command: `
            gcloud datastore indexes create src/index.yaml
            --project ${ environment.id }
            --verbosity=error
            --quiet
        `,
        dry,
        label
    });

    await exec({
        command: `
            gcloud services enable
                maps-backend.googleapis.com
                geocoding-backend.googleapis.com
                language.googleapis.com
                maps-backend.googleapis.com
                static-maps-backend.googleapis.com
                places-backend.googleapis.com
                youtube.googleapis.com
                directions-backend.googleapis.com
                container.googleapis.com
            --project ${ environment.id }
            --verbosity=error
            --quiet
        `,
        dry,
        label
    });

    await exec({
        command: `
            gcloud container clusters create main-cluster
            --zone europe-west1-b
            --disk-size 10
            --machine-type n1-standard-2
            --maintenance-window=00:00
            --num-nodes 1
            --enable-autoupgrade
            --project ${ environment.id }
            --verbosity=error
            --quiet
        `,
        dry,
        label
    });

};
