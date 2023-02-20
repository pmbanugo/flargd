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
import React__default, { useContext } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

class RemixErrorBoundary extends React__default.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: props.error || null,
      location: props.location
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    // When we get into an error state, the user will likely click "back" to the
    // previous page that didn't have an error. Because this wraps the entire
    // application (even the HTML!) that will have no effect--the error page
    // continues to display. This gives us a mechanism to recover from the error
    // when the location changes.
    //
    // Whether we're in an error state or not, we update the location in state
    // so that when we are in an error state, it gets reset when a new location
    // comes in and the user recovers from the error.
    if (state.location !== props.location) {
      return {
        error: props.error || null,
        location: props.location
      };
    }

    // If we're not changing locations, preserve the location but still surface
    // any new errors that may come through. We retain the existing error, we do
    // this because the error provided from the app state may be cleared without
    // the location changing.
    return {
      error: props.error || state.error,
      location: state.location
    };
  }
  render() {
    if (this.state.error) {
      return /*#__PURE__*/React__default.createElement(this.props.component, {
        error: this.state.error
      });
    } else {
      return this.props.children;
    }
  }
}

/**
 * When app's don't provide a root level ErrorBoundary, we default to this.
 */
function RemixRootDefaultErrorBoundary({
  error
}) {
  console.error(error);
  return /*#__PURE__*/React__default.createElement("html", {
    lang: "en"
  }, /*#__PURE__*/React__default.createElement("head", null, /*#__PURE__*/React__default.createElement("meta", {
    charSet: "utf-8"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), /*#__PURE__*/React__default.createElement("title", null, "Application Error!")), /*#__PURE__*/React__default.createElement("body", null, /*#__PURE__*/React__default.createElement("main", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, /*#__PURE__*/React__default.createElement("h1", {
    style: {
      fontSize: "24px"
    }
  }, "Application Error"), /*#__PURE__*/React__default.createElement("pre", {
    style: {
      padding: "2rem",
      background: "hsla(10, 50%, 50%, 0.1)",
      color: "red",
      overflow: "auto"
    }
  }, error.stack)), /*#__PURE__*/React__default.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "💿 Hey developer👋. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            `
    }
  })));
}
function V2_RemixRootDefaultErrorBoundary() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return /*#__PURE__*/React__default.createElement(RemixRootDefaultCatchBoundaryImpl, {
      caught: error
    });
  } else if (error instanceof Error) {
    return /*#__PURE__*/React__default.createElement(RemixRootDefaultErrorBoundary, {
      error: error
    });
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    return /*#__PURE__*/React__default.createElement(RemixRootDefaultErrorBoundary, {
      error: new Error(errorString)
    });
  }
}
let RemixCatchContext = /*#__PURE__*/React__default.createContext(undefined);

/**
 * Returns the status code and thrown response data.
 *
 * @see https://remix.run/route/catch-boundary
 */
function useCatch() {
  return useContext(RemixCatchContext);
}
function RemixCatchBoundary({
  catch: catchVal,
  component: Component,
  children
}) {
  if (catchVal) {
    return /*#__PURE__*/React__default.createElement(RemixCatchContext.Provider, {
      value: catchVal
    }, /*#__PURE__*/React__default.createElement(Component, null));
  }
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, children);
}

/**
 * When app's don't provide a root level CatchBoundary, we default to this.
 */
function RemixRootDefaultCatchBoundary() {
  let caught = useCatch();
  return /*#__PURE__*/React__default.createElement(RemixRootDefaultCatchBoundaryImpl, {
    caught: caught
  });
}
function RemixRootDefaultCatchBoundaryImpl({
  caught
}) {
  return /*#__PURE__*/React__default.createElement("html", {
    lang: "en"
  }, /*#__PURE__*/React__default.createElement("head", null, /*#__PURE__*/React__default.createElement("meta", {
    charSet: "utf-8"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), /*#__PURE__*/React__default.createElement("title", null, "Unhandled Thrown Response!")), /*#__PURE__*/React__default.createElement("body", null, /*#__PURE__*/React__default.createElement("h1", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, caught.status, " ", caught.statusText), /*#__PURE__*/React__default.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "💿 Hey developer👋. You can provide a way better UX than this when your app throws 404s (and other responses). Check out https://remix.run/guides/not-found for more information."
              );
            `
    }
  })));
}

export { RemixCatchBoundary, RemixErrorBoundary, RemixRootDefaultCatchBoundary, RemixRootDefaultErrorBoundary, V2_RemixRootDefaultErrorBoundary, useCatch };
