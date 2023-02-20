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

var warnings = require('./warnings.js');
var onCompileFailure = require('./onCompileFailure.js');
var remixCompiler = require('./remixCompiler.js');

async function build(config, {
  mode = "production",
  target = "node14",
  sourcemap = false,
  onWarning = warnings.warnOnce,
  onCompileFailure: onCompileFailure$1 = onCompileFailure.logCompileFailure
} = {}) {
  let compiler = remixCompiler.createRemixCompiler(config, {
    mode,
    target,
    sourcemap,
    onWarning,
    onCompileFailure: onCompileFailure$1
  });
  await remixCompiler.compile(compiler, {
    onCompileFailure: onCompileFailure$1
  });
}

exports.build = build;
