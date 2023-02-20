/**
 * @remix-run/react v1.12.0
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

var React = require('react');
var server = require('react-router-dom/server');
var components = require('./components.js');
var errorBoundaries = require('./errorBoundaries.js');
var routes = require('./routes.js');

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

var React__namespace = /*#__PURE__*/_interopNamespace(React);

/**
 * The entry point for a Remix app when it is rendered on the server (in
 * `app/entry.server.js`). This component is used to generate the HTML in the
 * response from the server.
 */
function RemixServer({
  context,
  url,
  abortDelay
}) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  let {
    manifest,
    routeModules,
    serverHandoffString
  } = context;
  let routes$1 = routes.createServerRoutes(manifest.routes, routeModules, context.future);
  let router = server.createStaticRouter(routes$1, context.staticHandlerContext);
  return /*#__PURE__*/React__namespace.createElement(components.RemixContext.Provider, {
    value: {
      manifest,
      routeModules,
      serverHandoffString,
      future: context.future,
      abortDelay
    }
  }, /*#__PURE__*/React__namespace.createElement(errorBoundaries.RemixErrorBoundary, {
    location: router.state.location,
    component: errorBoundaries.RemixRootDefaultErrorBoundary
  }, /*#__PURE__*/React__namespace.createElement(server.StaticRouterProvider, {
    router: router,
    context: context.staticHandlerContext,
    hydrate: false
  })));
}

exports.RemixServer = RemixServer;
