/**
 * A Webpack (4+) loader for xdm.
 * See `webpack.cjs`, which wraps this, because Webpack loaders must currently
 * be CommonJS.
 * `file.map` is defined when a `SourceMapGenerator` is passed in options.
 *
 * @this {LoaderContext}
 * @param {string} value
 * @param {(error: Error|null|undefined, content?: string|Buffer, map?: Object) => void} callback
 */
export function loader(
  value: string,
  callback: (
    error: Error | null | undefined,
    content?: string | Buffer | undefined,
    map?: Object | undefined
  ) => void
): void
export type LoaderContext = import('webpack').LoaderContext<unknown>
