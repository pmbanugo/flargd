/**
 * @remix-run/dev v1.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Mark all URL imports as external so that each URL import is preserved in the build output.
 */
const urlImportsPlugin = () => {
  return {
    name: "url-imports",
    setup(build) {
      build.onResolve({
        filter: /^https?:\/\//
      }, ({
        path
      }) => {
        /*
        The vast majority of packages are side-effect free,
        and URL imports don't have a mechanism for specifying that they are side-effect free.
        
        Mark all url imports as side-effect free so that they can be treeshaken by esbuild.
        */
        return {
          path,
          external: true,
          sideEffects: false
        };
      });
    }
  };
};

exports.urlImportsPlugin = urlImportsPlugin;
