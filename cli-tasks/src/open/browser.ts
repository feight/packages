

import open from "open-browsers";
import request from "request";
import { logger } from "@newsteam/legacy-cli-logger";


const label = "open";


const testEndpoint = function(path: string): Promise<string | boolean>{

    return new Promise<string | boolean>((resolve) => {

        request(path, (error): void => {

            resolve(error ? false : path);

        });

    });

};


const testEndpoints = async function(paths: string[]): Promise<string[]>{

    const tests = await Promise.all(paths.map((path) => testEndpoint(path)));

    return tests.filter((test) => typeof test === "string") as string[];

};


export const openBrowserTask = async function(path: string, initialDelay = 0, prerequisites: string[] = []): Promise<void>{

    try{

        await new Promise<void>((resolve): void => {

            const oneSecond = 1000;
            const maxRetryTime = 10;
            const completedPrerequisites: string[] = [];

            let attemptsBeforeRamping = 5;
            let rampingFactor = 1;

            const test = async (retryTime = 1): Promise<void> => {

                const retry = retryTime < maxRetryTime ? retryTime : maxRetryTime;

                const triggerRetry = function(): void{

                    attemptsBeforeRamping -= 1;

                    if(attemptsBeforeRamping <= 0){

                        rampingFactor = 2;

                        logger.log(`Opening ${ path } in your default browser: retry in ${ retry } ${ retry === 1 ? "second" : "seconds" }`, { label });

                    }

                    setTimeout((): void => {

                        // eslint-disable-next-line @typescript-eslint/no-floating-promises -- this is chilled
                        test(retry * rampingFactor);

                    }, (retry < maxRetryTime ? retry : maxRetryTime) * oneSecond);

                };

                const prerequisitesTests = await testEndpoints(prerequisites.filter((endpoint) => completedPrerequisites.indexOf(endpoint)));

                prerequisitesTests.forEach((item) => {
                    completedPrerequisites.push(item);
                });

                if(completedPrerequisites.length === prerequisites.length){

                    const pathTest = await testEndpoint(path);

                    if(typeof pathTest === "string"){

                        open(path);

                        resolve();

                    }else{

                        triggerRetry();

                    }

                }else{

                    triggerRetry();

                }

            };

            setTimeout(() => {

                logger.log(`Opening ${ path } in your default browser`, { label });

                // eslint-disable-next-line @typescript-eslint/no-floating-promises -- this is chilled
                test();

            }, initialDelay);

        });

    }catch{}

};
