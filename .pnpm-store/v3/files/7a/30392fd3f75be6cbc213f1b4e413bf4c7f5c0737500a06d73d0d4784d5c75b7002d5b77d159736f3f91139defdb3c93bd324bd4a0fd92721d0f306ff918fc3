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

var babel = require('@babel/core');
var assert = require('assert');
var babelPluginSyntaxJSX = require('@babel/plugin-syntax-jsx');
var babelPluginSyntaxTypescript = require('@babel/plugin-syntax-typescript');
var babelPluginRecast = require('./utils/babelPluginRecast.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var babelPluginSyntaxJSX__default = /*#__PURE__*/_interopDefaultLegacy(babelPluginSyntaxJSX);
var babelPluginSyntaxTypescript__default = /*#__PURE__*/_interopDefaultLegacy(babelPluginSyntaxTypescript);

var createTransform = (plugin => (code, filepath) => {
  let result = babel.transformSync(code, {
    babelrc: false,
    configFile: false,
    filename: filepath,
    plugins: [babelPluginSyntaxTypescript__default["default"], babelPluginRecast["default"], plugin],
    overrides: [{
      test: /\.tsx$/,
      plugins: [babelPluginSyntaxJSX__default["default"], [babelPluginSyntaxTypescript__default["default"], {
        isTSX: true
      }]]
    }]
  });
  assert.strict(result, "transformSync must return a result");
  return result.code;
});

exports["default"] = createTransform;
