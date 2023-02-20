import * as React from "react";
import type { LinkProps, NavigationType, Navigator, Params, NavLinkProps, Location, FormProps, SubmitFunction } from "react-router-dom";
import type { SerializeFrom } from "@remix-run/server-runtime";
import type { AppData } from "./data";
import type { EntryContext, RemixContextObject } from "./entry";
import type { PrefetchPageDescriptor } from "./links";
import type { Transition, Fetcher } from "./transition";
export declare const RemixContext: React.Context<RemixContextObject | undefined>;
export declare function RemixEntry(props: {
    context: EntryContext;
    action: NavigationType;
    location: Location;
    navigator: Navigator;
    static?: boolean;
}): JSX.Element;
export declare function RemixRoute({ id }: {
    id: string;
}): JSX.Element;
export declare function RemixRouteError({ id }: {
    id: string;
}): JSX.Element;
/**
 * Defines the prefetching behavior of the link:
 *
 * - "intent": Fetched when the user focuses or hovers the link
 * - "render": Fetched when the link is rendered
 * - "none": Never fetched
 */
declare type PrefetchBehavior = "intent" | "render" | "none";
export interface RemixLinkProps extends LinkProps {
    prefetch?: PrefetchBehavior;
}
export interface RemixNavLinkProps extends NavLinkProps {
    prefetch?: PrefetchBehavior;
}
/**
 * A special kind of `<Link>` that knows whether or not it is "active".
 *
 * @see https://remix.run/components/nav-link
 */
declare let NavLink: React.ForwardRefExoticComponent<RemixNavLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export { NavLink };
/**
 * This component renders an anchor tag and is the primary way the user will
 * navigate around your website.
 *
 * @see https://remix.run/components/link
 */
declare let Link: React.ForwardRefExoticComponent<RemixLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export { Link };
export declare function composeEventHandlers<EventType extends React.SyntheticEvent | Event>(theirHandler: ((event: EventType) => any) | undefined, ourHandler: (event: EventType) => any): (event: EventType) => any;
/**
 * Renders the `<link>` tags for the current routes.
 *
 * @see https://remix.run/components/links
 */
export declare function Links(): JSX.Element;
/**
 * This component renders all of the `<link rel="prefetch">` and
 * `<link rel="modulepreload"/>` tags for all the assets (data, modules, css) of
 * a given page.
 *
 * @param props
 * @param props.page
 * @see https://remix.run/components/prefetch-page-links
 */
export declare function PrefetchPageLinks({ page, ...dataLinkProps }: PrefetchPageDescriptor): JSX.Element | null;
export declare function Meta(): JSX.Element;
export interface AwaitProps<Resolve> {
    children: React.ReactNode | ((value: Awaited<Resolve>) => React.ReactNode);
    errorElement?: React.ReactNode;
    resolve: Resolve;
}
export declare function Await<Resolve>(props: AwaitProps<Resolve>): JSX.Element;
export declare type ScriptProps = Omit<React.HTMLProps<HTMLScriptElement>, "children" | "async" | "defer" | "src" | "type" | "noModule" | "dangerouslySetInnerHTML" | "suppressHydrationWarning">;
/**
 * Renders the `<script>` tags needed for the initial render. Bundles for
 * additional routes are loaded later as needed.
 *
 * @param props Additional properties to add to each script tag that is rendered.
 * In addition to scripts, \<link rel="modulepreload"> tags receive the crossOrigin
 * property if provided.
 *
 * @see https://remix.run/components/scripts
 */
export declare function Scripts(props: ScriptProps): JSX.Element;
export interface RouteMatch {
    /**
     * The id of the matched route
     */
    id: string;
    /**
     * The pathname of the matched route
     */
    pathname: string;
    /**
     * The dynamic parameters of the matched route
     *
     * @see https://remix.run/file-conventions/routes-files#dynamic-route-parameters
     */
    params: Params<string>;
    /**
     * Any route data associated with the matched route
     */
    data: any;
    /**
     * The exported `handle` object of the matched route.
     *
     * @see https://remix.run/route/handle
     */
    handle: undefined | {
        [key: string]: any;
    };
}
export declare function useMatches(): RouteMatch[];
/**
 * Returns the JSON parsed data from the current route's `loader`.
 *
 * @see https://remix.run/hooks/use-loader-data
 */
export declare function useLoaderData<T = AppData>(): SerializeFrom<T>;
/**
 * Returns the JSON parsed data from the current route's `action`.
 *
 * @see https://remix.run/hooks/use-action-data
 */
export declare function useActionData<T = AppData>(): SerializeFrom<T> | undefined;
/**
 * Returns everything you need to know about a page transition to build pending
 * navigation indicators and optimistic UI on data mutations.
 *
 * @see https://remix.run/hooks/use-transition
 */
export declare function useTransition(): Transition;
/**
 * Provides all fetchers currently on the page. Useful for layouts and parent
 * routes that need to provide pending/optimistic UI regarding the fetch.
 *
 * @see https://remix.run/api/remix#usefetchers
 */
export declare function useFetchers(): Fetcher[];
export declare type FetcherWithComponents<TData> = Fetcher<TData> & {
    Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>;
    submit: SubmitFunction;
    load: (href: string) => void;
};
/**
 * Interacts with route loaders and actions without causing a navigation. Great
 * for any interaction that stays on the same page.
 *
 * @see https://remix.run/hooks/use-fetcher
 */
export declare function useFetcher<TData = any>(): FetcherWithComponents<SerializeFrom<TData>>;
export declare const LiveReload: (() => null) | (({ port, timeoutMs, nonce, }: {
    port?: number | undefined;
    timeoutMs?: number | undefined;
    /**
     * @deprecated this property is no longer relevant.
     */
    nonce?: string | undefined;
}) => JSX.Element);
