/**
 * Evaluate MDX.
 *
 * @param {VFileCompatible} vfileCompatible MDX document to parse (`string`, `Buffer`, `vfile`, anything that can be given to `vfile`)
 * @param {EvaluateOptions} evaluateOptions
 * @return {Promise<MdxModule>}
 */
export function evaluate(
  vfileCompatible: VFileCompatible,
  evaluateOptions: EvaluateOptions
): Promise<MdxModule>
/**
 * Synchronously evaluate MDX.
 *
 * @param {VFileCompatible} vfileCompatible MDX document to parse (`string`, `Buffer`, `vfile`, anything that can be given to `vfile`)
 * @param {EvaluateOptions} evaluateOptions
 * @return {MdxModule}
 */
export function evaluateSync(
  vfileCompatible: VFileCompatible,
  evaluateOptions: EvaluateOptions
): MdxModule
export type VFileCompatible = import('vfile').VFileCompatible
export type EvaluateOptions =
  import('./util/resolve-evaluate-options.js').EvaluateOptions
export type MdxModule = import('../complex-types').MdxModule
export type MdxContent = import('../complex-types').MdxContent
