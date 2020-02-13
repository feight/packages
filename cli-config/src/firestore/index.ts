

import { validate } from "@newsteam/schema";

import { defaults } from "../defaults";


export interface FirestoreConfig{

    /**
     * The firestore host (defaults to localhost).
     */
    host: string;

    /**
     * The firestore port (defaults to 8080).
     */
    port: number;

}

export class NewsTeamFirestoreConfig{

    @validate({
        hostname: true,
        ip: true,
        type: "string"
    })
    host: string;

    @validate({
        port: true,
        type: "number"
    })
    port: number;

    constructor(overrides?: FirestoreConfig){

        this.host = overrides?.host ?? defaults.firestore.host;
        this.port = overrides?.port ?? defaults.firestore.port;

    }

}
