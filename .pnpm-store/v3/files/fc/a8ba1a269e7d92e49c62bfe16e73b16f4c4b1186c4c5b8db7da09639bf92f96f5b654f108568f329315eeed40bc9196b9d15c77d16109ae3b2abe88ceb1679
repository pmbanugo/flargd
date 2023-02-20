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

var path = require('node:path');
var glob = require('fast-glob');
var routes = require('./routes.js');
var routesConvention = require('./routesConvention.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);

function flatRoutes(appDirectory, ignoredFilePatterns) {
  let extensions = routesConvention.routeModuleExts.join(",");
  let routePaths = glob__default["default"].sync(`**/*{${extensions}}`, {
    absolute: true,
    cwd: path__default["default"].join(appDirectory, "routes"),
    ignore: ignoredFilePatterns
  });

  // fast-glob will return posix paths even on windows
  // convert posix to os specific paths
  let routePathsForOS = routePaths.map(routePath => {
    return path__default["default"].join(...routePath.split(path__default["default"].posix.sep));
  });
  return flatRoutesUniversal(appDirectory, routePathsForOS);
}
/**
 * Create route configs from a list of routes using the flat routes conventions.
 * @param {string} appDirectory - The absolute root directory the routes were looked up from.
 * @param {string[]} routePaths - The absolute route paths.
 * @param {string} [prefix=routes] - The prefix to strip off of the routes.
 */
function flatRoutesUniversal(appDirectory, routePaths, prefix = "routes") {
  let routeMap = getRouteMap(appDirectory, routePaths, prefix);
  let uniqueRoutes = new Map();
  function defineNestedRoutes(defineRoute, parentId) {
    let childRoutes = Array.from(routeMap.values()).filter(routeInfo => routeInfo.parentId === parentId);
    let parentRoute = parentId ? routeMap.get(parentId) : undefined;
    let parentRoutePath = (parentRoute === null || parentRoute === void 0 ? void 0 : parentRoute.path) ?? "/";
    for (let childRoute of childRoutes) {
      var _childRoute$path;
      let routePath = ((_childRoute$path = childRoute.path) === null || _childRoute$path === void 0 ? void 0 : _childRoute$path.slice(parentRoutePath.length)) ?? "";
      // remove leading slash
      routePath = routePath.replace(/^\//, "");
      let index = childRoute.index;
      let fullPath = childRoute.path;
      let uniqueRouteId = (fullPath || "") + (index ? "?index" : "");
      if (uniqueRouteId) {
        let conflict = uniqueRoutes.get(uniqueRouteId);
        if (conflict) {
          throw new Error(`Path ${JSON.stringify(fullPath)} defined by route ${JSON.stringify(childRoute.id)} conflicts with route ${JSON.stringify(conflict)}`);
        }
        uniqueRoutes.set(uniqueRouteId, childRoute.id);
      }
      if (index) {
        let invalidChildRoutes = Object.values(routeMap).filter(routeInfo => routeInfo.parentId === childRoute.id);
        if (invalidChildRoutes.length > 0) {
          throw new Error(`Child routes are not allowed in index routes. Please remove child routes of ${childRoute.id}`);
        }
        defineRoute(routePath, routeMap.get(childRoute.id).file, {
          index: true
        });
      } else {
        defineRoute(routePath, routeMap.get(childRoute.id).file, () => {
          defineNestedRoutes(defineRoute, childRoute.id);
        });
      }
    }
  }
  let routes$1 = routes.defineRoutes(defineNestedRoutes);
  return routes$1;
}
function isIndexRoute(routeId) {
  let isFlatFile = !routeId.includes(path__default["default"].posix.sep);
  return isFlatFile ? routeId.endsWith("_index") : /\/index$/.test(routeId);
}
function getRouteSegments(routeId) {
  let routeSegments = [];
  let index = 0;
  let routeSegment = "";
  let rawRouteSegment = "";
  let state = "NORMAL";
  let pushRouteSegment = routeSegment => {
    if (!routeSegment) return;
    let notSupportedInRR = (segment, char) => {
      throw new Error(`Route segment "${segment}" for "${routeId}" cannot contain "${char}".\n` + `If this is something you need, upvote this proposal for React Router https://github.com/remix-run/react-router/discussions/9822.`);
    };
    if (rawRouteSegment.includes("*")) {
      return notSupportedInRR(rawRouteSegment, "*");
    }
    if (rawRouteSegment.includes(":")) {
      return notSupportedInRR(rawRouteSegment, ":");
    }
    if (rawRouteSegment.includes("/")) {
      return notSupportedInRR(routeSegment, "/");
    }
    routeSegments.push(routeSegment);
  };
  while (index < routeId.length) {
    let char = routeId[index];
    index++; //advance to next char

    switch (state) {
      case "NORMAL":
        {
          if (routesConvention.isSegmentSeparator(char)) {
            pushRouteSegment(routeSegment);
            routeSegment = "";
            rawRouteSegment = "";
            state = "NORMAL";
            break;
          }
          if (char === routesConvention.escapeStart) {
            state = "ESCAPE";
            break;
          }
          if (char === routesConvention.optionalStart) {
            state = "OPTIONAL";
            break;
          }
          if (!routeSegment && char == routesConvention.paramPrefixChar) {
            if (index === routeId.length) {
              routeSegment += "*";
              rawRouteSegment += char;
            } else {
              routeSegment += ":";
              rawRouteSegment += char;
            }
            break;
          }
          routeSegment += char;
          rawRouteSegment += char;
          break;
        }
      case "ESCAPE":
        {
          if (char === routesConvention.escapeEnd) {
            state = "NORMAL";
            break;
          }
          routeSegment += char;
          rawRouteSegment += char;
          break;
        }
      case "OPTIONAL":
        {
          if (char === routesConvention.optionalEnd) {
            routeSegment += "?";
            rawRouteSegment += "?";
            state = "NORMAL";
            break;
          }
          if (char === routesConvention.escapeStart) {
            state = "OPTIONAL_ESCAPE";
            break;
          }
          if (!routeSegment && char === routesConvention.paramPrefixChar) {
            if (index === routeId.length) {
              routeSegment += "*";
              rawRouteSegment += char;
            } else {
              routeSegment += ":";
              rawRouteSegment += char;
            }
            break;
          }
          routeSegment += char;
          rawRouteSegment += char;
          break;
        }
      case "OPTIONAL_ESCAPE":
        {
          if (char === routesConvention.escapeEnd) {
            state = "OPTIONAL";
            break;
          }
          routeSegment += char;
          rawRouteSegment += char;
          break;
        }
    }
  }

  // process remaining segment
  pushRouteSegment(routeSegment);
  return routeSegments;
}
function findParentRouteId(routeInfo, nameMap) {
  let parentName = routeInfo.segments.slice(0, -1).join("/");
  while (parentName) {
    let parentRoute = nameMap.get(parentName);
    if (parentRoute) return parentRoute.id;
    parentName = parentName.substring(0, parentName.lastIndexOf("/"));
  }
  return undefined;
}
function getRouteInfo(appDirectory, routeDirectory, filePath) {
  let filePathWithoutApp = filePath.slice(appDirectory.length + 1);
  let routeId = routes.createRouteId(filePathWithoutApp);
  let routeIdWithoutRoutes = routeId.slice(routeDirectory.length + 1);
  let index = isIndexRoute(routeIdWithoutRoutes);
  let routeSegments = getRouteSegments(routeIdWithoutRoutes);
  let routePath = createRoutePath(routeSegments, index);
  return {
    id: routeIdWithoutRoutes,
    path: routePath,
    file: filePathWithoutApp,
    name: routeSegments.join("/"),
    segments: routeSegments,
    index
  };
}
function createRoutePath(routeSegments, isIndex) {
  let result = "";
  if (isIndex) {
    routeSegments = routeSegments.slice(0, -1);
  }
  for (let segment of routeSegments) {
    // skip pathless layout segments
    if (segment.startsWith("_")) {
      continue;
    }

    // remove trailing slash
    if (segment.endsWith("_")) {
      segment = segment.slice(0, -1);
    }
    result += `/${segment}`;
  }
  return result || undefined;
}
function getRouteMap(appDirectory, routePaths, prefix = "routes") {
  let routeMap = new Map();
  let nameMap = new Map();
  for (let routePath of routePaths) {
    let routesDirectory = path__default["default"].join(appDirectory, prefix);
    let pathWithoutAppRoutes = routePath.slice(routesDirectory.length + 1);
    if (isRouteModuleFile(pathWithoutAppRoutes)) {
      let routeInfo = getRouteInfo(appDirectory, prefix, routePath);
      routeMap.set(routeInfo.id, routeInfo);
      nameMap.set(routeInfo.name, routeInfo);
    }
  }

  // update parentIds for all routes
  for (let routeInfo of routeMap.values()) {
    let parentId = findParentRouteId(routeInfo, nameMap);
    routeInfo.parentId = parentId;
  }
  return routeMap;
}
function isRouteModuleFile(filepath) {
  // flat files only need correct extension
  let isFlatFile = !filepath.includes(path__default["default"].sep);
  if (isFlatFile) {
    return routesConvention.routeModuleExts.includes(path__default["default"].extname(filepath));
  }
  return isIndexRoute(routes.createRouteId(filepath));
}

exports.createRoutePath = createRoutePath;
exports.flatRoutes = flatRoutes;
exports.flatRoutesUniversal = flatRoutesUniversal;
exports.getRouteSegments = getRouteSegments;
exports.isIndexRoute = isIndexRoute;
