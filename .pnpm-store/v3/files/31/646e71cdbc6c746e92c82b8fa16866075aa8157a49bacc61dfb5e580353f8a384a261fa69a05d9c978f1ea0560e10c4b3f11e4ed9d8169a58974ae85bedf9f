interface CreateAppArgs {
    appTemplate: string;
    projectDir: string;
    remixVersion?: string;
    installDeps: boolean;
    useTypeScript: boolean;
    githubToken?: string;
    debug?: boolean;
}
export declare function createApp({ appTemplate, projectDir, remixVersion, installDeps, useTypeScript, githubToken, debug, }: CreateAppArgs): Promise<void>;
export declare function validateNewProjectPath(input: string): Promise<void>;
export declare function validateTemplate(input: string, options?: {
    githubToken: string | undefined;
}): Promise<void>;
export declare type TemplateType = "template" | "example" | "repo" | "repoTemplate" | "remoteTarball" | "local";
export declare function detectTemplateType(template: string): TemplateType | null;
export {};
