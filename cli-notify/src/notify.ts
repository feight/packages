

import path from "path";

import notifier from "node-notifier";


export interface NotifyOptions{
    image?: string;
    message?: string;
    open?: string;
    timeout?: number;
    title: string;
}


export const notify = async function(notifyOptions: NotifyOptions | string): Promise<{
    event: notifier.NotificationMetadata | undefined;
    notification: Error | null;
    options: string;
}>{

    return new Promise((resolve) => {

        const defaultTimeout = 0;
        const contentImage = typeof notifyOptions !== "string" && notifyOptions.image ? notifyOptions.image : path.join(__dirname, "static/icon.png");
        const sound = "Blow";
        const timeout = typeof notifyOptions !== "string" && typeof notifyOptions.timeout !== "undefined" ? notifyOptions.timeout : defaultTimeout;
        const title = typeof notifyOptions !== "string" && notifyOptions.title ? notifyOptions.title : "News Team";
        const message = typeof notifyOptions !== "string" && notifyOptions.message ? notifyOptions.message : String(notifyOptions);
        const open = typeof notifyOptions !== "string" && notifyOptions.open ? notifyOptions.open : undefined;

        notifier.notify({
            contentImage,
            icon: undefined,
            message,
            open,
            sound,
            timeout,
            title,
            wait: true
        }, (notification, options, event) => {
            // Triggers if `wait: true` and user clicks notification

            resolve({
                event,
                notification,
                options
            });

        });

    });

};
