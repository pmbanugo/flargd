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

var channel = require('../channel.js');
var compileBrowser = require('./compileBrowser.js');
var compilerServer = require('./compilerServer.js');

const createRemixCompiler = (remixConfig, options) => {
  return {
    browser: compileBrowser.createBrowserCompiler(remixConfig, options),
    server: compilerServer.createServerCompiler(remixConfig, options)
  };
};
const compile = async (compiler, options = {}) => {
  try {
    let assetsManifestChannel = channel.createChannel();
    let browserPromise = compiler.browser.compile(assetsManifestChannel);
    let serverPromise = compiler.server.compile(assetsManifestChannel);
    await Promise.all([browserPromise, serverPromise]);
    return assetsManifestChannel.read();
  } catch (error) {
    var _options$onCompileFai;
    (_options$onCompileFai = options.onCompileFailure) === null || _options$onCompileFai === void 0 ? void 0 : _options$onCompileFai.call(options, error);
  }
};
const dispose = compiler => {
  compiler.browser.dispose();
  compiler.server.dispose();
};

exports.compile = compile;
exports.createRemixCompiler = createRemixCompiler;
exports.dispose = dispose;
