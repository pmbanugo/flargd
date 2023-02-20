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
var module$1 = require('module');
var esbuild = require('esbuild');
var nodeModulesPolyfill = require('@esbuild-plugins/node-modules-polyfill');
var postcss = require('postcss');
var postcssDiscardDuplicates = require('postcss-discard-duplicates');
var assets = require('./assets.js');
var dependencies = require('./dependencies.js');
var loaders = require('./loaders.js');
var browserRouteModulesPlugin = require('./plugins/browserRouteModulesPlugin.js');
var cssFilePlugin = require('./plugins/cssFilePlugin.js');
var deprecatedRemixPackagePlugin = require('./plugins/deprecatedRemixPackagePlugin.js');
var emptyModulesPlugin = require('./plugins/emptyModulesPlugin.js');
var mdx = require('./plugins/mdx.js');
var urlImportsPlugin = require('./plugins/urlImportsPlugin.js');
var cssModulesPlugin = require('./plugins/cssModulesPlugin.js');
var cssSideEffectImportsPlugin = require('./plugins/cssSideEffectImportsPlugin.js');
var vanillaExtractPlugin = require('./plugins/vanillaExtractPlugin.js');
var cssBundleEntryModulePlugin = require('./plugins/cssBundleEntryModulePlugin.js');
var fs = require('./utils/fs.js');
var invariant = require('../invariant.js');

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
var esbuild__namespace = /*#__PURE__*/_interopNamespace(esbuild);
var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);
var postcssDiscardDuplicates__default = /*#__PURE__*/_interopDefaultLegacy(postcssDiscardDuplicates);

const getExternals = remixConfig => {
  // For the browser build, exclude node built-ins that don't have a
  // browser-safe alternative installed in node_modules. Nothing should
  // *actually* be external in the browser build (we want to bundle all deps) so
  // this is really just making sure we don't accidentally have any dependencies
  // on node built-ins in browser bundles.
  let dependencies$1 = Object.keys(dependencies.getAppDependencies(remixConfig));
  let fakeBuiltins = module$1.builtinModules.filter(mod => dependencies$1.includes(mod));
  if (fakeBuiltins.length > 0) {
    throw new Error(`It appears you're using a module that is built in to node, but you installed it as a dependency which could cause problems. Please remove ${fakeBuiltins.join(", ")} before continuing.`);
  }
  return module$1.builtinModules.filter(mod => !dependencies$1.includes(mod));
};
const writeAssetsManifest = async (config, assetsManifest) => {
  let filename = `manifest-${assetsManifest.version.toUpperCase()}.js`;
  assetsManifest.url = config.publicPath + filename;
  await fs.writeFileSafe(path__namespace.join(config.assetsBuildDirectory, filename), `window.__remixManifest=${JSON.stringify(assetsManifest)};`);
};
const isCssBundlingEnabled = config => config.future.unstable_cssModules || config.future.unstable_cssSideEffectImports || config.future.unstable_vanillaExtract;
const createEsbuildConfig = (build, config, options) => {
  let isCssBuild = build === "css";
  let entryPoints;
  if (isCssBuild) {
    entryPoints = {
      "css-bundle": cssBundleEntryModulePlugin.cssBundleEntryModuleId
    };
  } else {
    entryPoints = {
      "entry.client": path__namespace.resolve(config.appDirectory, config.entryClientFile)
    };
    for (let id of Object.keys(config.routes)) {
      // All route entry points are virtual modules that will be loaded by the
      // browserEntryPointsPlugin. This allows us to tree-shake server-only code
      // that we don't want to run in the browser (i.e. action & loader).
      entryPoints[id] = config.routes[id].file + "?browser";
    }
  }
  let {
    mode
  } = options;
  let {
    rootDirectory
  } = config;
  let outputCss = isCssBuild;
  let plugins = [deprecatedRemixPackagePlugin.deprecatedRemixPackagePlugin(options.onWarning), isCssBundlingEnabled(config) && isCssBuild ? cssBundleEntryModulePlugin.cssBundleEntryModulePlugin(config) : null, config.future.unstable_cssModules ? cssModulesPlugin.cssModulesPlugin({
    mode,
    rootDirectory,
    outputCss
  }) : null, config.future.unstable_vanillaExtract ? vanillaExtractPlugin.vanillaExtractPlugin({
    config,
    mode,
    outputCss
  }) : null, config.future.unstable_cssSideEffectImports ? cssSideEffectImportsPlugin.cssSideEffectImportsPlugin({
    rootDirectory
  }) : null, cssFilePlugin.cssFilePlugin({
    mode,
    rootDirectory
  }), urlImportsPlugin.urlImportsPlugin(), mdx.mdxPlugin(config), browserRouteModulesPlugin.browserRouteModulesPlugin(config, /\?browser$/), emptyModulesPlugin.emptyModulesPlugin(config, /\.server(\.[jt]sx?)?$/), nodeModulesPolyfill.NodeModulesPolyfillPlugin()].filter(isNotNull);
  return {
    entryPoints,
    outdir: config.assetsBuildDirectory,
    platform: "browser",
    format: "esm",
    external: [
    // This allows Vanilla Extract to bundle asset imports, e.g. `import href
    // from './image.svg'` resolves to a string like "/build/_assets/XXXX.svg"
    // which will then appear in the compiled CSS, e.g. `background:
    // url("/build/_assets/XXXX.svg")`. If we don't mark this path as
    // external, esbuild will try to bundle it again but won't find it.
    config.future.unstable_vanillaExtract ? `${config.publicPath}_assets/*` : null, ...getExternals(config)].filter(isNotNull),
    loader: loaders.loaders,
    bundle: true,
    logLevel: "silent",
    splitting: !isCssBuild,
    sourcemap: options.sourcemap,
    // As pointed out by https://github.com/evanw/esbuild/issues/2440, when tsconfig is set to
    // `undefined`, esbuild will keep looking for a tsconfig.json recursively up. This unwanted
    // behavior can only be avoided by creating an empty tsconfig file in the root directory.
    tsconfig: config.tsconfigPath,
    mainFields: ["browser", "module", "main"],
    treeShaking: true,
    minify: options.mode === "production",
    entryNames: "[dir]/[name]-[hash]",
    chunkNames: "_shared/[name]-[hash]",
    assetNames: "_assets/[name]-[hash]",
    publicPath: config.publicPath,
    define: {
      "process.env.NODE_ENV": JSON.stringify(options.mode),
      "process.env.REMIX_DEV_SERVER_WS_PORT": JSON.stringify(config.devServerPort)
    },
    jsx: "automatic",
    jsxDev: options.mode !== "production",
    plugins
  };
};
const createBrowserCompiler = (remixConfig, options) => {
  let appCompiler;
  let cssCompiler;
  let compile = async manifestChannel => {
    let appBuildTask = async () => {
      appCompiler = await (!appCompiler ? esbuild__namespace.build({
        ...createEsbuildConfig("app", remixConfig, options),
        metafile: true,
        incremental: true
      }) : appCompiler.rebuild());
      invariant["default"](appCompiler.metafile, "Expected app compiler metafile to be defined. This is likely a bug in Remix. Please open an issue at https://github.com/remix-run/remix/issues/new");
    };
    let cssBuildTask = async () => {
      var _outputFiles$find;
      if (!isCssBundlingEnabled(remixConfig)) {
        return;
      }

      // The types aren't great when combining write: false and incremental: true
      //  so we need to assert that it's an incremental build
      cssCompiler = await (!cssCompiler ? esbuild__namespace.build({
        ...createEsbuildConfig("css", remixConfig, options),
        metafile: true,
        incremental: true,
        write: false
      }) : cssCompiler.rebuild());
      invariant["default"](cssCompiler.metafile, "Expected CSS compiler metafile to be defined. This is likely a bug in Remix. Please open an issue at https://github.com/remix-run/remix/issues/new");
      let outputFiles = cssCompiler.outputFiles || [];
      let isCssBundleFile = (outputFile, extension) => {
        return path__namespace.dirname(outputFile.path) === remixConfig.assetsBuildDirectory && path__namespace.basename(outputFile.path).startsWith("css-bundle") && outputFile.path.endsWith(extension);
      };
      let cssBundleFile = outputFiles.find(outputFile => isCssBundleFile(outputFile, ".css"));
      if (!cssBundleFile) {
        return;
      }
      let cssBundlePath = cssBundleFile.path;

      // Get esbuild's existing CSS source map so we can pass it to PostCSS
      let cssBundleSourceMap = (_outputFiles$find = outputFiles.find(outputFile => isCssBundleFile(outputFile, ".css.map"))) === null || _outputFiles$find === void 0 ? void 0 : _outputFiles$find.text;
      let {
        css,
        map
      } = await postcss__default["default"]([
      // We need to discard duplicate rules since "composes"
      // in CSS Modules can result in duplicate styles
      postcssDiscardDuplicates__default["default"]()]).process(cssBundleFile.text, {
        from: cssBundlePath,
        to: cssBundlePath,
        map: {
          prev: cssBundleSourceMap,
          inline: false,
          annotation: false,
          sourcesContent: true
        }
      });
      await fse__namespace.ensureDir(path__namespace.dirname(cssBundlePath));
      await Promise.all([fse__namespace.writeFile(cssBundlePath, css), options.mode !== "production" && map ? fse__namespace.writeFile(`${cssBundlePath}.map`, map.toString()) // Write our updated source map rather than esbuild's
      : null, ...outputFiles.filter(outputFile => !/\.(css|js|map)$/.test(outputFile.path)).map(async asset => {
        await fse__namespace.ensureDir(path__namespace.dirname(asset.path));
        await fse__namespace.writeFile(asset.path, asset.contents);
      })]);

      // Return the CSS bundle path so we can use it to generate the manifest
      return cssBundlePath;
    };
    let [cssBundlePath] = await Promise.all([cssBuildTask(), appBuildTask()]);
    let manifest = await assets.createAssetsManifest({
      config: remixConfig,
      metafile: appCompiler.metafile,
      cssBundlePath
    });
    manifestChannel.write(manifest);
    await writeAssetsManifest(remixConfig, manifest);
  };
  return {
    compile,
    dispose: () => {
      var _appCompiler, _cssCompiler;
      (_appCompiler = appCompiler) === null || _appCompiler === void 0 ? void 0 : _appCompiler.rebuild.dispose();
      (_cssCompiler = cssCompiler) === null || _cssCompiler === void 0 ? void 0 : _cssCompiler.rebuild.dispose();
    }
  };
};
function isNotNull(value) {
  return value !== null;
}

exports.createBrowserCompiler = createBrowserCompiler;
