import type { RemixConfig } from "../config";
import type { AssetsManifest } from "./assets";
import type { CompileOptions } from "./options";
export declare type WatchOptions = Partial<CompileOptions> & {
    reloadConfig?(root: string): Promise<RemixConfig>;
    onRebuildStart?(): void;
    onRebuildFinish?(durationMs: number, assetsManifest?: AssetsManifest): void;
    onFileCreated?(file: string): void;
    onFileChanged?(file: string): void;
    onFileDeleted?(file: string): void;
    onInitialBuild?(durationMs: number): void;
};
export declare function watch(config: RemixConfig, { mode, liveReloadPort, target, sourcemap, reloadConfig, onWarning, onCompileFailure, onRebuildStart, onRebuildFinish, onFileCreated, onFileChanged, onFileDeleted, onInitialBuild, }?: WatchOptions): Promise<() => Promise<void>>;
