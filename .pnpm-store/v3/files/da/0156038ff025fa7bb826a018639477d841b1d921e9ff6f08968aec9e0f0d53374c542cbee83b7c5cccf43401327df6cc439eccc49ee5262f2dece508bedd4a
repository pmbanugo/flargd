import React from "react";
import type { ErrorResponse, Location } from "@remix-run/router";
import type { CatchBoundaryComponent, ErrorBoundaryComponent } from "./routeModules";
import type { ThrownResponse } from "./errors";
declare type RemixErrorBoundaryProps = React.PropsWithChildren<{
    location: Location;
    component: ErrorBoundaryComponent;
    error?: Error;
}>;
declare type RemixErrorBoundaryState = {
    error: null | Error;
    location: Location;
};
export declare class RemixErrorBoundary extends React.Component<RemixErrorBoundaryProps, RemixErrorBoundaryState> {
    constructor(props: RemixErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    static getDerivedStateFromProps(props: RemixErrorBoundaryProps, state: RemixErrorBoundaryState): {
        error: Error | null;
        location: Location;
    };
    render(): string | number | boolean | React.ReactFragment | JSX.Element | null | undefined;
}
/**
 * When app's don't provide a root level ErrorBoundary, we default to this.
 */
export declare function RemixRootDefaultErrorBoundary({ error }: {
    error: Error;
}): JSX.Element;
export declare function V2_RemixRootDefaultErrorBoundary(): JSX.Element;
/**
 * Returns the status code and thrown response data.
 *
 * @see https://remix.run/route/catch-boundary
 */
export declare function useCatch<Result extends ThrownResponse = ThrownResponse>(): Result;
declare type RemixCatchBoundaryProps = React.PropsWithChildren<{
    component: CatchBoundaryComponent;
    catch?: ErrorResponse;
}>;
export declare function RemixCatchBoundary({ catch: catchVal, component: Component, children, }: RemixCatchBoundaryProps): JSX.Element;
/**
 * When app's don't provide a root level CatchBoundary, we default to this.
 */
export declare function RemixRootDefaultCatchBoundary(): JSX.Element;
export {};
