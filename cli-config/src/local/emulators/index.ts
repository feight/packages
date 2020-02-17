

import * as firestore from "./firestore";


export interface LocalEmulatorsConfig{

    firestore?: firestore.LocalFirestoreEmulatorConfig;

}


export class NewsTeamLocalEmulatorsConfig{

    firestore: firestore.NewsTeamLocalFirestoreEmulatorConfig;

    constructor(config?: LocalEmulatorsConfig){

        this.firestore = new firestore.NewsTeamLocalFirestoreEmulatorConfig(config?.firestore);

    }

}
