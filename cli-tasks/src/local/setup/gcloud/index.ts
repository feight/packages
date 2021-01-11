

import { localGCloudSetupTaskMac } from "./mac";


export type GCloudComponent =
    "alpha" | "app-engine-go" | "app-engine-java" | "app-engine-php" | "app-engine-python-extras" | "app-engine-python" | "appctl" | "beta" | "bigtable" | "bq" | "cbt" | "cloud_sql_proxy" | "cloud-build-local" | "cloud-datastore-emulator" | "cloud-firestore-emulator" | "core" | "datalab" | "docker-credential-gcr" | "emulator-reverse-proxy" | "gsutil" | "kind" | "kpt" | "kubectl" | "minikube" | "pubsub-emulator" | "skaffold";


export const localGCloudSetupTask = async function(...components: GCloudComponent[]): Promise<void>{

    if(process.platform === "darwin"){

        await localGCloudSetupTaskMac(components);

    }else{

        throw new Error(`Gloud setup not implemented on platform '${ process.platform }'`);

    }

};
