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
import * as React from 'react';
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { RemixContext } from './components.js';
import { RemixErrorBoundary, RemixRootDefaultErrorBoundary } from './errorBoundaries.js';
import { createServerRoutes } from './routes.js';

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
  let routes = createServerRoutes(manifest.routes, routeModules, context.future);
  let router = createStaticRouter(routes, context.staticHandlerContext);
  return /*#__PURE__*/React.createElement(RemixContext.Provider, {
    value: {
      manifest,
      routeModules,
      serverHandoffString,
      future: context.future,
      abortDelay
    }
  }, /*#__PURE__*/React.createElement(RemixErrorBoundary, {
    location: router.state.location,
    component: RemixRootDefaultErrorBoundary
  }, /*#__PURE__*/React.createElement(StaticRouterProvider, {
    router: router,
    context: context.staticHandlerContext,
    hydrate: false
  })));
}

export { RemixServer };
