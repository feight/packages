

export interface AssembleAccountsSettings{
    facebook?: {
        user: string;
    };
    instagram?: {
        user: string;
    };
    twitter?: {
        user: string;
    };
    youtube?: {
        type: string;
    };
}


export type AssembleApiPlugin = "plugins.gn4_image_search" | "plugins.paradise";


export interface AssembleArticleContentType{
    key: string;
    text: string;
}


export interface AssembleArticleStyle{
    id: string;
    name: string;
}


export interface AssembleAuthorType{
    key: string;
    name: string;
}


export interface AssembleClientsSettings{
    sso: string[];
}


export interface AssembleConsoleSettings{
    powerups: string[];
}


export interface AssembleDefaultsSettings{
    articleCommentsEnabled?: boolean;
    articleShowAuthorCard?: boolean;
    articleSyndication?: boolean;
    articleType?: boolean;
    featuredListSize?: boolean;
    videoWidgetAggregation?: boolean;
}


export interface AssembleDmozSettings{
    category: string;
}


export interface AssembleFeaturesSettings{
    amp?: boolean;
    appStats?: boolean;
    articleLock?: boolean;
    authors?: boolean;
    autoPopulateImageKeywords?: boolean;
    autoPublishWorkflowList?: boolean;
    businessCalendar?: boolean;
    comments?: boolean;
    customContent?: boolean;
    deviceDetection?: boolean;
    deviceLoginLimit?: number;
    forceArticleKeywords?: boolean;
    forceArticleSynopsis?: boolean;
    forceImageAuthor?: boolean;
    forceImageDescription?: boolean;
    forceImageKeywords?: boolean;
    allowFuturePublish?: boolean;
    logrocket?: boolean;
    nativePush?: boolean;
    plainTextNoAccessParCount?: number;
    publicApiAccessCheck?: boolean;
    push?: boolean;
    print?: boolean;
    sponsors?: boolean;
    tansa?: boolean;
    userSubCodesInRequest?: boolean;
    viewCache?: boolean;
    workflow?: boolean;
    workflowStatusPermission?: boolean;
}


export interface AssembleIntegrationSettings{
    chartbeat?: {
        apiKey: string;
        domain: string;
        uid: string;
    };
    cosmos?: {
        images: {
            name: string;
            url: string;
        }[];
    };
    deviceAtlas?: {
        licenceKey: string;
    };
    disqus?: {
        accessToken: string;
        api: string;
        id: string;
        publicKey: string;
        secret: string;
    };
    facebook?: {
        appId: string;
        secret: string;
        trackingId: string;
        version: string;
    };
    firebase?: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
    };
    giphy?: {
        apiKey: string;
    };
    google?: {
        analytics?: {
            account: string;
            serviceAccountEmail: string;
            trendingStartDate: string;
            viewId: string;
        };
        browser?: {
            apiKey: string;
        };
        news?: {
            genre: string;
            language: string;
        };
        oauth2?: {
            clientId: string;
            secret: string;
        };
        recaptcha?: {
            key: string;
        };
    };
    iframely?: {
        apiKey: string;
    };
    jwplayer?: {
        key: string;
    };
    logrocket?: {
        apiKey: string;
    };
    nativePush?: {
        endpoint: string;
    };
    tansa?: {
        baseUrl: string;
        clientExtenstionJs: string;
        isTestPage: boolean;
        licenseKey: string;
        parentAppId: string;
        parentAppVersion: string;
        tansaUserId: string;
        userId: string;
    };
}


export interface AssembleMetaSettings{
    description: string;
    keywords: string;
}


export interface AssembleWhitelistAccessSettings{
    guest?: string[];
    internal?: string[];
    notGuest?: string[];
}


export interface AssembleSettings{
    accounts?: AssembleAccountsSettings;
    apiPlugins?: AssembleApiPlugin[];
    articleContentTypes?: AssembleArticleContentType[];
    articleStyles?: AssembleArticleStyle[];
    authorTypes?: AssembleAuthorType[];
    clients?: AssembleClientsSettings;
    console?: AssembleConsoleSettings;
    consoleVersion?: number;
    copyright: string;
    // We want this to be any because it supports anything the client puts in
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    custom?: any;
    customContentId?: string;
    defaults?: AssembleDefaultsSettings;
    dmoz?: AssembleDmozSettings;
    features?: AssembleFeaturesSettings;
    integrations?: AssembleIntegrationSettings;
    locale?: string;
    mail?: string;
    meta?: AssembleMetaSettings;
    name: string;
    // This is deprecated, we're going to ditch it in the future
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newsletters?: any;
    novaImportPub?: string;
    pubId: string;
    sendgridApiKey?: string;
    // This is deprecated, we're going to ditch it in the future
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    teasers?: any;
    timezone?: string;
    title: string;
    unsecurePaths?: string[];
    url: string;
    widgets?: string[];
    whitelistAccess?: AssembleWhitelistAccessSettings;
}
