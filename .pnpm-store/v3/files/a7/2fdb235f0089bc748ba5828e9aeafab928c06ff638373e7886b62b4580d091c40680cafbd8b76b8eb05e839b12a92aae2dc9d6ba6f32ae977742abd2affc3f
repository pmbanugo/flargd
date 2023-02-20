import type { Plugin } from "esbuild";
import type { AssetsManifest } from "../../compiler/assets";
/**
 * Creates a virtual module called `@remix-run/dev/assets-manifest` that exports
 * the assets manifest. This is used in the server entry module to access the
 * assets manifest in the server build.
 */
export declare function serverAssetsManifestPlugin(assetsManifestPromise: Promise<AssetsManifest>): Plugin;
