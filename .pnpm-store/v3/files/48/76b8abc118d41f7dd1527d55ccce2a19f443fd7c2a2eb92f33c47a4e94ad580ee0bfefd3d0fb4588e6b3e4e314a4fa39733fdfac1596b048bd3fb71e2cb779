import { Adapter, FileScope } from '@vanilla-extract/css';
import { Plugin, BuildOptions } from 'esbuild';

type IdentifierOption = ReturnType<Adapter['getIdentOption']>;

declare function stringifyFileScope({ packageName, filePath, }: FileScope): string;
declare function parseFileScope(serialisedFileScope: string): FileScope;
interface ProcessVanillaFileOptions {
    source: string;
    filePath: string;
    outputCss?: boolean;
    identOption?: IdentifierOption;
    serializeVirtualCssPath?: (file: {
        fileName: string;
        fileScope: FileScope;
        source: string;
    }) => string | Promise<string>;
}
declare function processVanillaFile({ source, filePath, outputCss, identOption, serializeVirtualCssPath, }: ProcessVanillaFileOptions): Promise<string>;

declare function getSourceFromVirtualCssFile(id: string): Promise<{
    fileName: string;
    source: string;
}>;

interface PackageInfo {
    name: string;
    path: string;
    dirname: string;
}
declare function getPackageInfo(cwd?: string | null): PackageInfo;

interface VanillaExtractTransformPluginParams {
    identOption?: IdentifierOption;
}
declare const vanillaExtractTransformPlugin: ({ identOption, }: VanillaExtractTransformPluginParams) => Plugin;
interface CompileOptions {
    filePath: string;
    identOption: IdentifierOption;
    cwd?: string;
    esbuildOptions?: Pick<BuildOptions, 'plugins' | 'external' | 'define' | 'loader' | 'tsconfig'>;
}
declare function compile({ filePath, identOption, cwd, esbuildOptions, }: CompileOptions): Promise<{
    source: string;
    watchFiles: string[];
}>;

declare const hash: (value: string) => string;

interface AddFileScopeParams {
    source: string;
    filePath: string;
    rootPath: string;
    packageName: string;
}
declare function addFileScope({ source, filePath, rootPath, packageName, }: AddFileScopeParams): string;

declare function serializeCss(source: string): Promise<string>;
declare function deserializeCss(source: string): Promise<string>;

interface TransformParams {
    source: string;
    filePath: string;
    rootPath: string;
    packageName: string;
    identOption: IdentifierOption;
}
declare const transformSync: ({ source, filePath, rootPath, packageName, identOption, }: TransformParams) => string;
declare const transform: ({ source, filePath, rootPath, packageName, identOption, }: TransformParams) => Promise<string>;

declare const cssFileFilter: RegExp;
declare const virtualCssFileFilter: RegExp;

export { CompileOptions, IdentifierOption, PackageInfo, addFileScope, compile, cssFileFilter, deserializeCss, getPackageInfo, getSourceFromVirtualCssFile, hash, parseFileScope, processVanillaFile, serializeCss, stringifyFileScope, transform, transformSync, vanillaExtractTransformPlugin, virtualCssFileFilter };
