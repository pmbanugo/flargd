import type { Plugin } from "esbuild";
export declare function isCssSideEffectImportPath(path: string): boolean;
declare const loaders: readonly ["js", "jsx", "ts", "tsx"];
declare type Loader = typeof loaders[number];
/**
 * This plugin detects side-effect imports of CSS files and adds a suffix
 * to the import path, e.g. `import "./styles.css"` is transformed to
 * `import "./styles.css?__remix_sideEffect__"`). This allows them to be
 * differentiated from non-side-effect imports so that they can be added
 * to the CSS bundle. This is primarily designed to support packages that
 * import plain CSS files directly within JS files.
 */
export declare const cssSideEffectImportsPlugin: (options: {
    rootDirectory: string;
}) => Plugin;
export declare function addSuffixToCssSideEffectImports(loader: Loader, code: string): string;
export {};
