

import type { InstanceClass } from "../app-yaml";


export interface AssembleEnvironmentInstance{
    class: InstanceClass;
    scaling: {
        maxConcurrentRequests: number;
        maxIdleInstances: number;
        minIdleInstances: number;
    };
}


export interface AssembleEnvironmentSearch{
    auth: string;
    plugin: string;
    url: string;
}


export interface AssembleEnvironment{
    backendHost: string;
    bucket: string;
    consumerKey: string;
    host: string;
    id: string;
    instance?: AssembleEnvironmentInstance;
    name: string;
    novaHost: string;
    search?: AssembleEnvironmentSearch;
    ssoHostname: string;
}


export interface AssembleEnvironments {
    default: Exclude<AssembleEnvironment,
    "backendHost" | "host" | "id" | "instance" | "name" | "search"
    >;
    [id: string]: AssembleEnvironment;
}
