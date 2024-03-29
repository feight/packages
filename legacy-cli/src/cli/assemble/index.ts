

import { bind } from "../../utils/bind";

import { assembleBuildCommand } from "./commands/build";
import { assembleCleanCommand } from "./commands/clean";
import { assembleCleanCacheCommand } from "./commands/clean-cache";
import { assembleDeployCommand } from "./commands/deploy";
import { assembleLinkCommand } from "./commands/link";
import { assembleLintCommand } from "./commands/lint";
import { assembleLocalCommand } from "./commands/local";
import { assembleOptimizeCommand } from "./commands/optimize";
import { assemblePromoteCommand } from "./commands/promote";
import { assembleSetupCommand } from "./commands/setup";
import { assembleTestCommand } from "./commands/test";

import type { Command } from "commander";


export const assembleCommand = function(name: string, parent: Command): Command{

    const program = parent.command(name);

    bind("build", assembleBuildCommand, program);
    bind("clean", assembleCleanCommand, program);
    bind("clean-cache", assembleCleanCacheCommand, program);
    bind("deploy", assembleDeployCommand, program);
    bind("link", assembleLinkCommand, program);
    bind("lint", assembleLintCommand, program);
    bind("local", assembleLocalCommand, program);
    bind("optimize", assembleOptimizeCommand, program);
    bind("promote", assemblePromoteCommand, program);
    bind("setup", assembleSetupCommand, program);
    bind("test", assembleTestCommand, program);

    return program;

};
