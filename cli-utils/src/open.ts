

import openBrowsers from "open-browsers";
import request from "request";
import { logger } from "@newsteam/cli-logger";


const label = "open";


export const open = async function(path: string, initialDelay = 0): Promise<void>{

    try{

        await new Promise((resolve): void => {

            const oneSecond = 1000;

            let attemptsBeforeRamping = 5;
            let rampingFactor = 1;

            const test = (retry = 1): void => {

                request(path, (error): void => {

                    if(error){

                        attemptsBeforeRamping -= 1;

                        if(attemptsBeforeRamping <= 0){

                            rampingFactor = 2;

                            logger.log(error.message, { label });

                            logger.log(`Opening ${ path } in your default browser: retry in ${ retry } ${ retry === 1 ? "second" : "seconds" }`, { label });

                        }

                        setTimeout((): void => test(retry * rampingFactor), retry * oneSecond);

                    }else{

                        openBrowsers(path);

                        resolve();

                    }

                });

            };

            setTimeout(() => {

                logger.log(`Opening ${ path } in your default browser`, { label });

                test();

            }, initialDelay);

        });

    }catch(error){}

};
