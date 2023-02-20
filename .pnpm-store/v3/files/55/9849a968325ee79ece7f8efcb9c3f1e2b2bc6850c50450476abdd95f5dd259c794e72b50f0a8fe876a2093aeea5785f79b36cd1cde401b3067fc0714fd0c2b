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
import { redirect } from 'react-router-dom';
import { loadRouteModule } from './routeModules.js';
import { fetchData, isRedirectResponse, isCatchResponse, isDeferredResponse, parseDeferredReadableStream } from './data.js';
import { prefetchStyleLinks } from './links.js';
import invariant from './invariant.js';
import { RemixRoute, RemixRouteError } from './components.js';

function createServerRoutes(manifest, routeModules, future, parentId) {
  return Object.values(manifest).filter(route => route.parentId === parentId).map(route => {
    let hasErrorBoundary = future.v2_errorBoundary === true ? route.id === "root" || route.hasErrorBoundary : route.id === "root" || route.hasCatchBoundary || route.hasErrorBoundary;
    let dataRoute = {
      caseSensitive: route.caseSensitive,
      element: /*#__PURE__*/React.createElement(RemixRoute, {
        id: route.id
      }),
      errorElement: hasErrorBoundary ? /*#__PURE__*/React.createElement(RemixRouteError, {
        id: route.id
      }) : undefined,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModules[route.id].handle
      // Note: we don't need loader/action/shouldRevalidate on these routes
      // since they're for a static render
    };

    let children = createServerRoutes(manifest, routeModules, future, route.id);
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function createClientRoutes(manifest, routeModulesCache, future, parentId) {
  return Object.values(manifest).filter(entryRoute => entryRoute.parentId === parentId).map(route => {
    let hasErrorBoundary = future.v2_errorBoundary === true ? route.id === "root" || route.hasErrorBoundary : route.id === "root" || route.hasCatchBoundary || route.hasErrorBoundary;
    let dataRoute = {
      caseSensitive: route.caseSensitive,
      element: /*#__PURE__*/React.createElement(RemixRoute, {
        id: route.id
      }),
      errorElement: hasErrorBoundary ? /*#__PURE__*/React.createElement(RemixRouteError, {
        id: route.id
      }) : undefined,
      id: route.id,
      index: route.index,
      path: route.path,
      // handle gets added in via useMatches since we aren't guaranteed to
      // have the route module available here
      handle: undefined,
      loader: createDataFunction(route, routeModulesCache, false),
      action: createDataFunction(route, routeModulesCache, true),
      shouldRevalidate: createShouldRevalidate(route, routeModulesCache)
    };
    let children = createClientRoutes(manifest, routeModulesCache, future, route.id);
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function createShouldRevalidate(route, routeModules) {
  return function (arg) {
    let module = routeModules[route.id];
    invariant(module, `Expected route module to be loaded for ${route.id}`);
    if (module.shouldRevalidate) {
      return module.shouldRevalidate(arg);
    }
    return arg.defaultShouldRevalidate;
  };
}
async function loadRouteModuleWithBlockingLinks(route, routeModules) {
  let routeModule = await loadRouteModule(route, routeModules);
  await prefetchStyleLinks(routeModule);
  return routeModule;
}
function createDataFunction(route, routeModules, isAction) {
  return async ({
    request
  }) => {
    let routeModulePromise = loadRouteModuleWithBlockingLinks(route, routeModules);
    try {
      if (isAction && !route.hasAction) {
        let msg = `Route "${route.id}" does not have an action, but you are trying ` + `to submit to it. To fix this, please add an \`action\` function to the route`;
        console.error(msg);
        throw new Error(msg);
      } else if (!isAction && !route.hasLoader) {
        return null;
      }
      let result = await fetchData(request, route.id);
      if (result instanceof Error) {
        throw result;
      }
      if (isRedirectResponse(result)) {
        throw getRedirect(result);
      }
      if (isCatchResponse(result)) {
        throw result;
      }
      if (isDeferredResponse(result) && result.body) {
        return await parseDeferredReadableStream(result.body);
      }
      return result;
    } finally {
      await routeModulePromise;
    }
  };
}
function getRedirect(response) {
  let status = parseInt(response.headers.get("X-Remix-Status"), 10) || 302;
  let url = response.headers.get("X-Remix-Redirect");
  let headers = {};
  let revalidate = response.headers.get("X-Remix-Revalidate");
  if (revalidate) {
    headers["X-Remix-Revalidate"] = revalidate;
  }
  return redirect(url, {
    status,
    headers
  });
}

export { createClientRoutes, createServerRoutes };
