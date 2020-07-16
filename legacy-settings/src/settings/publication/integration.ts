export interface AssemblePublicationIntegrationSettings{
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
