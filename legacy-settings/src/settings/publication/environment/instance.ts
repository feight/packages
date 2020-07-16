

export type AssemblePublicationEnvironmentInstanceClass = "F1" | "F2" | "F4" | "F4_1G" | "B1" | "B2" | "B4" | "B4_1G" | "B8";


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
