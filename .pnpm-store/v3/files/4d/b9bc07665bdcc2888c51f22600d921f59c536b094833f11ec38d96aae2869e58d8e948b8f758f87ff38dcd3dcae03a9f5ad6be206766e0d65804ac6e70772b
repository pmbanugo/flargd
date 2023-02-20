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

var recast = require('recast');

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

var recast__namespace = /*#__PURE__*/_interopNamespace(recast);

function parse(code, options, parse) {
  return recast__namespace.parse(code, {
    parser: {
      parse(code) {
        return parse(code, {
          ...options,
          tokens: true
        });
      }
    }
  });
}
function generate(ast) {
  return recast__namespace.print(ast);
}

/**
 * Adapted from [@codemod/core](https://github.com/codemod-js/codemod/blob/5a9fc6968409613eefd87e646408c08b6dad0c40/packages/core/src/RecastPlugin.ts)
 */
function babelRecastPlugin () {
  return {
    parserOverride: parse,
    generatorOverride: generate
  };
}

exports["default"] = babelRecastPlugin;
