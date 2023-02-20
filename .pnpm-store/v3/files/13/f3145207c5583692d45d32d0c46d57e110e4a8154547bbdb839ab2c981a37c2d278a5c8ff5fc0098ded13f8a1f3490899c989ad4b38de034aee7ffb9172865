import type { StaticHandlerContext } from "@remix-run/router";
import type { RouteManifest, ServerRouteManifest, EntryRoute } from "./routes";
import type { RouteModules, EntryRouteModule } from "./routeModules";
export interface EntryContext {
    manifest: AssetsManifest;
    routeModules: RouteModules<EntryRouteModule>;
    serverHandoffString?: string;
    staticHandlerContext: StaticHandlerContext;
    future: FutureConfig;
}
export interface FutureConfig {
    unstable_cssModules: true;
    unstable_cssSideEffectImports: boolean;
    unstable_dev: false | {
        remixRequestHandlerPath?: string;
    };
    unstable_vanillaExtract: boolean;
    v2_errorBoundary: boolean;
    v2_meta: boolean;
}
export interface AssetsManifest {
    entry: {
        imports: string[];
        module: string;
    };
    routes: RouteManifest<EntryRoute>;
    url: string;
    version: string;
}
export declare function createEntryRouteModules(manifest: ServerRouteManifest): RouteModules<EntryRouteModule>;
