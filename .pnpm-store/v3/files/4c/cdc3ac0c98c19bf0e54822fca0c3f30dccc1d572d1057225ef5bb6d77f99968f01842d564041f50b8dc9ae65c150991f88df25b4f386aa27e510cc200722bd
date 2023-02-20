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

var path = require('path');
var url = require('url');
var fse = require('fs-extra');
var getPort = require('get-port');
var routes = require('./config/routes.js');
var routesConvention = require('./config/routesConvention.js');
var serverModes = require('./config/serverModes.js');
var virtualModules = require('./compiler/virtualModules.js');
var writeConfigDefaults = require('./compiler/utils/tsconfig/write-config-defaults.js');
var flatRoutes = require('./config/flat-routes.js');

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

var path__namespace = /*#__PURE__*/_interopNamespace(path);
var fse__namespace = /*#__PURE__*/_interopNamespace(fse);
var getPort__default = /*#__PURE__*/_interopDefaultLegacy(getPort);

/**
 * Returns a fully resolved config object from the remix.config.js in the given
 * root directory.
 */
async function readConfig(remixRoot, serverMode = serverModes.ServerMode.Production) {
  var _appConfig$future, _appConfig$future2, _appConfig$future3, _appConfig$future4, _appConfig$future5, _appConfig$future6, _appConfig$future7, _appConfig$future8;
  if (!serverModes.isValidServerMode(serverMode)) {
    throw new Error(`Invalid server mode "${serverMode}"`);
  }
  if (!remixRoot) {
    remixRoot = process.env.REMIX_ROOT || process.cwd();
  }
  let rootDirectory = path__namespace.resolve(remixRoot);
  let configFile = findConfig(rootDirectory, "remix.config");
  let appConfig = {};
  if (configFile) {
    let appConfigModule;
    try {
      var _appConfigModule;
      // shout out to next
      // https://github.com/vercel/next.js/blob/b15a976e11bf1dc867c241a4c1734757427d609c/packages/next/server/config.ts#L748-L765
      if (process.env.NODE_ENV === "test") {
        // dynamic import does not currently work inside of vm which
        // jest relies on so we fall back to require for this case
        // https://github.com/nodejs/node/issues/35889
        appConfigModule = require(configFile);
      } else {
        appConfigModule = await import(url.pathToFileURL(configFile).href);
      }
      appConfig = ((_appConfigModule = appConfigModule) === null || _appConfigModule === void 0 ? void 0 : _appConfigModule.default) || appConfigModule;
    } catch (error) {
      throw new Error(`Error loading Remix config at ${configFile}\n${String(error)}`);
    }
  }
  let customServerEntryPoint = appConfig.server;
  let serverBuildTarget = appConfig.serverBuildTarget;
  let serverModuleFormat = appConfig.serverModuleFormat || "cjs";
  let serverPlatform = appConfig.serverPlatform || "node";
  switch (appConfig.serverBuildTarget) {
    case "cloudflare-pages":
    case "cloudflare-workers":
    case "deno":
      serverModuleFormat = "esm";
      serverPlatform = "neutral";
      break;
  }
  let mdx = appConfig.mdx;
  let appDirectory = path__namespace.resolve(rootDirectory, appConfig.appDirectory || "app");
  let cacheDirectory = path__namespace.resolve(rootDirectory, appConfig.cacheDirectory || ".cache");
  let entryClientFile = findEntry(appDirectory, "entry.client");
  if (!entryClientFile) {
    throw new Error(`Missing "entry.client" file in ${appDirectory}`);
  }
  let entryServerFile = findEntry(appDirectory, "entry.server");
  if (!entryServerFile) {
    throw new Error(`Missing "entry.server" file in ${appDirectory}`);
  }
  let serverBuildPath = "build/index.js";
  switch (serverBuildTarget) {
    case "arc":
      serverBuildPath = "server/index.js";
      break;
    case "cloudflare-pages":
      serverBuildPath = "functions/[[path]].js";
      break;
    case "netlify":
      serverBuildPath = ".netlify/functions-internal/server.js";
      break;
    case "vercel":
      serverBuildPath = "api/index.js";
      break;
  }
  serverBuildPath = path__namespace.resolve(rootDirectory, serverBuildPath);

  // retain deprecated behavior for now
  if (appConfig.serverBuildDirectory) {
    serverBuildPath = path__namespace.resolve(rootDirectory, path__namespace.join(appConfig.serverBuildDirectory, "index.js"));
  }
  if (appConfig.serverBuildPath) {
    serverBuildPath = path__namespace.resolve(rootDirectory, appConfig.serverBuildPath);
  }
  let assetsBuildDirectory = appConfig.assetsBuildDirectory || appConfig.browserBuildDirectory || path__namespace.join("public", "build");
  let absoluteAssetsBuildDirectory = path__namespace.resolve(rootDirectory, assetsBuildDirectory);
  let devServerPort = Number(process.env.REMIX_DEV_SERVER_WS_PORT) || (await getPort__default["default"]({
    port: Number(appConfig.devServerPort) || 8002
  }));
  // set env variable so un-bundled servers can use it
  process.env.REMIX_DEV_SERVER_WS_PORT = `${devServerPort}`;
  let devServerBroadcastDelay = appConfig.devServerBroadcastDelay || 0;
  let defaultPublicPath = "/build/";
  switch (serverBuildTarget) {
    case "arc":
      defaultPublicPath = "/_static/build/";
      break;
  }
  let publicPath = addTrailingSlash(appConfig.publicPath || defaultPublicPath);
  let rootRouteFile = findEntry(appDirectory, "root");
  if (!rootRouteFile) {
    throw new Error(`Missing "root" route file in ${appDirectory}`);
  }
  let routes$1 = {
    root: {
      path: "",
      id: "root",
      file: rootRouteFile
    }
  };
  let routesConvention$1 = (_appConfig$future = appConfig.future) !== null && _appConfig$future !== void 0 && _appConfig$future.v2_routeConvention ? flatRoutes.flatRoutes : routesConvention.defineConventionalRoutes;
  if (fse__namespace.existsSync(path__namespace.resolve(appDirectory, "routes"))) {
    let conventionalRoutes = routesConvention$1(appDirectory, appConfig.ignoredRouteFiles);
    for (let route of Object.values(conventionalRoutes)) {
      routes$1[route.id] = {
        ...route,
        parentId: route.parentId || "root"
      };
    }
  }
  if (appConfig.routes) {
    let manualRoutes = await appConfig.routes(routes.defineRoutes);
    for (let route of Object.values(manualRoutes)) {
      routes$1[route.id] = {
        ...route,
        parentId: route.parentId || "root"
      };
    }
  }
  let watchPaths = [];
  if (typeof appConfig.watchPaths === "function") {
    let directories = await appConfig.watchPaths();
    watchPaths = watchPaths.concat(Array.isArray(directories) ? directories : [directories]);
  } else if (appConfig.watchPaths) {
    watchPaths = watchPaths.concat(Array.isArray(appConfig.watchPaths) ? appConfig.watchPaths : [appConfig.watchPaths]);
  }
  let serverBuildTargetEntryModule = `export * from ${JSON.stringify(virtualModules.serverBuildVirtualModule.id)};`;
  let serverDependenciesToBundle = appConfig.serverDependenciesToBundle || [];

  // When tsconfigPath is undefined, the default "tsconfig.json" is not
  // found in the root directory.
  let tsconfigPath;
  let rootTsconfig = path__namespace.resolve(rootDirectory, "tsconfig.json");
  let rootJsConfig = path__namespace.resolve(rootDirectory, "jsconfig.json");
  if (fse__namespace.existsSync(rootTsconfig)) {
    tsconfigPath = rootTsconfig;
  } else if (fse__namespace.existsSync(rootJsConfig)) {
    tsconfigPath = rootJsConfig;
  }
  if (tsconfigPath) {
    writeConfigDefaults.writeConfigDefaults(tsconfigPath);
  }
  let future = {
    unstable_cssModules: ((_appConfig$future2 = appConfig.future) === null || _appConfig$future2 === void 0 ? void 0 : _appConfig$future2.unstable_cssModules) === true,
    unstable_cssSideEffectImports: ((_appConfig$future3 = appConfig.future) === null || _appConfig$future3 === void 0 ? void 0 : _appConfig$future3.unstable_cssSideEffectImports) === true,
    unstable_dev: ((_appConfig$future4 = appConfig.future) === null || _appConfig$future4 === void 0 ? void 0 : _appConfig$future4.unstable_dev) ?? false,
    unstable_vanillaExtract: ((_appConfig$future5 = appConfig.future) === null || _appConfig$future5 === void 0 ? void 0 : _appConfig$future5.unstable_vanillaExtract) === true,
    v2_errorBoundary: ((_appConfig$future6 = appConfig.future) === null || _appConfig$future6 === void 0 ? void 0 : _appConfig$future6.v2_errorBoundary) === true,
    v2_meta: ((_appConfig$future7 = appConfig.future) === null || _appConfig$future7 === void 0 ? void 0 : _appConfig$future7.v2_meta) === true,
    v2_routeConvention: ((_appConfig$future8 = appConfig.future) === null || _appConfig$future8 === void 0 ? void 0 : _appConfig$future8.v2_routeConvention) === true
  };
  return {
    appDirectory,
    cacheDirectory,
    entryClientFile,
    entryServerFile,
    devServerPort,
    devServerBroadcastDelay,
    assetsBuildDirectory: absoluteAssetsBuildDirectory,
    relativeAssetsBuildDirectory: assetsBuildDirectory,
    publicPath,
    rootDirectory,
    routes: routes$1,
    serverBuildPath,
    serverMode,
    serverModuleFormat,
    serverPlatform,
    serverBuildTarget,
    serverBuildTargetEntryModule,
    serverEntryPoint: customServerEntryPoint,
    serverDependenciesToBundle,
    mdx,
    watchPaths,
    tsconfigPath,
    future
  };
}
function addTrailingSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}
const entryExts = [".js", ".jsx", ".ts", ".tsx"];
function findEntry(dir, basename) {
  for (let ext of entryExts) {
    let file = path__namespace.resolve(dir, basename + ext);
    if (fse__namespace.existsSync(file)) return path__namespace.relative(dir, file);
  }
  return undefined;
}
const configExts = [".js", ".cjs", ".mjs"];
function findConfig(dir, basename) {
  for (let ext of configExts) {
    let file = path__namespace.resolve(dir, basename + ext);
    if (fse__namespace.existsSync(file)) return file;
  }
  return undefined;
}

exports.readConfig = readConfig;
