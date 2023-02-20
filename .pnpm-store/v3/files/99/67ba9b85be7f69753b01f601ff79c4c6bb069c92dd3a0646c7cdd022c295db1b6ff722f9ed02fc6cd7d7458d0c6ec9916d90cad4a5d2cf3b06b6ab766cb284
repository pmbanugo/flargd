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
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { RemixContext } from './components.js';
import { RemixErrorBoundary, RemixRootDefaultErrorBoundary } from './errorBoundaries.js';
import { deserializeErrors } from './errors.js';
import { createClientRoutes } from './routes.js';

/* eslint-disable prefer-let/prefer-let */

let router;

/**
 * The entry point for a Remix app when it is rendered in the browser (in
 * `app/entry.client.js`). This component is used by React to hydrate the HTML
 * that was received from the server.
 */
function RemixBrowser(_props) {
  if (!router) {
    let routes = createClientRoutes(window.__remixManifest.routes, window.__remixRouteModules, window.__remixContext.future);
    let hydrationData = window.__remixContext.state;
    if (hydrationData && hydrationData.errors) {
      hydrationData = {
        ...hydrationData,
        errors: deserializeErrors(hydrationData.errors)
      };
    }
    router = createBrowserRouter(routes, {
      hydrationData
    });
  }

  // We need to include a wrapper RemixErrorBoundary here in case the root error
  // boundary also throws and we need to bubble up outside of the router entirely.
  // Then we need a stateful location here so the user can back-button navigate
  // out of there
  let location = useSyncExternalStore(router.subscribe, () => router.state.location, () => router.state.location);
  return /*#__PURE__*/React.createElement(RemixContext.Provider, {
    value: {
      manifest: window.__remixManifest,
      routeModules: window.__remixRouteModules,
      future: window.__remixContext.future
    }
  }, /*#__PURE__*/React.createElement(RemixErrorBoundary, {
    location: location,
    component: RemixRootDefaultErrorBoundary
  }, /*#__PURE__*/React.createElement(RouterProvider, {
    router: router,
    fallbackElement: null
  })));
}

export { RemixBrowser };
