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

var chokidar = require('chokidar');
var debounce = require('lodash.debounce');
var path = require('path');
var config = require('../config.js');
var onCompileFailure = require('./onCompileFailure.js');
var remixCompiler = require('./remixCompiler.js');
var warnings = require('./warnings.js');

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

var chokidar__default = /*#__PURE__*/_interopDefaultLegacy(chokidar);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var path__namespace = /*#__PURE__*/_interopNamespace(path);

function isEntryPoint(config, file) {
  let appFile = path__namespace.relative(config.appDirectory, file);
  let entryPoints = [config.entryClientFile, config.entryServerFile, ...Object.values(config.routes).map(route => route.file)];
  return entryPoints.includes(appFile);
}
async function watch(config$1, {
  mode = "development",
  liveReloadPort,
  target = "node14",
  sourcemap = true,
  reloadConfig = config.readConfig,
  onWarning = warnings.warnOnce,
  onCompileFailure: onCompileFailure$1 = onCompileFailure.logCompileFailure,
  onRebuildStart,
  onRebuildFinish,
  onFileCreated,
  onFileChanged,
  onFileDeleted,
  onInitialBuild
} = {}) {
  var _config$watchPaths;
  let options = {
    mode,
    liveReloadPort,
    target,
    sourcemap,
    onCompileFailure: onCompileFailure$1,
    onWarning
  };
  let start = Date.now();
  let compiler = remixCompiler.createRemixCompiler(config$1, options);

  // initial build
  await remixCompiler.compile(compiler);
  onInitialBuild === null || onInitialBuild === void 0 ? void 0 : onInitialBuild(Date.now() - start);
  let restart = debounce__default["default"](async () => {
    onRebuildStart === null || onRebuildStart === void 0 ? void 0 : onRebuildStart();
    let start = Date.now();
    remixCompiler.dispose(compiler);
    try {
      config$1 = await reloadConfig(config$1.rootDirectory);
    } catch (error) {
      onCompileFailure$1(error);
      return;
    }
    compiler = remixCompiler.createRemixCompiler(config$1, options);
    let assetsManifest = await remixCompiler.compile(compiler);
    onRebuildFinish === null || onRebuildFinish === void 0 ? void 0 : onRebuildFinish(Date.now() - start, assetsManifest);
  }, 500);
  let rebuild = debounce__default["default"](async () => {
    onRebuildStart === null || onRebuildStart === void 0 ? void 0 : onRebuildStart();
    let start = Date.now();
    let assetsManifest = await remixCompiler.compile(compiler, {
      onCompileFailure: onCompileFailure$1
    });
    onRebuildFinish === null || onRebuildFinish === void 0 ? void 0 : onRebuildFinish(Date.now() - start, assetsManifest);
  }, 100);
  let toWatch = [config$1.appDirectory];
  if (config$1.serverEntryPoint) {
    toWatch.push(config$1.serverEntryPoint);
  }
  (_config$watchPaths = config$1.watchPaths) === null || _config$watchPaths === void 0 ? void 0 : _config$watchPaths.forEach(watchPath => {
    toWatch.push(watchPath);
  });
  let watcher = chokidar__default["default"].watch(toWatch, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 100,
      pollInterval: 100
    }
  }).on("error", error => console.error(error)).on("change", async file => {
    onFileChanged === null || onFileChanged === void 0 ? void 0 : onFileChanged(file);
    await rebuild();
  }).on("add", async file => {
    onFileCreated === null || onFileCreated === void 0 ? void 0 : onFileCreated(file);
    try {
      config$1 = await reloadConfig(config$1.rootDirectory);
    } catch (error) {
      onCompileFailure$1(error);
      return;
    }
    await (isEntryPoint(config$1, file) ? restart : rebuild)();
  }).on("unlink", async file => {
    onFileDeleted === null || onFileDeleted === void 0 ? void 0 : onFileDeleted(file);
    await (isEntryPoint(config$1, file) ? restart : rebuild)();
  });
  return async () => {
    await watcher.close().catch(() => undefined);
    remixCompiler.dispose(compiler);
  };
}

exports.watch = watch;
