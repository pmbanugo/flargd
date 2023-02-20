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
var fse = require('fs-extra');

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

exports.SetupPlatform = void 0;
(function (SetupPlatform) {
  SetupPlatform["Cloudflare"] = "cloudflare";
  SetupPlatform["Node"] = "node";
})(exports.SetupPlatform || (exports.SetupPlatform = {}));
function isSetupPlatform(platform) {
  return [exports.SetupPlatform.Cloudflare, exports.SetupPlatform.Node].includes(platform);
}
async function setupRemix(platform) {
  let remixPkgJsonFile;
  try {
    remixPkgJsonFile = resolvePackageJsonFile("remix");
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      console.error(`Missing the "remix" package. Please run \`npm install remix\` before \`remix setup\`.`);
      return;
    } else {
      throw error;
    }
  }

  // Update remix/package.json dependencies
  let remixDeps = {};
  let platformPkgJsonFile = resolvePackageJsonFile(`@remix-run/${platform}`);
  await assignDependency(remixDeps, platformPkgJsonFile);
  let serverPkgJsonFile = resolvePackageJsonFile(`@remix-run/server-runtime`);
  await assignDependency(remixDeps, serverPkgJsonFile);
  let clientPkgJsonFile = resolvePackageJsonFile(`@remix-run/react`);
  await assignDependency(remixDeps, clientPkgJsonFile);
  let remixPkgJson = await fse__namespace.readJSON(remixPkgJsonFile);
  // We can overwrite all dependencies at once because the remix package
  // doesn't actually have any dependencies.
  remixPkgJson.dependencies = remixDeps;
  await fse__namespace.writeJSON(remixPkgJsonFile, remixPkgJson, {
    spaces: 2
  });

  // Copy magicExports directories to remix
  let remixPkgDir = path__namespace.dirname(remixPkgJsonFile);
  let platformExportsDir = path__namespace.resolve(platformPkgJsonFile, "..", "dist", "magicExports");
  let serverExportsDir = path__namespace.resolve(serverPkgJsonFile, "..", "dist", "magicExports");
  let clientExportsDir = path__namespace.resolve(clientPkgJsonFile, "..", "dist", "magicExports");
  let magicTypes = await combineFilesInDirs([platformExportsDir, serverExportsDir, clientExportsDir], ".d.ts");
  let magicCJS = await combineFilesInDirs([platformExportsDir, serverExportsDir, clientExportsDir], ".js");
  let magicESM = await combineFilesInDirs([path__namespace.join(platformExportsDir, "esm"), path__namespace.join(serverExportsDir, "esm"), path__namespace.join(clientExportsDir, "esm")], ".js");
  await fse__namespace.writeFile(path__namespace.join(remixPkgDir, "dist", "index.d.ts"), magicTypes);
  await fse__namespace.writeFile(path__namespace.join(remixPkgDir, "dist", "index.js"), magicCJS);
  await fse__namespace.writeFile(path__namespace.join(remixPkgDir, "dist", "esm/index.js"), magicESM);
}
async function combineFilesInDirs(dirs, ext) {
  let combined = "";
  for (let dir of dirs) {
    let files = await fse__namespace.readdir(dir);
    for (let file of files) {
      if (!file.endsWith(ext)) {
        continue;
      }
      let contents = await fse__namespace.readFile(path__namespace.join(dir, file), "utf8");
      combined += contents + "\n";
    }
  }
  return combined;
}
function resolvePackageJsonFile(packageName) {
  return require.resolve(path__namespace.join(packageName, "package.json"));
}
async function assignDependency(deps, pkgJsonFile) {
  let pkgJson = await fse__namespace.readJSON(pkgJsonFile);
  deps[pkgJson.name] = pkgJson.version;
}

exports.isSetupPlatform = isSetupPlatform;
exports.setupRemix = setupRemix;
