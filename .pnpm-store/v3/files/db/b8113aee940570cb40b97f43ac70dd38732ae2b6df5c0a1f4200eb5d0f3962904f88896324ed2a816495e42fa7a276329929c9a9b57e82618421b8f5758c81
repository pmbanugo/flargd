import type { RouteManifest, DefineRoutesFunction } from "./config/routes";
import { ServerMode } from "./config/serverModes";
export interface RemixMdxConfig {
    rehypePlugins?: any[];
    remarkPlugins?: any[];
}
export declare type RemixMdxConfigFunction = (filename: string) => Promise<RemixMdxConfig | undefined> | RemixMdxConfig | undefined;
export declare type ServerBuildTarget = "node-cjs" | "arc" | "netlify" | "vercel" | "cloudflare-pages" | "cloudflare-workers" | "deno";
export declare type ServerModuleFormat = "esm" | "cjs";
export declare type ServerPlatform = "node" | "neutral";
declare type Dev = {
    port?: number;
    appServerPort?: number;
    remixRequestHandlerPath?: string;
    rebuildPollIntervalMs?: number;
};
interface FutureConfig {
    unstable_cssModules: boolean;
    unstable_cssSideEffectImports: boolean;
    unstable_dev: boolean | Dev;
    unstable_vanillaExtract: boolean;
    v2_errorBoundary: boolean;
    v2_meta: boolean;
    v2_routeConvention: boolean;
}
/**
 * The user-provided config in `remix.config.js`.
 */
export interface AppConfig {
    /**
     * The path to the `app` directory, relative to `remix.config.js`. Defaults
     * to `"app"`.
     */
    appDirectory?: string;
    /**
     * The path to a directory Remix can use for caching things in development,
     * relative to `remix.config.js`. Defaults to `".cache"`.
     */
    cacheDirectory?: string;
    /**
     * A function for defining custom routes, in addition to those already defined
     * using the filesystem convention in `app/routes`. Both sets of routes will
     * be merged.
     */
    routes?: (defineRoutes: DefineRoutesFunction) => Promise<ReturnType<DefineRoutesFunction>>;
    /**
     * The path to the server build, relative to `remix.config.js`. Defaults to
     * "build".
     *
     * @deprecated Use {@link ServerConfig.serverBuildPath} instead.
     */
    serverBuildDirectory?: string;
    /**
     * The path to the server build file, relative to `remix.config.js`. This file
     * should end in a `.js` extension and should be deployed to your server.
     *
     * If omitted, the default build path will be based on your
     * {@link ServerConfig.serverBuildTarget}.
     */
    serverBuildPath?: string;
    /**
     * The path to the browser build, relative to `remix.config.js`. Defaults to
     * "public/build".
     */
    assetsBuildDirectory?: string;
    /**
     * The path to the browser build, relative to remix.config.js. Defaults to
     * "public/build".
     *
     * @deprecated Use `{@link ServerConfig.assetsBuildDirectory}` instead
     */
    browserBuildDirectory?: string;
    /**
     * The URL prefix of the browser build with a trailing slash. Defaults to
     * `"/build/"`. This is the path the browser will use to find assets.
     */
    publicPath?: string;
    /**
     * The port number to use for the dev server. Defaults to 8002.
     */
    devServerPort?: number;
    /**
     * The delay, in milliseconds, before the dev server broadcasts a reload
     * event. There is no delay by default.
     */
    devServerBroadcastDelay?: number;
    /**
     * Additional MDX remark / rehype plugins.
     */
    mdx?: RemixMdxConfig | RemixMdxConfigFunction;
    /**
     * The output format of the server build. Defaults to "cjs".
     *
     * @deprecated Use {@link ServerConfig.serverBuildTarget} instead.
     */
    serverModuleFormat?: ServerModuleFormat;
    /**
     * The platform the server build is targeting. Defaults to "node".
     *
     * @deprecated Use {@link ServerConfig.serverBuildTarget} instead.
     */
    serverPlatform?: ServerPlatform;
    /**
     * The target of the server build. Defaults to "node-cjs".
     */
    serverBuildTarget?: ServerBuildTarget;
    /**
     * A server entrypoint, relative to the root directory that becomes your
     * server's main module. If specified, Remix will compile this file along with
     * your application into a single file to be deployed to your server. This
     * file can use either a `.js` or `.ts` file extension.
     */
    server?: string;
    /**
     * A list of filenames or a glob patterns to match files in the `app/routes`
     * directory that Remix will ignore. Matching files will not be recognized as
     * routes.
     */
    ignoredRouteFiles?: string[];
    /**
     * A list of patterns that determined if a module is transpiled and included
     * in the server bundle. This can be useful when consuming ESM only packages
     * in a CJS build.
     */
    serverDependenciesToBundle?: Array<string | RegExp>;
    /**
     * A function for defining custom directories to watch while running `remix dev`, in addition to `appDirectory`.
     */
    watchPaths?: string | string[] | (() => Promise<string | string[]> | string | string[]);
    future?: Partial<FutureConfig>;
}
/**
 * Fully resolved configuration object we use throughout Remix.
 */
export interface RemixConfig {
    /**
     * The absolute path to the root of the Remix project.
     */
    rootDirectory: string;
    /**
     * The absolute path to the application source directory.
     */
    appDirectory: string;
    /**
     * The absolute path to the cache directory.
     */
    cacheDirectory: string;
    /**
     * The path to the entry.client file, relative to `config.appDirectory`.
     */
    entryClientFile: string;
    /**
     * The path to the entry.server file, relative to `config.appDirectory`.
     */
    entryServerFile: string;
    /**
     * An object of all available routes, keyed by route id.
     */
    routes: RouteManifest;
    /**
     * The path to the server build file. This file should end in a `.js`. Defaults
     * are based on {@link ServerConfig.serverBuildTarget}.
     */
    serverBuildPath: string;
    /**
     * The absolute path to the assets build directory.
     */
    assetsBuildDirectory: string;
    /**
     * the original relative path to the assets build directory
     */
    relativeAssetsBuildDirectory: string;
    /**
     * The URL prefix of the public build with a trailing slash.
     */
    publicPath: string;
    /**
     * The mode to use to run the server.
     */
    serverMode: ServerMode;
    /**
     * The port number to use for the dev (asset) server.
     */
    devServerPort: number;
    /**
     * The delay before the dev (asset) server broadcasts a reload event.
     */
    devServerBroadcastDelay: number;
    /**
     * Additional MDX remark / rehype plugins.
     */
    mdx?: RemixMdxConfig | RemixMdxConfigFunction;
    /**
     * The output format of the server build. Defaults to "cjs".
     */
    serverModuleFormat: ServerModuleFormat;
    /**
     * The platform the server build is targeting. Defaults to "node".
     */
    serverPlatform: ServerPlatform;
    /**
     * The target of the server build.
     */
    serverBuildTarget?: ServerBuildTarget;
    /**
     * The default entry module for the server build if a {@see RemixConfig.customServer} is not provided.
     */
    serverBuildTargetEntryModule: string;
    /**
     * A server entrypoint relative to the root directory that becomes your server's main module.
     */
    serverEntryPoint?: string;
    /**
     * A list of patterns that determined if a module is transpiled and included
     * in the server bundle. This can be useful when consuming ESM only packages
     * in a CJS build.
     */
    serverDependenciesToBundle: Array<string | RegExp>;
    /**
     * A list of directories to watch.
     */
    watchPaths: string[];
    /**
     * The path for the tsconfig file, if present on the root directory.
     */
    tsconfigPath: string | undefined;
    future: FutureConfig;
}
/**
 * Returns a fully resolved config object from the remix.config.js in the given
 * root directory.
 */
export declare function readConfig(remixRoot?: string, serverMode?: ServerMode): Promise<RemixConfig>;
export {};
