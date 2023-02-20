/**
 * Add the micromark and mdast extensions for MDX.js (JS aware MDX).
 *
 * @type {import('unified').Plugin<[Options?]|[], Root>}
 */
export function remarkMdx(
  options?:
    | import('micromark-extension-mdx-expression/dev/lib/syntax').Options
    | undefined
):
  | void
  | import('unified').Transformer<import('mdast').Root, import('mdast').Root>
export type Root = import('mdast').Root
export type Options = import('micromark-extension-mdxjs').Options
export type DoNotTouchAsThisImportIncludesMdxInTree =
  typeof import('mdast-util-mdx')
