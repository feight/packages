
/*

    eslint

    security/detect-non-literal-regexp: "off",

    --

    Keeping these rules off to keep this simple

*/


import path from "path";

import fs from "fs-extra";
import { logger } from "@newsteam/cli-logger";
import {
    watch,
    WatchOptions
} from "@newsteam/cli-utils";
import {
    AssemblePublicationSettings,
    AssembleWidgetSettings,
    getPublicationSettings
} from "@newsteam/assemble-settings";


const createJSBundle = (mappings: Record<string, string>): string => {

    const modules = Object.keys(mappings).map((key) => `${ key }: require("${ mappings[key] }")`).join(",\n");

    return `module.exports = {\n${ modules }\n};`;

};

const createCSSBundle = (mappings: Record<string, string>): string => Object.keys(mappings).map((key) => `@import "${ mappings[key] }";`).join("\n");

const isDirectory = (source: string): boolean => fs.lstatSync(source).isDirectory();

const getDirectories = (source: string): string[] => {

    if(fs.existsSync(source)){
        return fs.readdirSync(source).map((name) => path.join(source, name)).filter((directory) => isDirectory(directory));
    }

    return [];

};


const getWidgetAssetPath = (
    id: string,
    asset: string,
    roots: string[],
    relative: string
): string => roots.map((root): string => {

    const base = `${ root }/widgets/${ id }`;

    return fs.existsSync(path.join(base, asset)) ? path.relative(relative, path.join(base, asset)) : "";

})
.filter((assetPath) => assetPath !== "")
.slice(-1)[0];


export interface BuildWidgetsTaskOptions extends WatchOptions{
    destination: string;
    roots: string[];
    label?: string;
    source: string;
}


// eslint-disable-next-line max-lines-per-function -- Simpler to leave this as one function
export const buildWidgetsTask = async function(options: BuildWidgetsTaskOptions): Promise<void>{

    const {
        destination,
        label = "build",
        roots,
        source
    } = options;

    // eslint-disable-next-line max-lines-per-function -- Simpler to leave this as one function
    await watch(options, async (): Promise<void> => {

        const rawSharedSettings = await fs.readFile("src/publication/shared/settings/index.json", "utf8");

        const settings = getPublicationSettings();

        let sharedSettings: AssemblePublicationSettings | undefined = undefined;

        try{
            sharedSettings = JSON.parse(rawSharedSettings) as AssemblePublicationSettings;
        }catch{
            throw new Error("Shared settings file could not be parsed as valid json");
        }

        const settingsWidgets = settings.widgets ?? sharedSettings.widgets ?? [];

        settingsWidgets.push("error");

        const widgets: Record<string, AssembleWidgetSettings | undefined> = {};

        roots.forEach((root) => {

            const directories = getDirectories(path.join(root, "widgets"));

            directories.forEach((directory) => {

                const id = directory.split("/")[directory.split("/").length - 1];
                const metaPath = path.join(`${ root }/widgets/${ id }`, "index.json");

                if(fs.existsSync(metaPath)){

                    const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as AssembleWidgetSettings;

                    if(

                        meta.disabled !== true &&

                        /*
                         *  And if a widget with the same id doesn't already exist.
                         *  This will enforce the heirarchy in the order of paths.
                         */
                        !widgets[id] &&
                        // And...
                        (
                            // There is no widget filter configuration
                            settingsWidgets.length === 0 ||
                            // Or the widget filter configuration is empty
                            settingsWidgets.length === 0 ||
                            // Or the widget is in the list of allowed widgets
                            settingsWidgets.includes(id)
                        )
                    ){

                        meta.paths = {
                            ...meta.paths,
                            origin: path.relative(source, root)
                        };

                        widgets[id] = meta;

                    }

                }

            });

        });

        Object.keys(widgets).forEach((key) => {

            const meta = widgets[key];

            if(meta){

                meta.paths = Object.assign(meta.paths, {
                    scripts: {
                        default: getWidgetAssetPath(key, "index.py", roots, source)
                    },
                    templates: {
                        amp: getWidgetAssetPath(key, "modes/amp/index.html", roots, source),
                        default: getWidgetAssetPath(key, "index.html", roots, source),
                        mobile: getWidgetAssetPath(key, "modes/mobile/index.html", roots, source)
                    }
                });

                // Add icon urls to the widget
                meta.icon.url = `/${ String(meta.paths.origin) }/widgets/${ key }/icons/128x128.png`;

                // Add easter egg icon urls to the widget
                if(meta.eggs?.icon){
                    meta.eggs.icon.url = `/${ String(meta.paths.origin) }/widgets/${ key }/icons/${ String(meta.eggs.icon.path) }`;
                }

            }

            widgets[key] = meta;

        });

        const baseJSModules: Record<string, string> = {};
        const editJSModules: Record<string, string> = {};
        const baseSCSSModules: Record<string, string> = {};
        const editSCSSModules: Record<string, string> = {};
        const ampSCSSModules: Record<string, string> = {};

        Object.keys(widgets).forEach((key) => {

            let found = false;

            roots.forEach((root) => {

                const base = `${ root }/widgets/${ key }`;

                // Source these from the first instance of the widget type
                if(!found && fs.existsSync(`${ base }/index.json`)){

                    if(fs.existsSync(`${ base }/edit/index.scss`)){
                        editSCSSModules[key] = `${ base.replace(new RegExp(`^${ source }/`, "gu"), "") }/edit/index.scss`;
                    }

                    if(fs.existsSync(`${ base }/edit/index.js`)){
                        editJSModules[key] = `${ base.replace(new RegExp(`^${ source }/publication/`, "gu"), "") }/edit`;
                    }

                    found = true;

                }

                // Source these from the last instance of the widget type
                if(fs.existsSync(`${ base }/index.js`)){
                    baseJSModules[key] = `${ base.replace(new RegExp(`^${ source }/publication/`, "gu"), "") }`;
                }

                if(fs.existsSync(`${ base }/index.scss`)){
                    baseSCSSModules[key] = `${ base.replace(new RegExp(`^${ source }/`, "gu"), "") }/index.scss`;
                }

                if(fs.existsSync(`${ base }/modes/amp/index.scss`)){
                    ampSCSSModules[key] = `${ base.replace(new RegExp(`^${ source }/`, "gu"), "") }/modes/amp/index.scss`;
                }

            });

        });

        const baseJS = createJSBundle(baseJSModules);
        const editJS = createJSBundle(editJSModules);
        const baseSCSS = createCSSBundle(baseSCSSModules);
        const editSCSS = createCSSBundle(editSCSSModules);
        const ampSCSS = createCSSBundle(ampSCSSModules);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- The lint is a lie
        const dialogEntryFactoryLogic = roots.filter((root) => {

            let matched = false;

            Object.keys(widgets).forEach((key) => {

                const widget = widgets[key];

                if(widget && widget.paths.origin === path.relative(source, root)){
                    matched = true;
                }

            });

            return matched;

        }).map((root) => {

            const base = root.replace(new RegExp(`^${ source }/`, "gu"), "");
            const magic = `/* webpackChunkName: "${ base }/widget/dialog/[request]" */`;

            return `
                if(widget.paths.origin === "${ base }"){
                    return import(${ magic }\`${ base }/widgets/\${ widget.type }/edit/dialog/index.js\`);
                }
            `;

        }).join("\n");

        const dialogEntryFactory = `
            module.exports = function getWidgetEditEntryPoint(widget){
                ${ dialogEntryFactoryLogic }
            };
        `;

        const writes: [string, string][] = [
            [path.join(destination, "widgets.js"), baseJS],
            [path.join(destination, "widgets.dialog.entry.js"), dialogEntryFactory],
            [path.join(destination, "widgets.scss"), baseSCSS],
            [path.join(destination, "widgets.edit.js"), editJS],
            [path.join(destination, "widgets.edit.scss"), editSCSS],
            [path.join(destination, "widgets.modes.amp.scss"), ampSCSS],
            [path.join(destination, "widgets.json"), JSON.stringify(widgets, undefined, 2)]
        ];

        const bar = logger.progress({
            label,
            tag: "widget entries",
            total: writes.length
        });

        await Promise.all(writes.map(async (write) => {

            const [filename, contents] = write;

            const exists = fs.existsSync(filename);
            const existing = exists ? (await fs.readFile(filename)).toString() : undefined;

            if(existing !== contents){

                await fs.ensureDir(path.dirname(filename));
                await fs.writeFile(filename, contents, "utf8");

            }

            if(options.watch){
                logger.log(`built widget entry ${ path.resolve(filename) }`, { label });
            }else{
                bar.tick();
            }

        }));

    });

};
