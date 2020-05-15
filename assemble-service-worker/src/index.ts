

import WorkboxNamespace from "workbox-sw";

declare const workbox: typeof WorkboxNamespace;

declare function importScripts(...urls: string[]): void;


export interface TamlandServiceWorkerOptions{

    /**
     * Optional.
     *
     * The assets you would like the service worker to precache
     *
     */
    precache: (string|{
        url: string;
        revision: string;
    })[];

}


export class ServiceWorker{

    precache: (string|{
        url: string;
        revision: string;
    })[];

    constructor(options?: TamlandServiceWorkerOptions){

        const {
            precache = []
        } = options ?? {};

        this.precache = precache;

    }

    start(): void{

        importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

        workbox.precaching.precacheAndRoute(this.precache);

        /*
         * Images carry most of the weight for a web page. Use this rule to serve
         * them quickly from the cache, while making sure you don’t cache them
         * indefinitely, consuming your users' storage.
         */
        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg|svg)$/gu,
            new workbox.strategies.CacheFirst({
                cacheName: "images",
                plugins: [
                    new workbox.expiration.Plugin({
                        // 30 Days
                        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                        maxAgeSeconds: 30 * 24 * 60 * 60,
                        maxEntries: 60
                    })
                ]
            })
        );

        /*
         * Make your JS and CSS ⚡ fast by returning the assets from the cache,
         * while making sure they are updated in the background for the next use.
         */
        workbox.routing.registerRoute(/\.js$/gu, new workbox.strategies.CacheFirst());

        workbox.routing.registerRoute(/\.css$/gu, new workbox.strategies.CacheFirst());

        workbox.routing.registerRoute(/\.*\/$/gu, new workbox.strategies.NetworkFirst());

        workbox.googleAnalytics.initialize();

    }

}
