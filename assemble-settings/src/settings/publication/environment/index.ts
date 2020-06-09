

import { AssemblePublicationEnvironmentInstanceSettings } from "./instance";
import { AssemblePublicationEnvironmentSearchSettings } from "./search";


export interface AssemblePublicationEnvironmentSettings{
    backendHost?: string;
    bucket?: string;
    consumerKey?: string;
    DisasterRecoveryMode?: boolean;
    host: string;
    id: string;
    instance?: AssemblePublicationEnvironmentInstanceSettings;
    isProduction?: boolean;
    name: string;
    novaHost?: string;
    search?: AssemblePublicationEnvironmentSearchSettings;
    sqlConnStr?: string;
    sqlReadReplica?: boolean;
    ssoHostname?: string;
}
