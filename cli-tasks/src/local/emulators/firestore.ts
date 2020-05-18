

import {
    kill,
    spawn
} from "@newsteam/cli-utils";


interface LocalFirestoreEmulatorTaskConfig{
    host: string;
    port: number;
}


export const localFirestoreEmulatorTask = async function(config: LocalFirestoreEmulatorTaskConfig): Promise<void>{

    try{

        await kill(config.port);

    }catch{}

    await spawn({
        command: `gcloud beta emulators firestore start --host-port=${ config.host }:${ config.port } --quiet`,
        filter: /\[firestore\]\s/gu,
        label: "firestore"
    });

};
