
import { exec } from "@newsteam/cli-utils";


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


export const deleteVersion = async function(options: {
    label?: string;
    project: string;
    version: string;
}): Promise<void>{

    await exec({
        command: `gcloud app versions delete ${ options.version } --project ${ options.project } --quiet`,
        label: options.label
    });

};


export const getVersions = async function(options: {
    label?: string;
    project: string;
}): Promise<GcloudAppVersion[]>{

    const raw = await exec({
        command: `gcloud app versions list --project ${ options.project } --format="json"`,
        label: options.label
    });

    return JSON.parse(raw) as GcloudAppVersion[];

};


export const setVersion = async function(options: {
    label?: string;
    project: string;
    version: string;
}): Promise<void>{

    await exec({
        command: `gcloud app services set-traffic --splits ${ options.version }=1 --project ${ options.project } --quiet`,
        label: options.label
    });

};
