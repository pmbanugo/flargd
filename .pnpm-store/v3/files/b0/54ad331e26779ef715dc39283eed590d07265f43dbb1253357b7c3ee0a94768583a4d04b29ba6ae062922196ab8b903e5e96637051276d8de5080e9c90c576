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

var remix = require('./remix.js');

const remixSetup = /\s*remix\s+setup(?:$|\s+)/;
const remixSetupRuntime = /\s*remix\s+setup\s+(\w+)\s*/;
const onlyRemixSetup = new RegExp(`^${remixSetup.source}$`);
const onlyRemixSetupRuntime = new RegExp(`^${remixSetupRuntime.source}$`);
const parseRuntime = postinstall => {
  // match `remix setup <runtime>` in `postinstall` script
  let runtimeMatch = postinstall.match(remixSetupRuntime);
  if (runtimeMatch === null) return "node";
  let runtime = runtimeMatch[1];
  if (remix.isRuntime(runtime)) return runtime;
  console.warn(`️⚠️  You have \`${runtime}\` in your \`postinstall\` script, but \`${runtime}\` is not a valid Remix server runtime.`);
  return undefined;
};
const hasRemixSetup = postinstall => {
  return remixSetup.test(postinstall);
};
const isOnlyRemixSetup = postinstall => onlyRemixSetup.test(postinstall) || onlyRemixSetupRuntime.test(postinstall);

exports.hasRemixSetup = hasRemixSetup;
exports.isOnlyRemixSetup = isOnlyRemixSetup;
exports.parseRuntime = parseRuntime;
