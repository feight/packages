

import { exec } from "@newsteam/cli-utils";


export { googleCloudDeleteVersionsTask } from "./delete";


export interface GcloudAppVersion{
    /* eslint-disable @typescript-eslint/naming-convention -- not our naming convention, it comes from gcloud */
    environment: {
        name: string;
        value: number;
    };
    id: string;
    last_deployed_time: {
        datetime: string;
        day: number;
        hour: number;
        microsecond: number;
        minute: number;
        month: number;
        second: number;
        year: number;
    };
    project: string;
    service: string;
    traffic_split: number;
    version: {
        createTime: string;
        createdBy: string;
        diskUsageBytes: string;
        env: string;
        id: string;
        instanceClass: string;
        name: string;
        runtime: string;
        runtimeApiVersion: string;
        servingStatus: string;
        threadsafe: boolean;
        versionUrl: string;
    };
    /* eslint-enable @typescript-eslint/naming-convention */
}


export const getVersions = async function(options: {
    label?: string;
    project: string;
}): Promise<GcloudAppVersion[]>{

    const raw = await exec({
        command: `gcloud app versions list --project ${ options.project } --format="json"`,
        detatch: true,
        label: options.label
    });

    return JSON.parse(raw) as GcloudAppVersion[];

};
