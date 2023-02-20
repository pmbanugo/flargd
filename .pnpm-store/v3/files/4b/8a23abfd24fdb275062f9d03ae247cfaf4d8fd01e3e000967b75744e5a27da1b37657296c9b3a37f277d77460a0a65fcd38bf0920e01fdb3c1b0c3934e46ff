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

const exportsFromNames = (source, names) => {
  return [...names.type.map(name => ({
    source,
    kind: "type",
    name
  })), ...names.value.map(name => ({
    source,
    kind: "value",
    name
  }))];
};
// Runtimes

const defaultRuntimeExports = {
  type: ["ActionFunction", "AppData", "AppLoadContext", "Cookie", "CookieOptions", "CookieParseOptions", "CookieSerializeOptions", "CookieSignatureOptions", "CreateRequestHandlerFunction", "DataFunctionArgs", "EntryContext", "ErrorBoundaryComponent", "HandleDataRequestFunction", "HandleDocumentRequestFunction", "HeadersFunction", "HtmlLinkDescriptor", "HtmlMetaDescriptor", "LinkDescriptor", "LinksFunction", "LoaderFunction", "MemoryUploadHandlerFilterArgs", "MemoryUploadHandlerOptions", "MetaDescriptor", "MetaFunction", "PageLinkDescriptor", "RequestHandler", "RouteComponent", "RouteHandle", "ServerBuild", "ServerEntryModule", "Session", "SessionData", "SessionIdStorageStrategy", "SessionStorage", "UploadHandler", "UploadHandlerPart"],
  value: ["createCookie", "createCookieSessionStorage", "createMemorySessionStorage", "createRequestHandler", "createSession", "createSessionStorage", "isCookie", "isSession", "json", "MaxPartSizeExceededError", "redirect", "unstable_composeUploadHandlers", "unstable_createMemoryUploadHandler", "unstable_parseMultipartFormData"]
};
const exportNamesByRuntime = {
  cloudflare: {
    value: ["createCloudflareKVSessionStorage", "createWorkersKVSessionStorage"]
  },
  node: {
    type: ["HeadersInit", "RequestInfo", "RequestInit", "ResponseInit"],
    value: ["AbortController", "createFileSessionStorage", "createReadableStreamFromReadable", "fetch", "FormData", "Headers", "installGlobals", "NodeOnDiskFile", "readableStreamToString", "Request", "Response", "unstable_createFileUploadHandler", "writeAsyncIterableToWritable", "writeReadableStreamToWritable"]
  }
};
const getRuntimeExports = runtime => {
  let names = exportNamesByRuntime[runtime];
  return exportsFromNames(`@remix-run/${runtime}`, {
    type: [...defaultRuntimeExports.type, ...(names.type ?? [])],
    value: [...defaultRuntimeExports.value, ...(names.value ?? [])]
  });
};

// Adapters

const defaultAdapterExports = {
  type: ["GetLoadContextFunction", "RequestHandler"],
  value: ["createRequestHandler"]
};
const exportNamesByAdapter = {
  architect: {
    value: ["createArcTableSessionStorage"]
  },
  "cloudflare-pages": {
    type: ["createPagesFunctionHandlerParams"],
    value: ["createPagesFunctionHandler"]
  },
  "cloudflare-workers": {
    value: ["createEventHandler", "handleAsset"]
  },
  express: {},
  netlify: {},
  vercel: {}
};
const getAdapterExports = adapter => {
  let names = exportNamesByAdapter[adapter];
  return exportsFromNames(`@remix-run/${adapter}`, {
    type: [...defaultAdapterExports.type, ...(names.type ?? [])],
    value: [...defaultAdapterExports.value, ...(names.value ?? [])]
  });
};

// Renderers

const exportsByRenderer = {
  react: {
    type: ["FormEncType", "FormMethod", "FormProps", "HtmlLinkDescriptor", "HtmlMetaDescriptor", "LinkProps", "NavLinkProps", "RemixBrowserProps", "RemixServerProps", "SubmitFunction", "SubmitOptions", "ThrownResponse"],
    value: ["Form", "Link", "Links", "LiveReload", "Meta", "NavLink", "Outlet", "PrefetchPageLinks", "RemixBrowser", "RemixServer", "Scripts", "ScrollRestoration", "useActionData", "useBeforeUnload", "useCatch", "useFetcher", "useFetchers", "useFormAction", "useHref", "useLoaderData", "useLocation", "useMatches", "useNavigate", "useNavigationType", "useOutlet", "useOutletContext", "useParams", "useResolvedPath", "useSearchParams", "useSubmit", "useTransition"]
  }
};
const getRendererExports = renderer => {
  let names = exportsByRenderer[renderer];
  return exportsFromNames(`@remix-run/${renderer}`, {
    type: names.type ?? [],
    value: names.value ?? []
  });
};

exports.getAdapterExports = getAdapterExports;
exports.getRendererExports = getRendererExports;
exports.getRuntimeExports = getRuntimeExports;
