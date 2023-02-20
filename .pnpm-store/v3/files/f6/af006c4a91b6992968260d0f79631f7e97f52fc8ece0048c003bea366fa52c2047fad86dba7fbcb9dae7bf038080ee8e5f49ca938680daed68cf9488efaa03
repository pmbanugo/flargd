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

var getPort = require('get-port');
var os = require('os');
var env = require('../env.js');
var liveReload = require('./liveReload.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var getPort__default = /*#__PURE__*/_interopDefaultLegacy(getPort);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);

function purgeAppRequireCache(buildPath) {
  for (let key in require.cache) {
    if (key.startsWith(buildPath)) {
      delete require.cache[key];
    }
  }
}
function tryImport(packageName) {
  try {
    return require(packageName);
  } catch {
    throw new Error(`Could not locate ${packageName}. Verify that you have it installed to use the dev command.`);
  }
}
async function serve(config, mode, portPreference) {
  if (config.serverEntryPoint) {
    throw new Error("remix dev is not supported for custom servers.");
  }
  let {
    createApp
  } = tryImport("@remix-run/serve"
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  );
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  let express = tryImport("express");
  await env.loadEnv(config.rootDirectory);
  let port = await getPort__default["default"]({
    port: portPreference ? Number(portPreference) : process.env.PORT ? Number(process.env.PORT) : getPort.makeRange(3000, 3100)
  });
  let app = express();
  app.disable("x-powered-by");
  app.use((_, __, next) => {
    purgeAppRequireCache(config.serverBuildPath);
    next();
  });
  app.use(createApp(config.serverBuildPath, mode, config.publicPath, config.assetsBuildDirectory));
  let dispose = await liveReload.liveReload(config);
  let server;
  let onListen = () => {
    var _Object$values$flat$f;
    let address = process.env.HOST || ((_Object$values$flat$f = Object.values(os__default["default"].networkInterfaces()).flat().find(ip => String(ip === null || ip === void 0 ? void 0 : ip.family).includes("4") && !(ip !== null && ip !== void 0 && ip.internal))) === null || _Object$values$flat$f === void 0 ? void 0 : _Object$values$flat$f.address);
    if (!address) {
      console.log(`Remix App Server started at http://localhost:${port}`);
    } else {
      console.log(`Remix App Server started at http://localhost:${port} (http://${address}:${port})`);
    }
  };
  try {
    server = process.env.HOST ? app.listen(port, process.env.HOST, onListen) : app.listen(port, onListen);
  } catch {
    var _server;
    dispose();
    (_server = server) === null || _server === void 0 ? void 0 : _server.close();
  }
}

exports.serve = serve;
