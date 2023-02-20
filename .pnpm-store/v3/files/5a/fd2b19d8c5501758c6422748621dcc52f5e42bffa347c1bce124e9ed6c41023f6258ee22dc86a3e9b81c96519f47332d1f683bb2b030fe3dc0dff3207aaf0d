import type { ReadChannel } from "../channel";
import type { RemixConfig } from "../config";
import type { AssetsManifest } from "./assets";
import type { CompileOptions } from "./options";
export declare type ServerCompiler = {
    compile: (manifestChannel: ReadChannel<AssetsManifest>) => Promise<void>;
    dispose: () => void;
};
export declare const createServerCompiler: (remixConfig: RemixConfig, options: CompileOptions) => ServerCompiler;
