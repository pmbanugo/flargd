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

var path = require('path');
var integration = require('@vanilla-extract/integration');
var fse = require('fs-extra');
var esbuild = require('esbuild');
var loaders = require('../loaders.js');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var fse__namespace = /*#__PURE__*/_interopNamespace(fse);
var esbuild__namespace = /*#__PURE__*/_interopNamespace(esbuild);

const pluginName = "vanilla-extract-plugin";
const namespace = `${pluginName}-ns`;
function vanillaExtractPlugin({
  config,
  mode,
  outputCss
}) {
  return {
    name: pluginName,
    setup(build) {
      let {
        rootDirectory
      } = config;
      build.onResolve({
        filter: integration.virtualCssFileFilter
      }, args => {
        return {
          path: args.path,
          namespace
        };
      });
      build.onLoad({
        filter: integration.virtualCssFileFilter,
        namespace
      }, async ({
        path: path$1
      }) => {
        let {
          source,
          fileName
        } = await integration.getSourceFromVirtualCssFile(path$1);
        let resolveDir = path.dirname(path.join(rootDirectory, fileName));
        return {
          contents: source,
          loader: "css",
          resolveDir
        };
      });
      build.onLoad({
        filter: integration.cssFileFilter
      }, async ({
        path: filePath
      }) => {
        var _outputFiles$find;
        let identOption = mode === "production" ? "short" : "debug";
        let {
          outputFiles
        } = await esbuild__namespace.build({
          entryPoints: [filePath],
          outdir: config.assetsBuildDirectory,
          assetNames: build.initialOptions.assetNames,
          bundle: true,
          external: ["@vanilla-extract"],
          platform: "node",
          write: false,
          plugins: [vanillaExtractTransformPlugin({
            rootDirectory,
            identOption
          })],
          loader: loaders.loaders,
          absWorkingDir: rootDirectory,
          publicPath: config.publicPath
        });
        let source = (_outputFiles$find = outputFiles.find(file => file.path.endsWith(".js"))) === null || _outputFiles$find === void 0 ? void 0 : _outputFiles$find.text;
        if (!source) {
          return null;
        }
        let [contents] = await Promise.all([integration.processVanillaFile({
          source,
          filePath,
          outputCss,
          identOption
        }), outputCss && writeAssets(outputFiles)]);
        return {
          contents,
          resolveDir: path.dirname(filePath),
          loader: "js"
        };
      });
    }
  };
}
async function writeAssets(outputFiles) {
  await Promise.all(outputFiles.filter(file => !file.path.endsWith(".js")).map(async file => {
    await fse__namespace.ensureDir(path.dirname(file.path));
    await fse__namespace.writeFile(file.path, file.contents);
  }));
}
const loaderForExtension = {
  ".js": "js",
  ".jsx": "jsx",
  ".ts": "ts",
  ".tsx": "tsx"
};

/**
 * This plugin is used within the child compilation. It applies the Vanilla
 * Extract file transform to all .css.ts/js files. This is used to add "file
 * scope" annotations, which is done via function calls at the beginning and end
 * of each file so that we can tell which CSS file the styles belong to when
 * evaluating the JS. It's also done to automatically apply debug IDs.
 */
function vanillaExtractTransformPlugin({
  rootDirectory,
  identOption
}) {
  return {
    name: "vanilla-extract-transform-plugin",
    setup(build) {
      build.onLoad({
        filter: integration.cssFileFilter
      }, async ({
        path: path$1
      }) => {
        let source = await fse__namespace.readFile(path$1, "utf-8");
        let contents = await integration.transform({
          source,
          filePath: path$1,
          rootPath: rootDirectory,
          packageName: "remix-app",
          // This option is designed to support scoping hashes for libraries, we can hard code an arbitrary value for simplicity
          identOption
        });
        return {
          contents,
          loader: loaderForExtension[path.extname(path$1)],
          resolveDir: path.dirname(path$1)
        };
      });
    }
  };
}

exports.vanillaExtractPlugin = vanillaExtractPlugin;
