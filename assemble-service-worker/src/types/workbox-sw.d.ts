// Type definitions for workbox-sw 4.3
// Project: https://github.com/GoogleChrome/workbox
// Definitions by: Frederik Wessberg <https://github.com/wessberg>
//				   Jason Kwok <https://github.com/JasonHK>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6

import * as WorkboxBackgroundSync from "workbox-background-sync";
import * as WorkboxBroadcastUpdate from "workbox-broadcast-update";
import * as WorkboxCacheableResponse from "workbox-cacheable-response";
import * as WorkboxCore from "workbox-core";
import * as WorkboxExpiration from "workbox-expiration";
import * as WorkboxGoogleAnalytics from "workbox-google-analytics";
import * as WorkboxNavigationPreload from "workbox-navigation-preload";
import * as WorkboxPrecaching from "workbox-precaching";
import * as WorkboxRangeRequests from "workbox-range-requests";
import * as WorkboxRouting from "workbox-routing";
import * as WorkboxStrategies from "workbox-strategies";
import * as WorkboxStreams from "workbox-streams";

declare module "workbox-sw" {

    export const backgroundSync: typeof WorkboxBackgroundSync;
    export const broadcastUpdate: typeof WorkboxBroadcastUpdate;
    export const cacheableResponse: typeof WorkboxCacheableResponse;
    export const core: typeof WorkboxCore;
    export const expiration: typeof WorkboxExpiration;
    export const googleAnalytics: typeof WorkboxGoogleAnalytics;
    export const navigationPreload: typeof WorkboxNavigationPreload;
    export const precaching: typeof WorkboxPrecaching;
    export const rangeRequests: typeof WorkboxRangeRequests;
    export const routing: typeof WorkboxRouting;
    export const strategies: typeof WorkboxStrategies;
    export const streams: typeof WorkboxStreams;

    export function loadModule(moduleName: string): void;

    export function setConfig(options?: WorkboxOptions): void;

    export interface WorkboxOptions {
        debug?: boolean;
        modulePathCb?: ModulePathCallback;
        modulePathPrefix?: string;
    }

    export type ModulePathCallback = (moduleName: string, debug: boolean) => string;

}