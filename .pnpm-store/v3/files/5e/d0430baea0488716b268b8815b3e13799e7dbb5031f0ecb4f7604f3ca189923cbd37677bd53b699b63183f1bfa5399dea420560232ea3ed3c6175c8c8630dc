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

// Runtimes
const runtimes = ["cloudflare", "node"];
const isRuntime = maybe => runtimes.includes(maybe);

// Adapters
const adapters = ["architect", "cloudflare-pages", "cloudflare-workers", "express", "netlify", "vercel"];
const isAdapter = maybe => adapters.includes(maybe);
const isRemixPackage = pkgName => {
  return pkgName === "remix" || pkgName.startsWith("@remix-run/");
};

exports.isAdapter = isAdapter;
exports.isRemixPackage = isRemixPackage;
exports.isRuntime = isRuntime;
exports.runtimes = runtimes;
