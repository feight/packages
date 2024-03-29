
/*

    eslint

    @typescript-eslint/naming-convention: "off",

    --

    This is necessary because the naming convention of these properties maps
    to Google App Engine instance configuration. For more information checkout out
    https://cloud.google.com/appengine/docs/standard/python/config/appref

*/


export type InstanceClass = "B2" | "B4_1G" | "B4" | "B8" | "F1" | "F2" | "F4_1G B1" | "F4";

export type Runtime = "nodejs10" | "nodejs12" | "python27" | "python37";


export interface Handler{
    expiration: string;
    http_headers: Record<string, string>;
    mime_type: string;
    redirect_http_response_code: number;
    secure: "always" | "never" | "optional";
    script: string;
    static_dir: string;
    static_files: string;
    upload: string;
    url: string;
}


export interface AutomaticScaling{
    target_cpu_utilization: number;
    min_instances: number;
    max_instances: number;
    min_pending_latency: string;
    max_pending_latency: string;
    max_concurrent_requests: number;
}


export interface AppYaml {
    automatic_scaling?: AutomaticScaling;
    default_expiration?: string;
    entrypoint?: string;
    env_variables?: Record<string, string>;
    error_handlers: {
        file: string;
        error_code: {
            error_code: "over_quota" | "timeout";
            file: string;
        }[];
    };
    handlers?: Handler[];
    inbound_services?: "warmup"[];
    instance_class: InstanceClass;
    runtime: Runtime;
    service: string;
    vpc_access_connector: {
        name: string;
    };
}
