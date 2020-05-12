

import path from "path";

import fs from "fs-extra";
import {
    localDatastoreEmulatorTask,
    localDockerRunTask,
    localPythonVirtualenvTask,
    localPythonServerTask,
    localRedisServerTask,
    openBrowserTask
} from "@newsteam/cli-tasks";
import { logger } from "@newsteam/cli-logger";
import { getPublicationSettings } from "@newsteam/assemble-settings";

import { localWatchTask } from "./watch";

import { NewsTeamConfig } from "../../config";
import {
    buildTask,
    BuildTaskOptions
} from "../build";


const getCredentials = function(): string{

    const credentialsJSONRaw = path.join(process.cwd(), "src/publication/custom/settings/account.json");
    const credentialsPKCSRaw = path.join(process.cwd(), "src/publication/custom/settings/account.p12");
    const credentialsJSON = fs.existsSync(credentialsJSONRaw) ? credentialsJSONRaw : undefined;
    const credentialsPKCS = fs.existsSync(credentialsPKCSRaw) ? credentialsPKCSRaw : undefined;

    const credentials = credentialsJSON ?? credentialsPKCS ?? undefined;

    if(!credentials){

        logger.error(`
            Your publication does not have a credentials file

            Please add an account.json or account.p12 in your publication settings folder

            For more information on creating credentials: https://cloud.google.com/docs/authentication/getting-started
        `.split("\n")
        .map((line) => line
        .trim())
        .join("\n"));

        process.exit();

    }

    return credentials;

};


export const localTask = async function(config: NewsTeamConfig, options: BuildTaskOptions): Promise<void>{

    const openDelay = 2000;
    const credentials = getCredentials();

    await buildTask(config, options);

    await localDockerRunTask(config.local.docker.elasticsearch);
    await localDockerRunTask(config.local.docker.mysql);

    const settings = getPublicationSettings();

    if(!config.local.python.server.useDevAppServer){

        await localPythonVirtualenvTask();

    }

    await Promise.all([
        localWatchTask(config, options),
        localRedisServerTask(config.local.redis.server),
        localDatastoreEmulatorTask({
            ...config.local.emulators.datastore,
            directory: `.local/gcloud/emulators/datastore/${ settings.pubId }`
        }),
        localPythonServerTask({
            environment: {
                // Nodemon configurtion - we don't chose these property names
                /* eslint-disable @typescript-eslint/naming-convention */
                DATASTORE_DATASET: `assemble-${ settings.pubId }`,
                DATASTORE_EMULATOR_HOST: `${ config.local.emulators.datastore.host }:${ config.local.emulators.datastore.port }`,
                DATASTORE_EMULATOR_HOST_PATH: `${ config.local.emulators.datastore.host }:${ config.local.emulators.datastore.port }/datastore`,
                DATASTORE_HOST: config.local.emulators.datastore.host,
                DATASTORE_PROJECT_ID: `assemble-${ settings.pubId }`,
                FIRESTORE_EMULATOR_HOST: `${ config.local.emulators.firestore.host }:${ config.local.emulators.firestore.port }`,
                GOOGLE_APPLICATION_CREDENTIALS: credentials,
                local: true,
                mode: options.mode,
                PORT: config.local.python.server.port
                /* eslint-enable @typescript-eslint/naming-convention */
            },
            port: config.local.python.server.port,
            useDevAppServer: config.local.python.server.useDevAppServer
        }),
        openBrowserTask(`http://localhost:${ config.local.python.server.port }`, openDelay)
    ]);

};
