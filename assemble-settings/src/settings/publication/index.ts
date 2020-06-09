

import path from "path";

import fs from "fs-extra";

import { AssemblePublicationAccountsSettings } from "./accounts";
import { AssemblePublicationApiPlugin } from "./api-plugin";
import { AssemblePublicationArticleContentType } from "./article-content-type";
import { AssemblePublicationArticleStyle } from "./article-style";
import { AssemblePublicationAuthorType } from "./author-type";
import { AssemblePublicationClientsSettings } from "./client";
import { AssemblePublicationConsoleSettings } from "./console";
import { AssemblePublicationDefaultsSettings } from "./defaults";
import { AssemblePublicationDmozSettings } from "./dmoz";
import { AssemblePublicationEnvironmentSettings } from "./environment";
import { AssemblePublicationFeaturesSettings } from "./features";
import { AssemblePublicationIntegrationSettings } from "./integration";
import { AssemblePublicationMetaSettings } from "./meta";
import { AssemblePublicationWhitelistAccessSettings } from "./whitelist-access";


export interface AssemblePublicationSettings{
    accounts?: AssemblePublicationAccountsSettings;
    apiPlugins?: AssemblePublicationApiPlugin[];
    articleContentTypes?: AssemblePublicationArticleContentType[];
    articleStyles?: AssemblePublicationArticleStyle[];
    authorTypes?: AssemblePublicationAuthorType[];
    clients?: AssemblePublicationClientsSettings;
    console?: AssemblePublicationConsoleSettings;
    consoleVersion?: number;
    copyright: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- We want this to be any because it supports anything the client puts in
    custom?: any;
    customContentId?: string;
    defaults?: AssemblePublicationDefaultsSettings;
    dmoz?: AssemblePublicationDmozSettings;
    environments: AssemblePublicationEnvironmentSettings[];
    features?: AssemblePublicationFeaturesSettings;
    integrations?: AssemblePublicationIntegrationSettings;
    locale?: string;
    mail?: string;
    meta?: AssemblePublicationMetaSettings;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is deprecated, we're going to ditch it in the future
    newsletters?: any;
    novaImportPub?: string;
    pubId: string;
    sendgridApiKey?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is deprecated, we're going to ditch it in the future
    teasers?: any;
    timezone?: string;
    title: string;
    unsecurePaths?: string[];
    url: string;
    widgets?: string[];
    whitelistAccess?: AssemblePublicationWhitelistAccessSettings;
}


export const getPublicationSettings = function(folder = "src/publication/custom"): AssemblePublicationSettings{

    const settingsPath = path.join(folder, "settings/index.json");
    const environmentsPath = folder ? path.join(folder, "settings/environments.json") : "src/publication/custom/settings/environments.json";

    if(!fs.existsSync(settingsPath)){
        throw new Error(`Could not find settings path ${ settingsPath }`);
    }

    if(!fs.existsSync(environmentsPath)){
        throw new Error(`Could not find environment settings path ${ environmentsPath }`);
    }

    const environmentMap = JSON.parse(fs.readFileSync(environmentsPath).toString()) as { [ key: string ]: AssemblePublicationEnvironmentSettings };
    const environments: AssemblePublicationEnvironmentSettings[] = [];

    Object.keys(environmentMap).forEach((key) => {

        if(key !== "default"){
            environments.push(environmentMap[key]);
        }

    });

    return {
        ...JSON.parse(fs.readFileSync(settingsPath).toString()),
        environments
    } as AssemblePublicationSettings;

};
