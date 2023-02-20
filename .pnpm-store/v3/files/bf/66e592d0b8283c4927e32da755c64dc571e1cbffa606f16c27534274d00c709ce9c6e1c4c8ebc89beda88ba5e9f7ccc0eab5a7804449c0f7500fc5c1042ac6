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

var esbuild = require('esbuild');

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

var esbuild__namespace = /*#__PURE__*/_interopNamespace(esbuild);

const logCompileFailure = failure => {
  if ("warnings" in failure || "errors" in failure) {
    if (failure.warnings) {
      let messages = esbuild__namespace.formatMessagesSync(failure.warnings, {
        kind: "warning",
        color: true
      });
      console.warn(...messages);
    }
    if (failure.errors) {
      let messages = esbuild__namespace.formatMessagesSync(failure.errors, {
        kind: "error",
        color: true
      });
      console.error(...messages);
    }
  }
  console.error((failure === null || failure === void 0 ? void 0 : failure.message) || "An unknown build error occurred");
};

exports.logCompileFailure = logCompileFailure;
