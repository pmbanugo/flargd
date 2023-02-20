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

var jsesc = require('jsesc');
var virtualModules = require('../virtualModules.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var jsesc__default = /*#__PURE__*/_interopDefaultLegacy(jsesc);

/**
 * Creates a virtual module called `@remix-run/dev/assets-manifest` that exports
 * the assets manifest. This is used in the server entry module to access the
 * assets manifest in the server build.
 */
function serverAssetsManifestPlugin(assetsManifestPromise) {
  let filter = virtualModules.assetsManifestVirtualModule.filter;
  return {
    name: "server-assets-manifest",
    setup(build) {
      build.onResolve({
        filter
      }, ({
        path
      }) => {
        return {
          path,
          namespace: "server-assets-manifest"
        };
      });
      build.onLoad({
        filter
      }, async () => {
        let assetsManifest = await assetsManifestPromise;
        return {
          contents: `export default ${jsesc__default["default"](assetsManifest, {
            es6: true
          })};`,
          loader: "js"
        };
      });
    }
  };
}

exports.serverAssetsManifestPlugin = serverAssetsManifestPlugin;
