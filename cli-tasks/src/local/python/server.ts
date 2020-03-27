

import nodemon from "nodemon";
import { logger } from "@newsteam/cli-logger";
import { kill } from "@newsteam/cli-utils";


const label = "server";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const output = (color?: string): (data: any) => void => (data: any): void => {

    // This is actually quite safe since all objects have a toString method
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const string = data.toString();

    try{

        const log = JSON.parse(string) as {
            message?: string;
            level?: "warn" | "error";
        };

        if(log.message){

            if(
                log.level === "warn" ||
                log.level === "error"
            ){

                logger.error(log.message, {
                    color: log.level === "warn" ? "#ff5400" : "#ff0000",
                    label
                });

            }else{

                logger.log(log.message, {
                    color,
                    label
                });

            }

        }

    }catch(error){

        if(string){

            String(string)
            .replace(/\n$/gu, "").split("\n")
            .forEach((line: string) => {

                if((/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}.*?\s200\s-/gu).test(line)){

                    logger.log(line, {
                        color: "#222",
                        label
                    });

                }else{

                    logger.log(line, {
                        color,
                        label
                    });

                }

            });

        }

    }

};


export interface LocalPythonServerEnvironment {
    [key: string]: string | boolean | number;
}

export interface LocalPythonVirtualenvTaskOptions{
    script?: string;
    environment?: LocalPythonServerEnvironment;
    ignore?: string[];
    watch?: string[];
}


export const localPythonServerTask = async function(
    options: LocalPythonVirtualenvTaskOptions
): Promise<void>{

    const script = options?.script ?? "src/main.py";
    const environment = options?.environment ?? {};
    const ignore = options?.ignore ?? [
        "node_modules/*",
        "build/*"
    ];
    const watch = options?.watch ?? [
        "src",
        script
    ];

    await kill(script);

    await new Promise((): void => {

        /*
         * Const old environ = {
         *  APPENGINE_RUNTIME: "python27",
         *  APPLICATION_ID: "dev~None",
         *  AUTH_DOMAIN: "gmail.com",
         *  CURRENT_MODULE_ID: "default",
         *  CURRENT_VERSION_ID: "None.896388609528280714",
         *  DATACENTER: "us1",
         *  DEFAULT_VERSION_HOSTNAME: "localhost:58008",
         *  HTTP_ACCEPT_LANGUAGE: "en-US,en;q=0.9,de;q=0.8,pt;q=0.7,af;q=0.6",
         *  HTTP_CACHE_CONTROL: "max-age=0",
         *  HTTP_COOKIE: "_ga=GA1.1.1163942236.1566814805; cX_P=jn03wsrr1e5av4b7; cX_G=cx%3A33xul46uazsu52n6sd7xwcxx68%3Ak6vcbkt519tj; ccpolicy=ccpolicyapproved; _cb_ls=1; _cb=DFf8wiSNtvgDW0Liw; _chartbeat2=.1538991685481.1566814811972.0000000000000001.tolkU7xO0GY1A_WCMVG_QBrx32b.1; _cosmos_auth=a03d20a58d3fce53d96cd15792b351d74ec20070; _em_vt=amp-Ei6F12_CJ1EQivUs2M0L-w; _lr_hb_-mkkzd0%2Fbusinesslive={%22heartbeat%22:1584971363703}; _lr_uf_-mkkzd0%2Fbusinesslive=73e05dfe-239d-475a-a56b-16b38211f594; session=\"eyJyZXR1cm5fdXJsIjoiaHR0cDovL2xvY2FsaG9zdDo1ODAwOC8ifQ\\075\\075|1584971364|abd9898783c5d029371bc87b80538da73a812a87\"; _lr_tabs_-mkkzd0%2Fbusinesslive={%22sessionID%22:0%2C%22recordingID%22:%224-0fc488ef-244e-41ce-b610-d5e78226564b%22%2C%22lastActivity%22:1584971404168}",
         *  HTTP_HOST: "localhost:58008",
         *  HTTP_SEC_FETCH_DEST: "document",
         *  HTTP_SEC_FETCH_MODE: "navigate",
         *  HTTP_SEC_FETCH_SITE: "none",
         *  HTTP_SEC_FETCH_USER: "?1",
         *  HTTP_UPGRADE_INSECURE_REQUESTS: "1",
         *  HTTP_USER_AGENT: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
         *  HTTP_X_APPENGINE_COUNTRY: "ZZ",
         *  HTTPS: "off",
         *  INSTANCE_ID: "dec527150ab6a8dd39edc38d3ba0060adce0",
         *  PATH_INFO: "/",
         *  QUERY_STRING: "",
         *  REMOTE_ADDR: "127.0.0.1",
         *  REQUEST_ID_HASH: "2A3A8CE7",
         *  REQUEST_LOG_ID: "dc5897df38cfbeddb3b28b514639ed5debde250be923dfa68641b4fff7a36536f9cea36cbec7ace2de6",
         *  REQUEST_METHOD: "GET",
         *  REQUEST_URI: "/",
         *  SCRIPT_NAME: "",
         *  SERVER_NAME: "localhost",
         *  SERVER_PORT: "58008",
         *  SERVER_PROTOCOL: "HTTP/1.1",
         *  SERVER_SOFTWARE: "Development/2.0",
         *  TZ: "UTC",
         *  USER_EMAIL: "",
         *  USER_ID: "",
         *  USER_IS_ADMIN: "0",
         *  USER_NICKNAME: "",
         *  USER_ORGANIZATION: "",
         *  "wsgi.multiprocess": true,
         *  "wsgi.multithread": false,
         *  "wsgi.run_once": false,
         *  "wsgi.url_scheme": "http"
         *};
         */

        nodemon({
            env: {
                ...environment,
                /* eslint-disable @typescript-eslint/naming-convention */
                APPLICATION_ID: "dev~None",
                CURRENT_VERSION_ID: "None.1",
                GAE_APPLICATION: "dev~None",
                GAE_VERSION: "None.1"
                /* eslint-enable @typescript-eslint/naming-convention */
            },
            execMap: {
                py: "source env/bin/activate; python3 -u"
            },
            ext: "py",
            ignore,
            script,
            stdout: false,
            watch
        })
        .on("readable", function readable(this: typeof nodemon): void{

            /* eslint-disable no-invalid-this */

            this.stdout.on("data", output());
            this.stderr.on("data", output());

            /* eslint-enable no-invalid-this */

        });

    });

};
