

import { rules } from "./rules";

import type { Configuration } from "webpack";
import type { Options } from "../..";


/*
 * These options determine how the different types of modules within a project
 * will be treated.
 *
 * https://webpack.js.org/configuration/module/
 */
export const module = function(
    options: Options,
    config: Configuration
): Configuration{

    return rules(config, options);

};
