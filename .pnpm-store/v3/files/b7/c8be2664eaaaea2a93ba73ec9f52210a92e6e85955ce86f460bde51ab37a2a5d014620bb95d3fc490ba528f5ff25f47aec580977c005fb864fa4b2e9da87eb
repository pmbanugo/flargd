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
var esbuild = require('esbuild');
var invariant = require('../../invariant.js');

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
var esbuild__default = /*#__PURE__*/_interopDefaultLegacy(esbuild);

const isExtendedLengthPath = /^\\\\\?\\/;
function normalizePathSlashes(p) {
  return isExtendedLengthPath.test(p) ? p : p.replace(/\\/g, "/");
}

/**
 * This plugin loads css files with the "css" loader (bundles and moves assets to assets directory)
 * and exports the url of the css file as its default export.
 */
function cssFilePlugin(options) {
  return {
    name: "css-file",
    async setup(build) {
      let buildOps = build.initialOptions;
      build.onLoad({
        filter: /\.css$/
      }, async args => {
        let {
          outfile,
          outdir,
          assetNames
        } = buildOps;
        let {
          metafile,
          outputFiles,
          warnings,
          errors
        } = await esbuild__default["default"].build({
          ...buildOps,
          minify: options.mode === "production",
          minifySyntax: true,
          metafile: true,
          write: false,
          sourcemap: false,
          incremental: false,
          splitting: false,
          stdin: undefined,
          outfile: undefined,
          outdir: outfile ? path__namespace.dirname(outfile) : outdir,
          entryNames: assetNames,
          entryPoints: [args.path],
          loader: {
            ...buildOps.loader,
            ".css": "css"
          },
          // this plugin treats absolute paths in 'url()' css rules as external to prevent breaking changes
          plugins: [{
            name: "resolve-absolute",
            async setup(build) {
              build.onResolve({
                filter: /.*/
              }, async args => {
                let {
                  kind,
                  path: resolvePath
                } = args;
                if (kind === "url-token" && path__namespace.isAbsolute(resolvePath)) {
                  return {
                    path: resolvePath,
                    external: true
                  };
                }
              });
            }
          }]
        });
        if (errors && errors.length) {
          return {
            errors
          };
        }
        invariant["default"](metafile, "metafile is missing");
        let {
          outputs
        } = metafile;
        let entry = Object.keys(outputs).find(out => outputs[out].entryPoint);
        invariant["default"](entry, "entry point not found");
        let normalizedEntry = path__namespace.resolve(options.rootDirectory, normalizePathSlashes(entry));
        let entryFile = outputFiles.find(file => {
          return path__namespace.resolve(options.rootDirectory, normalizePathSlashes(file.path)) === normalizedEntry;
        });
        invariant["default"](entryFile, "entry file not found");
        let outputFilesWithoutEntry = outputFiles.filter(file => file !== entryFile);

        // write all assets
        await Promise.all(outputFilesWithoutEntry.map(({
          path: filepath,
          contents
        }) => fse__namespace.outputFile(filepath, contents)));
        return {
          contents: entryFile.contents,
          loader: "file",
          // add all css assets to watchFiles
          watchFiles: Object.values(outputs).reduce((arr, {
            inputs
          }) => {
            let resolvedInputs = Object.keys(inputs).map(input => {
              return path__namespace.resolve(input);
            });
            arr.push(...resolvedInputs);
            return arr;
          }, []),
          warnings
        };
      });
    }
  };
}

exports.cssFilePlugin = cssFilePlugin;
