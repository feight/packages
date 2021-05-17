

/*
 *  This is a stub config that is used when .webpack.ts not found in the assemble
 *  project root.
 */

import { config as configuration } from "@newsteam/legacy-webpack-config";

import type { Configuration } from "webpack";
import type {
    Args,
    Environment
} from "@newsteam/legacy-webpack-config";


export const config = configuration() as (environment?: Environment | undefined, args?: Args | undefined) => Configuration;
