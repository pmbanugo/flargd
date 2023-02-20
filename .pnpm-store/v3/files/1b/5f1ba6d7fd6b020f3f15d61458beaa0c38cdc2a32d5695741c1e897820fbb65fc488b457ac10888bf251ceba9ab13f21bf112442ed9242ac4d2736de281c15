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
var fs = require('fs');
var module$1 = require('module');
var virtualModules = require('../virtualModules.js');
var cssSideEffectImportsPlugin = require('./cssSideEffectImportsPlugin.js');
var index = require('../utils/tsconfig/index.js');
var getPreferredPackageManager = require('../../cli/getPreferredPackageManager.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

/**
 * A plugin responsible for resolving bare module ids based on server target.
 * This includes externalizing for node based platforms, and bundling for single file
 * environments such as cloudflare.
 */
function serverBareModulesPlugin(remixConfig, onWarning) {
  let isDenoRuntime = remixConfig.serverBuildTarget === "deno";

  // Resolve paths according to tsconfig paths property
  let matchPath = isDenoRuntime ? undefined : index.createMatchPath(remixConfig.tsconfigPath);
  function resolvePath(id) {
    if (!matchPath) {
      return id;
    }
    return matchPath(id, undefined, undefined, [".ts", ".tsx", ".js", ".jsx"]) || id;
  }
  return {
    name: "server-bare-modules",
    setup(build) {
      build.onResolve({
        filter: /.*/
      }, ({
        importer,
        kind,
        path: path$1
      }) => {
        // If it's not a bare module ID, bundle it.
        if (!isBareModuleId(resolvePath(path$1))) {
          return undefined;
        }

        // Always bundle @remix-run/css-bundle
        if (path$1 === "@remix-run/css-bundle") {
          return undefined;
        }

        // To prevent `import xxx from "remix"` from ending up in the bundle
        // we "bundle" remix but the other modules where the code lives.
        if (path$1 === "remix") {
          return undefined;
        }

        // These are our virtual modules, always bundle them because there is no
        // "real" file on disk to externalize.
        if (path$1 === virtualModules.serverBuildVirtualModule.id || path$1 === virtualModules.assetsManifestVirtualModule.id) {
          return undefined;
        }

        // Always bundle CSS files so we get immutable fingerprinted asset URLs.
        if (path$1.endsWith(".css")) {
          return undefined;
        }

        // Always bundle CSS side-effect imports.
        if (cssSideEffectImportsPlugin.isCssSideEffectImportPath(path$1)) {
          return undefined;
        }
        let packageName = getNpmPackageName(path$1);
        let pkgManager = getPreferredPackageManager.getPreferredPackageManager();

        // Warn if we can't find an import for a package.
        if (onWarning && !isNodeBuiltIn(packageName) && !/\bnode_modules\b/.test(importer) && (
        // Silence spurious warnings when using Yarn PnP. Yarn PnP doesn’t use
        // a `node_modules` folder to keep its dependencies, so the above check
        // will always fail.
        pkgManager === "npm" || pkgManager === "yarn" && process.versions.pnp == null)) {
          try {
            require.resolve(path$1);
          } catch (error) {
            onWarning(`The path "${path$1}" is imported in ` + `${path.relative(process.cwd(), importer)} but ` + `"${path$1}" was not found in your node_modules. ` + `Did you forget to install it?`, path$1);
          }
        }
        switch (remixConfig.serverBuildTarget) {
          // Always bundle everything for cloudflare.
          case "cloudflare-pages":
          case "cloudflare-workers":
          case "deno":
            return undefined;
        }
        for (let pattern of remixConfig.serverDependenciesToBundle) {
          // bundle it if the path matches the pattern
          if (typeof pattern === "string" ? path$1 === pattern : pattern.test(path$1)) {
            return undefined;
          }
        }
        if (onWarning && !isNodeBuiltIn(packageName) && kind !== "dynamic-import" && (!remixConfig.serverBuildTarget || remixConfig.serverBuildTarget === "node-cjs")) {
          warnOnceIfEsmOnlyPackage(packageName, path$1, onWarning);
        }

        // Externalize everything else if we've gotten here.
        return {
          path: path$1,
          external: true
        };
      });
    }
  };
}
function isNodeBuiltIn(packageName) {
  return module$1.builtinModules.includes(packageName);
}
function getNpmPackageName(id) {
  let split = id.split("/");
  let packageName = split[0];
  if (packageName.startsWith("@")) packageName += `/${split[1]}`;
  return packageName;
}
function isBareModuleId(id) {
  return !id.startsWith("node:") && !id.startsWith(".") && !path.isAbsolute(id);
}
function warnOnceIfEsmOnlyPackage(packageName, fullImportPath, onWarning) {
  try {
    let packageDir = resolveModuleBasePath(packageName, fullImportPath);
    let packageJsonFile = path__default["default"].join(packageDir, "package.json");
    if (!fs__default["default"].existsSync(packageJsonFile)) {
      console.log(packageJsonFile, `does not exist`);
      return;
    }
    let pkg = JSON.parse(fs__default["default"].readFileSync(packageJsonFile, "utf-8"));
    let subImport = fullImportPath.slice(packageName.length + 1);
    if (pkg.type === "module") {
      let isEsmOnly = true;
      if (pkg.exports) {
        var _pkg$exports;
        if (!subImport) {
          var _pkg$exports$;
          if (pkg.exports.require) {
            isEsmOnly = false;
          } else if ((_pkg$exports$ = pkg.exports["."]) !== null && _pkg$exports$ !== void 0 && _pkg$exports$.require) {
            isEsmOnly = false;
          }
        } else if ((_pkg$exports = pkg.exports[`./${subImport}`]) !== null && _pkg$exports !== void 0 && _pkg$exports.require) {
          isEsmOnly = false;
        }
      }
      if (isEsmOnly) {
        onWarning(`${packageName} is possibly an ESM only package and should be bundled with ` + `"serverDependenciesToBundle in remix.config.js.`, packageName + ":esm-only");
      }
    }
  } catch (error) {
    // module not installed
    // we warned earlier if a package is used without being in package.json
    // if the build fails, the reason will be right there
  }
}

// https://github.com/nodejs/node/issues/33460#issuecomment-919184789
// adapted to use the fullImportPath to resolve sub packages like @heroicons/react/solid
function resolveModuleBasePath(packageName, fullImportPath) {
  let moduleMainFilePath = require.resolve(fullImportPath);
  let packageNameParts = packageName.split("/");
  let searchForPathSection;
  if (packageName.startsWith("@") && packageNameParts.length > 1) {
    let [org, mod] = packageNameParts;
    searchForPathSection = `node_modules${path__default["default"].sep}${org}${path__default["default"].sep}${mod}`;
  } else {
    let [mod] = packageNameParts;
    searchForPathSection = `node_modules${path__default["default"].sep}${mod}`;
  }
  let lastIndex = moduleMainFilePath.lastIndexOf(searchForPathSection);
  if (lastIndex === -1) {
    throw new Error(`Couldn't resolve the base path of "${packageName}". Searched inside the resolved main file path "${moduleMainFilePath}" using "${searchForPathSection}"`);
  }
  return moduleMainFilePath.slice(0, lastIndex + searchForPathSection.length);
}

exports.serverBareModulesPlugin = serverBareModulesPlugin;
