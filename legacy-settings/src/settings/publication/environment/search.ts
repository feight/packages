

export type AssemblePublicationEnvironmentSearchFunctionalScore = "off" | "on";


export type AssemblePublicationEnvironmentSearchPlugin = "cosmos.api.search2.plugins.elastic";


export interface AssemblePublicationEnvironmentSearchSettings{
    auth: string;
    functionalScore?: AssemblePublicationEnvironmentSearchFunctionalScore;
    indexName?: string;
    plugin: AssemblePublicationEnvironmentSearchPlugin;
    url?: string;
}
