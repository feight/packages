

import { localGCloudSetupTaskMac } from "./mac";


export type GCloudComponent =
    "alpha" |
    "app-engine-go" |
    "app-engine-java" |
    "app-engine-php" |
    "app-engine-python" |
    "app-engine-python-extras" |
    "appctl" |
    "beta" |
    "bigtable" |
    "bq" |
    "cbt" |
    "cloud-build-local" |
    "cloud-datastore-emulator" |
    "cloud-firestore-emulator" |
    "cloud_sql_proxy" |
    "core" |
    "datalab" |
    "docker-credential-gcr" |
    "emulator-reverse-proxy" |
    "gsutil" |
    "kind" |
    "kpt" |
    "kubectl" |
    "minikube" |
    "pubsub-emulator" |
    "skaffold";


export const localGCloudSetupTask = async function(...components: GCloudComponent[]): Promise<void>{

    if(process.platform === "darwin"){

        await localGCloudSetupTaskMac(components);

    }else{

        throw new Error(`Gloud setup not implemented on platform '${ process.platform }'`);

    }

};
