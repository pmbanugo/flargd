import type { RemixConfig } from "../config";
import type { AssetsManifest } from "./assets";
import type { BrowserCompiler } from "./compileBrowser";
import type { ServerCompiler } from "./compilerServer";
import type { OnCompileFailure } from "./onCompileFailure";
import type { CompileOptions } from "./options";
declare type RemixCompiler = {
    browser: BrowserCompiler;
    server: ServerCompiler;
};
export declare const createRemixCompiler: (remixConfig: RemixConfig, options: CompileOptions) => RemixCompiler;
export declare const compile: (compiler: RemixCompiler, options?: {
    onCompileFailure?: OnCompileFailure;
}) => Promise<AssetsManifest | undefined>;
export declare const dispose: (compiler: RemixCompiler) => void;
export {};
