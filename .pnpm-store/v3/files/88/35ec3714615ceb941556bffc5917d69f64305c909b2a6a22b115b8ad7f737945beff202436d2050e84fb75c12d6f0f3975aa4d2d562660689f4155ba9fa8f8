/**
 * @remix-run/server-runtime v1.12.0
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

var setCookieParser = require('set-cookie-parser');

function getDocumentHeadersRR(build, context) {
  let matches = context.errors ? context.matches.slice(0, context.matches.findIndex(m => context.errors[m.route.id]) + 1) : context.matches;
  return matches.reduce((parentHeaders, match) => {
    let {
      id
    } = match.route;
    let routeModule = build.routes[id].module;
    let loaderHeaders = context.loaderHeaders[id] || new Headers();
    let actionHeaders = context.actionHeaders[id] || new Headers();
    let headers = new Headers(routeModule.headers ? typeof routeModule.headers === "function" ? routeModule.headers({
      loaderHeaders,
      parentHeaders,
      actionHeaders
    }) : routeModule.headers : undefined);

    // Automatically preserve Set-Cookie headers that were set either by the
    // loader or by a parent route.
    prependCookies(actionHeaders, headers);
    prependCookies(loaderHeaders, headers);
    prependCookies(parentHeaders, headers);
    return headers;
  }, new Headers());
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie");
  if (parentSetCookieString) {
    let cookies = setCookieParser.splitCookiesString(parentSetCookieString);
    cookies.forEach(cookie => {
      childHeaders.append("Set-Cookie", cookie);
    });
  }
}

exports.getDocumentHeadersRR = getDocumentHeadersRR;
