

import "reflect-metadata";

import { rcFile } from "rc-config-loader";
import { Validate } from "@newsteam/schema";

import * as firestore from "./firestore";
import * as server from "./server";


const overrides: Config = rcFile("newsteam")?.config ?? {};


export type Mode = "development" | "production";


export type Platform = "desktop" | "mobile" | "web";


export type Target = "client" | "server";


export interface Config{

    firestore?: firestore.FirestoreConfig;
    server?: server.ServerConfig;

}


export class NewsTeamConfig{

    firestore: firestore.NewsTeamFirestoreConfig;
    server: server.NewsTeamServerConfig;

    constructor(config: Config){

        this.firestore = new firestore.NewsTeamFirestoreConfig(config.firestore);
        this.server = new server.NewsTeamServerConfig(config.server);

    }

}


const unvalidated = new NewsTeamConfig(overrides);


export const config = Validate.validate(unvalidated);
