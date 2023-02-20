import type { WriteChannel } from "../channel";
import type { RemixConfig } from "../config";
import type { AssetsManifest } from "./assets";
import type { CompileOptions } from "./options";
export declare type BrowserCompiler = {
    compile: (manifestChannel: WriteChannel<AssetsManifest>) => Promise<void>;
    dispose: () => void;
};
export declare const createBrowserCompiler: (remixConfig: RemixConfig, options: CompileOptions) => BrowserCompiler;
