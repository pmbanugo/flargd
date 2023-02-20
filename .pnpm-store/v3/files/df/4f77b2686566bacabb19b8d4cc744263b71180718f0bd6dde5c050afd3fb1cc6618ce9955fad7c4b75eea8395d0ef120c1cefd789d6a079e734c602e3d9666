import type * as esbuild from "esbuild";
import type { RemixConfig } from "../config";
export interface AssetsManifest {
    version: string;
    url?: string;
    entry: {
        module: string;
        imports: string[];
    };
    routes: {
        [routeId: string]: {
            id: string;
            parentId?: string;
            path?: string;
            index?: boolean;
            caseSensitive?: boolean;
            module: string;
            imports?: string[];
            hasAction: boolean;
            hasLoader: boolean;
            hasCatchBoundary: boolean;
            hasErrorBoundary: boolean;
        };
    };
    cssBundleHref?: string;
}
export declare function createAssetsManifest({ config, metafile, cssBundlePath, }: {
    config: RemixConfig;
    metafile: esbuild.Metafile;
    cssBundlePath?: string;
}): Promise<AssetsManifest>;
