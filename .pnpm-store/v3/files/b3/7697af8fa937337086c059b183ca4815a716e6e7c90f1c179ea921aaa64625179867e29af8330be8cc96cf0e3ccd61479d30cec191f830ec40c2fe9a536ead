/**
 * Compile MDX w/ rollup.
 *
 * @param {ProcessorAndRollupOptions} [options]
 * @return {Plugin}
 */
export function rollup(options?: ProcessorAndRollupOptions | undefined): Plugin
export type FilterPattern = import('@rollup/pluginutils').FilterPattern
export type Plugin = import('rollup').Plugin
export type CompileOptions = import('../compile.js').CompileOptions
export type RollupPluginOptions = {
  /**
   * List of picomatch patterns to include
   */
  include?: import('@rollup/pluginutils').FilterPattern | undefined
  /**
   * List of picomatch patterns to exclude
   */
  exclude?: import('@rollup/pluginutils').FilterPattern | undefined
}
export type ProcessorAndRollupOptions = CompileOptions & RollupPluginOptions
