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

var exitHook = require('exit-hook');
var fse = require('fs-extra');
var getPort = require('get-port');
var os = require('os');
var path = require('node:path');
var prettyMs = require('pretty-ms');
var fetch = require('node-fetch');
require('esbuild');
require('path');
require('module');
require('@esbuild-plugins/node-modules-polyfill');
require('postcss');
require('postcss-discard-duplicates');
require('cacache');
require('fs');
require('remark-mdx-frontmatter');
require('tsconfig-paths');
require('crypto');
require('postcss-modules');
require('./compiler/plugins/cssSideEffectImportsPlugin.js');
require('@vanilla-extract/integration');
require('jsesc');
var watch = require('./compiler/watch.js');
var env = require('./env.js');
var liveReload = require('./liveReload.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var exitHook__default = /*#__PURE__*/_interopDefaultLegacy(exitHook);
var fse__default = /*#__PURE__*/_interopDefaultLegacy(fse);
var getPort__default = /*#__PURE__*/_interopDefaultLegacy(getPort);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var prettyMs__default = /*#__PURE__*/_interopDefaultLegacy(prettyMs);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);

let info = message => console.info(`💿 ${message}`);
let relativePath = file => path__default["default"].relative(process.cwd(), file);
let sleep = ms => new Promise(r => setTimeout(r, ms));
let clean = config => {
  fse__default["default"].emptyDirSync(config.relativeAssetsBuildDirectory);
};
let getHost = () => {
  var _Object$values$flat$f;
  return process.env.HOST ?? ((_Object$values$flat$f = Object.values(os__default["default"].networkInterfaces()).flat().find(ip => String(ip === null || ip === void 0 ? void 0 : ip.family).includes("4") && !(ip !== null && ip !== void 0 && ip.internal))) === null || _Object$values$flat$f === void 0 ? void 0 : _Object$values$flat$f.address);
};
let findPort = async portPreference => getPort__default["default"]({
  port:
  // prettier-ignore
  portPreference ? Number(portPreference) : process.env.PORT ? Number(process.env.PORT) : getPort.makeRange(3001, 3100)
});
let fetchAssetsManifest = async (origin, remixRequestHandlerPath) => {
  try {
    let url = origin + remixRequestHandlerPath + "/__REMIX_ASSETS_MANIFEST";
    let res = await fetch__default["default"](url);
    let assetsManifest = await res.json();
    return assetsManifest;
  } catch (error) {
    return undefined;
  }
};
let resolveDev = (dev, flags) => {
  if (dev === false) throw Error("The new dev server requires 'unstable_dev' to be set");
  let port = flags.port ?? (dev === true ? undefined : dev.port);
  let appServerPort = flags.appServerPort ?? (dev === true || dev.appServerPort == undefined) ? 3000 : dev.appServerPort;
  let remixRequestHandlerPath = dev === true || dev.remixRequestHandlerPath === undefined ? "" : dev.remixRequestHandlerPath;
  let rebuildPollIntervalMs = dev === true || dev.rebuildPollIntervalMs === undefined ? 50 : dev.rebuildPollIntervalMs;
  return {
    port,
    appServerPort,
    remixRequestHandlerPath,
    rebuildPollIntervalMs
  };
};
let serve = async (config, flags = {}) => {
  clean(config);
  await env.loadEnv(config.rootDirectory);
  let dev = resolveDev(config.future.unstable_dev, flags);
  let host = getHost();
  let appServerOrigin = `http://${host ?? "localhost"}:${dev.appServerPort}`;
  let waitForAppServer = async buildHash => {
    while (true) {
      // TODO AbortController signal to cancel responses?
      let assetsManifest = await fetchAssetsManifest(appServerOrigin, dev.remixRequestHandlerPath);
      if ((assetsManifest === null || assetsManifest === void 0 ? void 0 : assetsManifest.version) === buildHash) return;
      await sleep(dev.rebuildPollIntervalMs);
    }
  };

  // watch and live reload on rebuilds
  let port = await findPort(dev.port);
  let socket = liveReload.serve({
    port
  });
  let dispose = await watch.watch(config, {
    mode: "development",
    liveReloadPort: port,
    onInitialBuild: durationMs => info(`Built in ${prettyMs__default["default"](durationMs)}`),
    onRebuildStart: () => {
      clean(config);
      socket.log("Rebuilding...");
    },
    onRebuildFinish: async (durationMs, assetsManifest) => {
      if (!assetsManifest) return;
      socket.log(`Rebuilt in ${prettyMs__default["default"](durationMs)}`);
      info(`Waiting for ${appServerOrigin}...`);
      let start = Date.now();
      await waitForAppServer(assetsManifest.version);
      info(`${appServerOrigin} ready in ${prettyMs__default["default"](Date.now() - start)}`);
      socket.reload();
    },
    onFileCreated: file => socket.log(`File created: ${relativePath(file)}`),
    onFileChanged: file => socket.log(`File changed: ${relativePath(file)}`),
    onFileDeleted: file => socket.log(`File deleted: ${relativePath(file)}`)
  });

  // clean up build directories when dev server exits
  exitHook__default["default"](() => clean(config));
  return async () => {
    await dispose();
    socket.close();
  };
};

exports.serve = serve;
