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

var NpmCliPackageJson = require('@npmcli/package-json');
var glob = require('fast-glob');
var fs = require('fs');
var _ = require('lodash');
var semver = require('semver');
var colors = require('../../colors.js');
var config = require('../../config.js');
var getPreferredPackageManager = require('../../cli/getPreferredPackageManager.js');
var error = require('../utils/error.js');
var log = require('../utils/log.js');
var task = require('../utils/task.js');
var transform = require('./transform.js');
var dependencies = require('./utils/dependencies.js');
var detect = require('./utils/detect.js');
var postinstall = require('./utils/postinstall.js');
var remix = require('./utils/remix.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var NpmCliPackageJson__default = /*#__PURE__*/_interopDefaultLegacy(NpmCliPackageJson);
var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var semver__default = /*#__PURE__*/_interopDefaultLegacy(semver);

const code = message => colors.cyan("`" + message + "`");
const getRemixVersionSpec = remixDeps => {
  let candidate = _.maxBy(remixDeps, dep => semver__default["default"].minVersion(dep.versionSpec));
  if (candidate === undefined) {
    throw new error.CodemodError("Could not find versions for your Remix packages");
  }
  let candidateMin = semver__default["default"].minVersion(candidate.versionSpec);
  if (candidateMin === null) {
    throw new error.CodemodError("Could not find versions for your Remix packages");
  }
  if (semver__default["default"].lt(candidateMin, "1.3.3")) return "^1.3.3";
  return candidate.versionSpec;
};
const codemod = async (projectDir, options) => {
  let pkg = await NpmCliPackageJson__default["default"].load(projectDir);
  let adapter = await task.task("Detecting Remix server adapter", async () => detect.detectAdapter(pkg.content), adapter => adapter ? `Detected Remix server adapter: ${colors.blue(adapter)}` : "No Remix server adapter detected");
  let runtime = await task.task("Detecting Remix server runtime", async () => detect.detectRuntime(pkg.content, adapter), runtime => `Detected Remix server runtime: ${colors.blue(runtime)}`);
  await task.task(`Removing magic ${code("remix")} package from dependencies`, async () => {
    let deps = dependencies.parse(pkg.content.dependencies);
    let remixDeps = deps.filter(({
      name
    }) => remix.isRemixPackage(name));
    let otherDeps = deps.filter(({
      name
    }) => !remix.isRemixPackage(name));
    let devDeps = dependencies.parse(pkg.content.devDependencies);
    let remixDevDeps = devDeps.filter(({
      name
    }) => remix.isRemixPackage(name));
    let otherDevDeps = devDeps.filter(({
      name
    }) => !remix.isRemixPackage(name));

    // detect `@remix-run/serve`
    let remixServeInstalled = remixDeps.map(({
      name
    }) => name).includes("@remix-run/serve");

    // determine latest Remix version that is compatible with project
    let remixVersionSpec = getRemixVersionSpec([...remixDeps, ...remixDevDeps]);
    pkg.update({
      dependencies: {
        ...dependencies.unparse(otherDeps),
        // ensure Remix renderer dependency
        "@remix-run/react": remixVersionSpec,
        // ensure Remix server runtime dependency
        [`@remix-run/${runtime}`]: remixVersionSpec,
        // ensure Remix server adapter dependency, if in use
        ...(adapter ? {
          [`@remix-run/${adapter}`]: remixVersionSpec
        } : {}),
        // ensure Remix serve dependency, if in use
        ...(remixServeInstalled ? {
          [`@remix-run/serve`]: remixVersionSpec
        } : {})
      },
      devDependencies: {
        ...dependencies.unparse(otherDevDeps),
        ...dependencies.unparse(remixDevDeps.map(({
          name
        }) => ({
          name,
          versionSpec: remixVersionSpec
        }))),
        // ensure Remix dev dependency
        [`@remix-run/dev`]: remixVersionSpec
      }
    });
    if (options.dry) return;
    await pkg.save();
  }, `Removed magic ${code("remix")} package from dependencies`);
  await task.task(`Removing ${code("remix setup")} from postinstall script`, async () => {
    var _pkg$content$scripts;
    let postinstall$1 = (_pkg$content$scripts = pkg.content.scripts) === null || _pkg$content$scripts === void 0 ? void 0 : _pkg$content$scripts.postinstall;
    if (postinstall$1 === undefined) return;
    if (!postinstall.hasRemixSetup(postinstall$1)) return;
    if (!postinstall.isOnlyRemixSetup(postinstall$1)) {
      throw Error(`Could not automatically remove ${code("remix setup")} from postinstall script`);
    }
    pkg.update({
      scripts: Object.fromEntries(Object.entries(pkg.content.scripts || {}).filter(([script]) => script !== "postinstall"))
    });
    if (options.dry) return;
    await pkg.save();
  }, `Removed ${code("remix setup")} from postinstall script`);
  let replaceRemixMagicImportsText = (soFar = 0, total) => {
    let text = `Replacing magic ${code("remix")} imports`;
    if (total === undefined) return text;
    return text + colors.gray(` | ${soFar}/${total} files`);
  };
  await task.task(replaceRemixMagicImportsText(), async spinner => {
    let transform$1 = transform["default"]({
      runtime,
      adapter
    });

    // get Remix app code file paths
    let config$1 = await config.readConfig(projectDir);
    let files = glob__default["default"].sync("**/*.+(js|jsx|ts|tsx)", {
      absolute: true,
      cwd: config$1.appDirectory
    });
    spinner.text = replaceRemixMagicImportsText(0, files.length);
    let changes = false;
    // run the transform on each of those files
    for (let [i, file] of files.entries()) {
      spinner.text = replaceRemixMagicImportsText(i, files.length);
      let code = fs__default["default"].readFileSync(file, "utf-8");
      let result = transform$1(code, file);
      if (result === code) continue;
      changes = true;
      if (options.dry) {
        spinner.info(`${file} would be changed`);
        continue;
      }
      fs__default["default"].writeFileSync(file, result);
    }
    if (options.dry && !changes) spinner.info("No files would be changed");
    return files.length;
  }, fileCount => replaceRemixMagicImportsText(fileCount, fileCount).replace("Replacing", "Replaced"));
  if (!options.dry) {
    let packageManager = getPreferredPackageManager.getPreferredPackageManager();
    log.info(`👉 To update your lockfile, run ${code(`${packageManager} install`)}`);
  }
};

exports["default"] = codemod;
