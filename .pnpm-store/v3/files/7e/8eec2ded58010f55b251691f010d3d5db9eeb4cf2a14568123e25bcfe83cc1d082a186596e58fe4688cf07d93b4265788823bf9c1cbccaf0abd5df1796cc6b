import type { RemixConfig } from "../config";
export declare function create({ appTemplate, projectDir, remixVersion, installDeps, useTypeScript, githubToken, debug, }: {
    appTemplate: string;
    projectDir: string;
    remixVersion?: string;
    installDeps: boolean;
    useTypeScript: boolean;
    githubToken?: string;
    debug?: boolean;
}): Promise<void>;
declare type InitFlags = {
    deleteScript?: boolean;
};
export declare function init(projectDir: string, { deleteScript }?: InitFlags): Promise<void>;
export declare function setup(platformArg?: string): Promise<void>;
export declare function routes(remixRoot?: string, formatArg?: string): Promise<void>;
export declare function build(remixRoot: string, modeArg?: string, sourcemap?: boolean): Promise<void>;
export declare function watch(remixRootOrConfig: string | RemixConfig, modeArg?: string): Promise<void>;
export declare function dev(remixRoot: string, modeArg?: string, flags?: {
    port?: number;
    appServerPort?: number;
}): Promise<unknown>;
export declare function codemod(codemodName?: string, projectDir?: string, { dry, force }?: {
    dry?: boolean | undefined;
    force?: boolean | undefined;
}): Promise<void>;
export {};
