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
var prettier = require('prettier');
var tsconfigLoader = require('tsconfig-paths/lib/tsconfig-loader');
var JSON5 = require('json5');
var colors = require('../../../colors.js');

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
var fse__default = /*#__PURE__*/_interopDefaultLegacy(fse);
var prettier__default = /*#__PURE__*/_interopDefaultLegacy(prettier);
var JSON5__default = /*#__PURE__*/_interopDefaultLegacy(JSON5);

// These are suggested values and will be set when not present in the
// tsconfig.json
let suggestedCompilerOptions = {
  allowJs: true,
  forceConsistentCasingInFileNames: true,
  lib: ["DOM", "DOM.Iterable", "ES2019"],
  strict: true,
  target: "ES2019"
};

// These values are required and cannot be changed by the user
// Keep this in sync with esbuild
let requiredCompilerOptions = {
  esModuleInterop: true,
  isolatedModules: true,
  jsx: "react-jsx",
  noEmit: true,
  resolveJsonModule: true
};

// taken from https://github.com/sindresorhus/ts-extras/blob/781044f0412ec4a4224a1b9abce5ff0eacee3e72/source/object-keys.ts

function objectKeys(value) {
  return Object.keys(value);
}
function writeConfigDefaults(configPath) {
  // check files exist
  if (!fse__default["default"].existsSync(configPath)) return;

  // this will be the *full* tsconfig.json with any extensions deeply merged
  let fullConfig = tsconfigLoader.loadTsconfig(configPath);
  // this will be the user's actual tsconfig file
  let configContents = fse__default["default"].readFileSync(configPath, "utf8");
  let config;
  try {
    config = JSON5__default["default"].parse(configContents);
  } catch (error) {}
  if (!fullConfig || !config) {
    // how did we get here? we validated a tsconfig existed in the first place
    console.warn("This should never happen, please open an issue with a reproduction https://github.com/remix-run/remix/issues/new");
    return;
  }
  let configType = path__namespace.basename(configPath);

  // sanity checks to make sure we can write the compilerOptions
  if (!fullConfig.compilerOptions) fullConfig.compilerOptions = {};
  if (!config.compilerOptions) config.compilerOptions = {};
  let suggestedChanges = [];
  let requiredChanges = [];
  if (!("include" in fullConfig)) {
    if (configType === "jsconfig.json") {
      config.include = ["**/*.js", "**/*.jsx"];
      suggestedChanges.push(colors.blue("include") + " was set to " + colors.bold(`['**/*.js', '**/*.jsx']`));
    } else {
      config.include = ["remix.env.d.ts", "**/*.ts", "**/*.tsx"];
      suggestedChanges.push(colors.blue("include") + " was set to " + colors.bold(`['remix.env.d.ts', '**/*.ts', '**/*.tsx']`));
    }
  }
  // TODO: check for user's typescript version and only add baseUrl if < 4.1
  if (!("baseUrl" in fullConfig.compilerOptions)) {
    let baseUrl = path__namespace.relative(process.cwd(), path__namespace.dirname(configPath)) || ".";
    config.compilerOptions.baseUrl = baseUrl;
    requiredChanges.push(colors.blue("compilerOptions.baseUrl") + " was set to " + colors.bold(`'${baseUrl}'`));
  }
  for (let key of objectKeys(suggestedCompilerOptions)) {
    if (!(key in fullConfig.compilerOptions)) {
      config.compilerOptions[key] = suggestedCompilerOptions[key];
      suggestedChanges.push(colors.blue("compilerOptions." + key) + " was set to " + colors.bold(`'${suggestedCompilerOptions[key]}'`));
    }
  }
  for (let key of objectKeys(requiredCompilerOptions)) {
    if (fullConfig.compilerOptions[key] !== requiredCompilerOptions[key]) {
      config.compilerOptions[key] = requiredCompilerOptions[key];
      requiredChanges.push(colors.blue("compilerOptions." + key) + " was set to " + colors.bold(`'${requiredCompilerOptions[key]}'`));
    }
  }
  if (typeof fullConfig.compilerOptions.moduleResolution === "undefined") {
    fullConfig.compilerOptions.moduleResolution = "node";
    config.compilerOptions.moduleResolution = "node";
    requiredChanges.push(colors.blue("compilerOptions.moduleResolution") + " was set to " + colors.bold(`'node'`));
  }
  if (!["node", "node16", "nodenext"].includes(fullConfig.compilerOptions.moduleResolution.toLowerCase())) {
    config.compilerOptions.moduleResolution = "node";
    requiredChanges.push(colors.blue("compilerOptions.moduleResolution") + " was set to " + colors.bold(`'node'`));
  }
  if (suggestedChanges.length > 0 || requiredChanges.length > 0) {
    fse__default["default"].writeFileSync(configPath, prettier__default["default"].format(JSON.stringify(config, null, 2), {
      parser: "json"
    }));
  }
  if (suggestedChanges.length > 0) {
    console.log(`The following suggested values were added to your ${colors.blue(`"${configType}"`)}. These values ${colors.bold("can be changed")} to fit your project's needs:\n`);
    suggestedChanges.forEach(change => console.log(`\t- ${change}`));
    console.log("");
  }
  if (requiredChanges.length > 0) {
    console.log(`The following ${colors.bold("mandatory changes")} were made to your ${colors.blue(configType)}:\n`);
    requiredChanges.forEach(change => console.log(`\t- ${change}`));
    console.log("");
  }
}

exports.writeConfigDefaults = writeConfigDefaults;
