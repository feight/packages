

export type AssemblePublicationEnvironmentInstanceClass = "B1" | "B2" | "B4_1G" | "B4" | "B8" | "F1" | "F2" | "F4_1G" | "F4";


export interface AssemblePublicationEnvironmentInstanceSettings{
    class: AssemblePublicationEnvironmentInstanceClass;
    scaling: {
        idleTimeout?: string;
        minPendingLatency?: string;
        maxPendingLatency?: string;
        minIdleInstances?: number;
        maxIdleInstances?: number;
        maxInstances?: number;
        maxConcurrentRequests?: number;
        targetCpuUtilization?: number;
        targetThroughputUtilization?: number;
    };
}
