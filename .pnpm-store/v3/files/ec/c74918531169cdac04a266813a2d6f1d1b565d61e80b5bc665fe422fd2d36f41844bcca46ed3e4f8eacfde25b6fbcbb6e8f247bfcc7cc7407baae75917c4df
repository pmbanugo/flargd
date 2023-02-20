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

var fse = require('fs-extra');
var path = require('path');

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
var path__namespace = /*#__PURE__*/_interopNamespace(path);

// Import environment variables from: .env, failing gracefully if it doesn't exist
async function loadEnv(rootDirectory) {
  let envPath = path__namespace.join(rootDirectory, ".env");
  try {
    await fse__namespace.readFile(envPath);
  } catch {
    return;
  }
  console.log(`Loading environment variables from .env`);
  let result = require("dotenv").config({
    path: envPath
  });
  if (result.error) {
    throw result.error;
  }
}

exports.loadEnv = loadEnv;
