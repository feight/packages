

export type AssembleWidgetControl =
    "clear" |
    "explode" |
    "float" |
    "focal" |
    "imageEdit" |
    "implode" |
    "print" |
    "video";


export type AssembleWidgetFloatDefaults = "left" | "right";


export interface AssembleWidgetSettings{
    category: string | string[];
    controls: AssembleWidgetControl[];
    defaults?: {
        float?: AssembleWidgetFloatDefaults;
    };
    description: string;
    dialog?: {
        auto?: boolean;
        background?: string;
        customClose?: true;
        height?: "auto" | number;
        loader?: string;
        shield?: "light";
        width?: "auto" | number;
    };
    disabled?: boolean;
    documentWrite?: true;
    eggs?: {
        icon?: {
            background: string;
            path: string;
            url: string;
        };
    };
    icon: {
        background: string;
        url: string;
    };
    keywords: string;
    name?: string;
    paths: {
        origin: string;
        scripts: {
            default: string;
        };
        templates: {
            amp: string;
            default: string;
            mobile: string;
        };
    };
    sort: string;
    type: string;
    widgetId: string;
}
