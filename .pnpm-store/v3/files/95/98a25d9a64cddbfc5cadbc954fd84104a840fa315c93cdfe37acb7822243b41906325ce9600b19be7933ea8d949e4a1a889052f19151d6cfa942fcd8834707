import type { RouteManifest } from "./routes";
export declare const routeModuleExts: string[];
export declare function isRouteModuleFile(filename: string): boolean;
/**
 * Defines routes using the filesystem convention in `app/routes`. The rules are:
 *
 * - Route paths are derived from the file path. A `.` in the filename indicates
 *   a `/` in the URL (a "nested" URL, but no route nesting). A `$` in the
 *   filename indicates a dynamic URL segment.
 * - Subdirectories are used for nested routes.
 *
 * For example, a file named `app/routes/gists/$username.tsx` creates a route
 * with a path of `gists/:username`.
 */
export declare function defineConventionalRoutes(appDir: string, ignoredFilePatterns?: string[]): RouteManifest;
export declare let paramPrefixChar: "$";
export declare let escapeStart: "[";
export declare let escapeEnd: "]";
export declare let optionalStart: "(";
export declare let optionalEnd: ")";
export declare function createRoutePath(partialRouteId: string): string | undefined;
export declare function isSegmentSeparator(checkChar: string | undefined): boolean;
