import type { RouteManifest } from "./routes";
export declare function flatRoutes(appDirectory: string, ignoredFilePatterns?: string[]): RouteManifest;
/**
 * Create route configs from a list of routes using the flat routes conventions.
 * @param {string} appDirectory - The absolute root directory the routes were looked up from.
 * @param {string[]} routePaths - The absolute route paths.
 * @param {string} [prefix=routes] - The prefix to strip off of the routes.
 */
export declare function flatRoutesUniversal(appDirectory: string, routePaths: string[], prefix?: string): RouteManifest;
export declare function isIndexRoute(routeId: string): boolean;
export declare function getRouteSegments(routeId: string): string[];
export declare function createRoutePath(routeSegments: string[], isIndex: boolean): string | undefined;
