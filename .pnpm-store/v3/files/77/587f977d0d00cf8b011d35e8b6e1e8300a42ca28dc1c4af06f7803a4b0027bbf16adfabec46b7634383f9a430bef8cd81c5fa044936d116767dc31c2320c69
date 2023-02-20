/**
 * Create smart processors to handle different formats.
 *
 * @param {CompileOptions} [options]
 */
export function createLoader(
  options?: import('../compile.js').CompileOptions | undefined
): {
  getFormat: (url: string, context: unknown, defaultGetFormat: Function) => any
  transformSource: (
    value: string,
    context: {
      [x: string]: unknown
      url: string
    },
    defaultTransformSource: Function
  ) => Promise<any>
}
export type CompileOptions = import('../compile.js').CompileOptions
