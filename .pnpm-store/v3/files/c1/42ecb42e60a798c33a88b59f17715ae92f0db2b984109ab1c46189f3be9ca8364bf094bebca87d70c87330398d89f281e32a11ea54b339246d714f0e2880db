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
var child_process = require('child_process');
var fse = require('fs-extra');
var ora = require('ora');
var prettyMs = require('pretty-ms');
var esbuild = require('esbuild');
var colors = require('../colors.js');
var build$1 = require('../compiler/build.js');
require('chokidar');
require('lodash.debounce');
var config = require('../config.js');
var onCompileFailure = require('../compiler/onCompileFailure.js');
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
require('../compiler/plugins/cssSideEffectImportsPlugin.js');
require('@vanilla-extract/integration');
require('jsesc');
var getPreferredPackageManager = require('./getPreferredPackageManager.js');
var options = require('../compiler/options.js');
var liveReload = require('../devServer/liveReload.js');
var serve = require('../devServer/serve.js');
var devServer2 = require('../devServer2.js');
var format = require('../config/format.js');
var logging = require('../logging.js');
var create$1 = require('./create.js');
var setup$1 = require('./setup.js');
var index = require('../codemod/index.js');
var error = require('../codemod/utils/error.js');
var task = require('../codemod/utils/task.js');

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
var ora__default = /*#__PURE__*/_interopDefaultLegacy(ora);
var prettyMs__default = /*#__PURE__*/_interopDefaultLegacy(prettyMs);
var esbuild__namespace = /*#__PURE__*/_interopNamespace(esbuild);

async function create({
  appTemplate,
  projectDir,
  remixVersion,
  installDeps,
  useTypeScript,
  githubToken,
  debug
}) {
  let spinner = ora__default["default"]("Creating your app…").start();
  await create$1.createApp({
    appTemplate,
    projectDir,
    remixVersion,
    installDeps,
    useTypeScript,
    githubToken,
    debug
  });
  spinner.stop();
  spinner.clear();
}
async function init(projectDir, {
  deleteScript = true
} = {}) {
  let initScriptDir = path__namespace.join(projectDir, "remix.init");
  let initScriptTs = path__namespace.resolve(initScriptDir, "index.ts");
  let initScript = path__namespace.resolve(initScriptDir, "index.js");
  if (await fse__namespace.pathExists(initScriptTs)) {
    await esbuild__namespace.build({
      entryPoints: [initScriptTs],
      format: "cjs",
      platform: "node",
      outfile: initScript
    });
  }
  if (!(await fse__namespace.pathExists(initScript))) {
    return;
  }
  let initPackageJson = path__namespace.resolve(initScriptDir, "package.json");
  let isTypeScript = fse__namespace.existsSync(path__namespace.join(projectDir, "tsconfig.json"));
  let packageManager = getPreferredPackageManager.getPreferredPackageManager();
  if (await fse__namespace.pathExists(initPackageJson)) {
    child_process.execSync(`${packageManager} install`, {
      cwd: initScriptDir,
      stdio: "ignore"
    });
  }
  let initFn = require(initScript);
  if (typeof initFn !== "function" && initFn.default) {
    initFn = initFn.default;
  }
  try {
    await initFn({
      isTypeScript,
      packageManager,
      rootDirectory: projectDir
    });
    if (deleteScript) {
      await fse__namespace.remove(initScriptDir);
    }
  } catch (error) {
    if (error instanceof Error) {
      error.message = `${colors.error("🚨 Oops, remix.init failed")}\n\n${error.message}`;
    }
    throw error;
  }
}
async function setup(platformArg) {
  let platform;
  if (platformArg === "cloudflare-workers" || platformArg === "cloudflare-pages") {
    console.warn(`Using '${platformArg}' as a platform value is deprecated. Use ` + "'cloudflare' instead.");
    console.log("HINT: check the `postinstall` script in `package.json`");
    platform = setup$1.SetupPlatform.Cloudflare;
  } else {
    platform = setup$1.isSetupPlatform(platformArg) ? platformArg : setup$1.SetupPlatform.Node;
  }
  await setup$1.setupRemix(platform);
  logging.log(`Successfully setup Remix for ${platform}.`);
}
async function routes(remixRoot, formatArg) {
  let config$1 = await config.readConfig(remixRoot);
  let format$1 = format.isRoutesFormat(formatArg) ? formatArg : format.RoutesFormat.jsx;
  console.log(format.formatRoutes(config$1.routes, format$1));
}
async function build(remixRoot, modeArg, sourcemap = false) {
  let mode = options.parseMode(modeArg ?? "", "production");
  logging.log(`Building Remix app in ${mode} mode...`);
  if (modeArg === "production" && sourcemap) {
    console.warn("\n⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️");
    console.warn("You have enabled source maps in production. This will make your " + "server-side code visible to the public and is highly discouraged! If " + "you insist, please ensure you are using environment variables for " + "secrets and not hard-coding them into your source!");
    console.warn("⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️\n");
  }
  let start = Date.now();
  let config$1 = await config.readConfig(remixRoot);
  fse__namespace.emptyDirSync(config$1.assetsBuildDirectory);
  await build$1.build(config$1, {
    mode,
    sourcemap,
    onCompileFailure: failure => {
      onCompileFailure.logCompileFailure(failure);
      throw Error();
    }
  });
  logging.log(`Built in ${prettyMs__default["default"](Date.now() - start)}`);
}
async function watch(remixRootOrConfig, modeArg) {
  let mode = options.parseMode(modeArg ?? "", "development");
  console.log(`Watching Remix app in ${mode} mode...`);
  let config$1 = typeof remixRootOrConfig === "object" ? remixRootOrConfig : await config.readConfig(remixRootOrConfig);
  liveReload.liveReload(config$1, {
    mode,
    onInitialBuild: durationMs => console.log(`💿 Built in ${prettyMs__default["default"](durationMs)}`)
  });
  return await new Promise(() => {});
}
async function dev(remixRoot, modeArg, flags = {}) {
  let config$1 = await config.readConfig(remixRoot);
  let mode = options.parseMode(modeArg ?? "", "development");
  if (config$1.future.unstable_dev !== false) {
    await devServer2.serve(config$1, flags);
    return await new Promise(() => {});
  }
  await serve.serve(config$1, mode, flags.port);
  return await new Promise(() => {});
}
async function codemod(codemodName, projectDir, {
  dry = false,
  force = false
} = {}) {
  if (!codemodName) {
    console.error(colors.red("Error: Missing codemod name"));
    console.log("Usage: " + colors.gray(`remix codemod <${colors.arg("codemod")}> [${colors.arg("projectDir")}]`));
    process.exit(1);
  }
  try {
    await index["default"](projectDir ?? process.cwd(), codemodName, {
      dry,
      force
    });
  } catch (error$1) {
    if (error$1 instanceof error.CodemodError) {
      console.error(`${colors.red("Error:")} ${error$1.message}`);
      if (error$1.additionalInfo) console.info(colors.gray(error$1.additionalInfo));
      process.exit(1);
    }
    if (error$1 instanceof task.TaskError) {
      process.exit(1);
    }
    throw error$1;
  }
}

exports.build = build;
exports.codemod = codemod;
exports.create = create;
exports.dev = dev;
exports.init = init;
exports.routes = routes;
exports.setup = setup;
exports.watch = watch;
