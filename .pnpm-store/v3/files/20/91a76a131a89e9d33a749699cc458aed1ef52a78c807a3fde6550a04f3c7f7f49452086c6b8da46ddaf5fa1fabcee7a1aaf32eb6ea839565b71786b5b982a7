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

var routeExports = require('../routeExports.js');
var invariant = require('../../invariant.js');

const browserSafeRouteExports = {
  CatchBoundary: true,
  ErrorBoundary: true,
  default: true,
  handle: true,
  links: true,
  meta: true,
  shouldRevalidate: true
};

/**
 * This plugin loads route modules for the browser build, using module shims
 * that re-export only the route module exports that are safe for the browser.
 */
function browserRouteModulesPlugin(config, suffixMatcher) {
  return {
    name: "browser-route-modules",
    async setup(build) {
      let routesByFile = Object.keys(config.routes).reduce((map, key) => {
        let route = config.routes[key];
        map.set(route.file, route);
        return map;
      }, new Map());
      build.onResolve({
        filter: suffixMatcher
      }, args => {
        return {
          path: args.path,
          namespace: "browser-route-module"
        };
      });
      build.onLoad({
        filter: suffixMatcher,
        namespace: "browser-route-module"
      }, async args => {
        let theExports;
        let file = args.path.replace(suffixMatcher, "");
        let route = routesByFile.get(file);
        try {
          invariant["default"](route, `Cannot get route by path: ${args.path}`);
          theExports = (await routeExports.getRouteModuleExports(config, route.id)).filter(ex => !!browserSafeRouteExports[ex]);
        } catch (error) {
          return {
            errors: [{
              text: error.message,
              pluginName: "browser-route-module"
            }]
          };
        }
        let contents = "module.exports = {};";
        if (theExports.length !== 0) {
          let spec = `{ ${theExports.join(", ")} }`;
          contents = `export ${spec} from ${JSON.stringify(`./${file}`)};`;
        }
        return {
          contents,
          resolveDir: config.appDirectory,
          loader: "js"
        };
      });
    }
  };
}

exports.browserRouteModulesPlugin = browserRouteModulesPlugin;
