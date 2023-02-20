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

var path = require('node:path');
var glob = require('fast-glob');
var fse = require('fs-extra');
var babel = require('@babel/core');
var babelPluginSyntaxJSX = require('@babel/plugin-syntax-jsx');
var babelPresetTypeScript = require('@babel/preset-typescript');
var prettier = require('prettier');
var config = require('../config.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);
var fse__default = /*#__PURE__*/_interopDefaultLegacy(fse);
var babel__namespace = /*#__PURE__*/_interopNamespace(babel);
var babelPluginSyntaxJSX__default = /*#__PURE__*/_interopDefaultLegacy(babelPluginSyntaxJSX);
var babelPresetTypeScript__default = /*#__PURE__*/_interopDefaultLegacy(babelPresetTypeScript);
var prettier__default = /*#__PURE__*/_interopDefaultLegacy(prettier);

let convert = async projectDir => {
  let config$1 = await config.readConfig(projectDir);
  let remixEnvD = path__default["default"].join(config$1.rootDirectory, "remix.env.d.ts");
  if (fse__default["default"].pathExistsSync(remixEnvD)) {
    fse__default["default"].rmSync(remixEnvD);
  }
  let entries = await glob__default["default"]("**/*.+(ts|tsx)", {
    absolute: true,
    cwd: config$1.appDirectory
  });
  for (let entry of entries) {
    if (entry.endsWith(".d.ts")) {
      fse__default["default"].rmSync(entry);
      continue;
    }
    let tsx = await fse__default["default"].readFile(entry, "utf8");
    let mjs = transpile(tsx, {
      filename: path__default["default"].basename(entry),
      cwd: projectDir
    });
    fse__default["default"].rmSync(entry);
    await fse__default["default"].writeFile(entry.replace(/\.ts$/, ".js").replace(/\.tsx$/, ".jsx"), mjs, "utf8");
  }
};
let transpile = (tsx, options = {}) => {
  let mjs = babel__namespace.transformSync(tsx, {
    compact: false,
    cwd: options.cwd,
    filename: options.filename,
    plugins: [babelPluginSyntaxJSX__default["default"]],
    presets: [[babelPresetTypeScript__default["default"], {
      jsx: "preserve"
    }]],
    retainLines: true
  });
  if (!mjs || !mjs.code) throw new Error("Could not parse TypeScript");

  /**
   * Babel's `compact` and `retainLines` options are both bad at formatting code.
   * Use Prettier for nicer formatting.
   */
  return prettier__default["default"].format(mjs.code, {
    parser: "babel"
  });
};

exports.convert = convert;
