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
var LRUCache = require('lru-cache');
var parser = require('@babel/parser');
var traverse = require('@babel/traverse');
var generate = require('@babel/generator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fse__default = /*#__PURE__*/_interopDefaultLegacy(fse);
var LRUCache__default = /*#__PURE__*/_interopDefaultLegacy(LRUCache);
var traverse__default = /*#__PURE__*/_interopDefaultLegacy(traverse);
var generate__default = /*#__PURE__*/_interopDefaultLegacy(generate);

const pluginName = "css-side-effects-plugin";
const namespace = `${pluginName}-ns`;
const cssSideEffectSuffix = "?__remix_sideEffect__";
const cssSideEffectFilter = new RegExp(`\\.css${cssSideEffectSuffix.replace("?", "\\?")}$`);
function isCssSideEffectImportPath(path) {
  return cssSideEffectFilter.test(path);
}
const loaders = ["js", "jsx", "ts", "tsx"];
const allJsFilesFilter = new RegExp(`\\.(${loaders.join("|")})$`);
const loaderForExtension = {
  ".js": "js",
  ".jsx": "jsx",
  ".ts": "ts",
  ".tsx": "tsx"
};

/**
 * This plugin detects side-effect imports of CSS files and adds a suffix
 * to the import path, e.g. `import "./styles.css"` is transformed to
 * `import "./styles.css?__remix_sideEffect__"`). This allows them to be
 * differentiated from non-side-effect imports so that they can be added
 * to the CSS bundle. This is primarily designed to support packages that
 * import plain CSS files directly within JS files.
 */
const cssSideEffectImportsPlugin = options => {
  return {
    name: pluginName,
    setup: async build => {
      build.onLoad({
        filter: allJsFilesFilter,
        namespace: "file"
      }, async args => {
        let code = await fse__default["default"].readFile(args.path, "utf8");

        // Don't process file if it doesn't contain any references to CSS files
        if (!code.includes(".css")) {
          return null;
        }
        let loader = loaderForExtension[path__default["default"].extname(args.path)];
        let contents = addSuffixToCssSideEffectImports(loader, code);
        return {
          contents,
          loader
        };
      });
      build.onResolve({
        filter: cssSideEffectFilter,
        namespace: "file"
      }, async args => {
        let resolvedPath = (await build.resolve(args.path, {
          resolveDir: args.resolveDir,
          kind: args.kind
        })).path;
        return {
          path: path__default["default"].relative(options.rootDirectory, resolvedPath),
          namespace: resolvedPath.endsWith(".css") ? namespace : undefined
        };
      });
      build.onLoad({
        filter: /\.css$/,
        namespace
      }, async args => {
        let contents = await fse__default["default"].readFile(args.path, "utf8");
        return {
          contents,
          resolveDir: path__default["default"].dirname(args.path),
          loader: "css"
        };
      });
    }
  };
};
const babelPluginsForLoader = {
  js: [],
  jsx: ["jsx"],
  ts: ["typescript"],
  tsx: ["typescript", "jsx"]
};
const cache = new LRUCache__default["default"]({
  max: 1000
});
const getCacheKey = (loader, code) => `${loader}:${code}`;
function addSuffixToCssSideEffectImports(loader, code) {
  let cacheKey = getCacheKey(loader, code);
  let cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }
  let ast = parser.parse(code, {
    sourceType: "module",
    plugins: babelPluginsForLoader[loader]
  });
  traverse__default["default"](ast, {
    // Handle `import "./styles.css"`
    ImportDeclaration(path) {
      if (path.node.specifiers.length === 0 &&
      // i.e. nothing was imported
      path.node.source.value.endsWith(".css")) {
        path.node.source.value += cssSideEffectSuffix;
      }
    },
    // Handle `require("./styles.css")`
    CallExpression(path) {
      if (path.node.callee.type === "Identifier" && path.node.callee.name === "require" && (
      // Require call must be its own statement,
      // not nested within another expression,
      path.parent.type === "ExpressionStatement" ||
      // or, the statement must only consist of a
      // ternary or logical expression, without
      // assigning the result to a variable.
      (path.parent.type === "ConditionalExpression" || path.parent.type === "LogicalExpression") && path.parentPath.parent.type === "ExpressionStatement")) {
        let specifier = path.node.arguments[0];
        if (specifier && specifier.type === "StringLiteral" && specifier.value.endsWith(".css")) {
          specifier.value += cssSideEffectSuffix;
        }
      }
    }
  });
  let result = generate__default["default"](ast, {
    retainLines: true,
    compact: false
  }).code;
  cache.set(cacheKey, result);
  return result;
}

exports.addSuffixToCssSideEffectImports = addSuffixToCssSideEffectImports;
exports.cssSideEffectImportsPlugin = cssSideEffectImportsPlugin;
exports.isCssSideEffectImportPath = isCssSideEffectImportPath;
