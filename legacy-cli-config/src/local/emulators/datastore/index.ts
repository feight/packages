

import { validate } from "@newsteam/schema";

import { defaults } from "../../../defaults";


export interface LocalDatastoreEmulatorConfig{

    /**
     * Changes the emulator's data directory.
     */
    directory?: string;

    /**
     * The firestore host (defaults to 127.0.0.1).
     */
    host: string;

    /**
     * Configures the emulator to persist any data to disk for the emulator session.
     */
    persist?: boolean;

    /**
     * The firestore port (defaults to 8081).
     */
    port: number;

}

export class NewsTeamLocalDatastoreEmulatorConfig{

    @validate({
        allow: undefined,
        type: "string"
    })
        directory?: string;

    @validate({
        hostname: true,
        ip: true,
        type: "string"
    })
        host: string;

    @validate({
        allow: undefined,
        type: "boolean"
    })
        persist: boolean;

    @validate({
        port: true,
        type: "number"
    })
        port: number;

    constructor(config?: LocalDatastoreEmulatorConfig){

        this.directory = config?.directory;
        this.host = config?.host ?? defaults.local.emulators.datastore.host;
        this.persist = config?.persist ?? defaults.local.emulators.datastore.persist;
        this.port = config?.port ?? defaults.local.emulators.datastore.port;

    }

}
