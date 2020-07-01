

import {
    config,
    Mode,
    modes
} from "@newsteam/cli-config";


export const assembleCliOptions = {
    environment: {
        description: "target a publication environment by Assemble publication environment id",
        flags: "--env --environment <environment>"
    },
    link: {
        default: false,
        description: "link to a publication before the build",
        flags: "--link"
    },
    lintAll: {
        default: config.lint.all,
        description: "lint all files, not just publication specific file",
        flags: "--all"
    },
    lintFix: {
        default: config.lint.fix,
        description: "attempt to fix lint issues automatically",
        flags: "--fix"
    },
    lintType: {
        default: undefined,
        description: "specify which lint type to run (eslint, stylelint, htmllint or flake8)",
        flags: "--type [type]"
    },
    mode: {
        default: "development",
        description: "run the build in 'development' or 'production' mode",
        flags: "--mode <mode>",
        fn: (value: string): Mode => {

            if(modes.includes(value as Mode)){
                return value as Mode;
            }

            return "development";

        }
    },
    publication: {
        description: "target a publication by Assemble publication id",
        flags: "--pub --publication <publication>"
    },
    setupType: {
        description: "specify which type of setup you want to execute.",
        flags: "--type [type]"
    },
    versionId: {
        default: undefined,
        description: "target a deployment version",
        flags: "--version <versionId>"
    }
};
