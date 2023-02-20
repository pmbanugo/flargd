import type * as esbuild from "esbuild";
declare const modes: readonly ["development", "production", "test"];
declare type Mode = typeof modes[number];
export declare const parseMode: (raw: string, fallback?: Mode) => Mode;
declare type Target = "browser" | "server" | "cloudflare-workers" | "node14";
export declare type CompileOptions = {
    mode: Mode;
    liveReloadPort?: number;
    target: Target;
    sourcemap: boolean;
    onWarning?: (message: string, key: string) => void;
    onCompileFailure?: (failure: Error | esbuild.BuildFailure) => void;
};
export {};
