

import { validate } from "@newsteam/schema";

import { defaults } from "../../../defaults";


export interface LocalFirestoreEmulatorConfig{

    /**
     * The firestore host (defaults to 127.0.0.1).
     */
    host: string;

    /**
     * The firestore port (defaults to 8081).
     */
    port: number;

}

export class NewsTeamLocalFirestoreEmulatorConfig{

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

    constructor(config?: LocalFirestoreEmulatorConfig){

        this.host = config?.host ?? defaults.local.emulators.firestore.host;
        this.port = config?.port ?? defaults.local.emulators.firestore.port;

    }

}
