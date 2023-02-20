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

var error = require('../../utils/error.js');
var dependencies = require('./dependencies.js');
var postinstall = require('./postinstall.js');
var remix = require('./remix.js');

const autoDetectPostinstallRuntime = packageJson => {
  var _packageJson$scripts;
  let postinstall$1 = (_packageJson$scripts = packageJson.scripts) === null || _packageJson$scripts === void 0 ? void 0 : _packageJson$scripts.postinstall;
  if (postinstall$1 === undefined) return undefined;

  // match `remix setup <runtime>` in `postinstall` script
  return postinstall.parseRuntime(postinstall$1);
};
const adapterToRuntime = {
  architect: "node",
  "cloudflare-pages": "cloudflare",
  "cloudflare-workers": "cloudflare",
  express: "node",
  netlify: "node",
  vercel: "node"
};
const detectRuntime = (packageJson, adapter) => {
  // match `remix setup <runtime>` in `postinstall` script
  let postinstallRuntime = autoDetectPostinstallRuntime(packageJson);
  if (postinstallRuntime) return postinstallRuntime;

  // infer runtime from adapter
  if (adapter) return adapterToRuntime[adapter];

  // @remix-run/serve uses node
  let deps = dependencies.parse(packageJson.dependencies);
  let remixDeps = deps.filter(({
    name
  }) => remix.isRemixPackage(name));
  if (remixDeps.map(({
    name
  }) => name).includes("@remix-run/serve")) {
    return "node";
  }
  throw new error.CodemodError("Could not detect your Remix server runtime");
};
const detectAdapter = packageJson => {
  // find adapter in package.json dependencies
  let deps = dependencies.parse(packageJson.dependencies);
  let remixDeps = deps.filter(({
    name
  }) => remix.isRemixPackage(name));
  let adapters = remixDeps.map(({
    name
  }) => name.replace(/^@remix-run\//, "")).filter(remix.isAdapter);
  if (adapters.length === 0) return undefined;
  if (adapters.length > 1) {
    throw new error.CodemodError("Found multiple Remix server adapters your in dependencies", adapters.map(adapter => `- @remix-run/${adapter}`).join("\n"));
  }
  return adapters[0];
};

exports.detectAdapter = detectAdapter;
exports.detectRuntime = detectRuntime;
