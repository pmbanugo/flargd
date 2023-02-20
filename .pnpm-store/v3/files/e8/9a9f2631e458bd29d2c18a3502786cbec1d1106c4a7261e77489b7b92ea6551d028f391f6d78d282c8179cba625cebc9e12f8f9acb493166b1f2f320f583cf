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
var fse = require('fs-extra');
var postcss = require('postcss');
var postcssModules = require('postcss-modules');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fse__default = /*#__PURE__*/_interopDefaultLegacy(fse);
var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);
var postcssModules__default = /*#__PURE__*/_interopDefaultLegacy(postcssModules);

const pluginName = "css-modules-plugin";
const namespace = `${pluginName}-ns`;
const cssModulesFilter = /\.module\.css$/;
const compiledCssQuery = "?css-modules-plugin-compiled-css";
const compiledCssFilter = /\?css-modules-plugin-compiled-css$/;
const cssModulesPlugin = options => {
  return {
    name: pluginName,
    setup: async build => {
      build.onResolve({
        filter: cssModulesFilter,
        namespace: "file"
      }, async args => {
        let resolvedPath = (await build.resolve(args.path, {
          resolveDir: args.resolveDir,
          kind: args.kind
        })).path;
        return {
          path: resolvedPath
        };
      });
      build.onLoad({
        filter: cssModulesFilter
      }, async args => {
        let {
          path: absolutePath
        } = args;
        let resolveDir = path__default["default"].dirname(absolutePath);
        let fileContents = await fse__default["default"].readFile(absolutePath, "utf8");
        let exports = {};
        let {
          css: compiledCss
        } = await postcss__default["default"]([postcssModules__default["default"]({
          generateScopedName: options.mode === "production" ? "[hash:base64:5]" : "[name]__[local]__[hash:base64:5]",
          getJSON: function (_, json) {
            exports = json;
          },
          async resolve(id, importer) {
            return (await build.resolve(id, {
              resolveDir: path__default["default"].dirname(importer),
              kind: "require-resolve"
            })).path;
          }
        })]).process(fileContents, {
          from: absolutePath,
          to: absolutePath
        });

        // Each .module.css file ultimately resolves as a JS file that imports
        // a virtual CSS file containing the compiled CSS, and exports the
        // object that maps local names to generated class names. The compiled
        // CSS file contents are passed to the virtual CSS file via pluginData.
        let contents = [options.outputCss ? `import "./${path__default["default"].basename(absolutePath)}${compiledCssQuery}";` : null, `export default ${JSON.stringify(exports)};`].filter(Boolean).join("\n");
        let pluginData = {
          resolveDir,
          compiledCss
        };
        return {
          contents,
          loader: "js",
          pluginData
        };
      });
      build.onResolve({
        filter: compiledCssFilter
      }, async args => {
        let pluginData = args.pluginData;
        let absolutePath = path__default["default"].resolve(args.resolveDir, args.path);
        return {
          namespace,
          path: path__default["default"].relative(options.rootDirectory, absolutePath),
          pluginData
        };
      });
      build.onLoad({
        filter: compiledCssFilter,
        namespace
      }, async args => {
        let pluginData = args.pluginData;
        let {
          resolveDir,
          compiledCss
        } = pluginData;
        return {
          resolveDir,
          contents: compiledCss,
          loader: "css"
        };
      });
    }
  };
};

exports.cssModulesPlugin = cssModulesPlugin;
