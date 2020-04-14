

import * as datastore from "./datastore";
import * as firestore from "./firestore";


export interface LocalEmulatorsConfig{

    datastore?: datastore.LocalDatastoreEmulatorConfig;

    firestore?: firestore.LocalFirestoreEmulatorConfig;

}


export class NewsTeamLocalEmulatorsConfig{

    datastore: datastore.NewsTeamLocalDatastoreEmulatorConfig;

    firestore: firestore.NewsTeamLocalFirestoreEmulatorConfig;

    constructor(config?: LocalEmulatorsConfig){

        this.datastore = new datastore.NewsTeamLocalDatastoreEmulatorConfig(config?.datastore);

        this.firestore = new firestore.NewsTeamLocalFirestoreEmulatorConfig(config?.firestore);

    }

}
