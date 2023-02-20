export declare type GenericTraps = {
    [key: string]: any;
};
export declare type RequestLike = {
    method: string;
    url: string;
} & GenericTraps;
export declare type IRequest = {
    method: string;
    url: string;
    params: {
        [key: string]: string;
    };
    query: {
        [key: string]: string | string[] | undefined;
    };
    proxy?: any;
} & GenericTraps;
export interface RouterOptions {
    base?: string;
    routes?: RouteEntry[];
}
export interface RouteHandler {
    (request: IRequest, ...args: any): any;
}
export declare type RouteEntry = [string, RegExp, RouteHandler[]];
export declare type Route = <T extends RouterType>(path: string, ...handlers: RouteHandler[]) => T;
export declare type RouterHints = {
    all: Route;
    delete: Route;
    get: Route;
    options: Route;
    patch: Route;
    post: Route;
    put: Route;
};
export declare type RouterType = {
    __proto__: RouterType;
    routes: RouteEntry[];
    handle: (request: RequestLike, ...extra: any) => Promise<any>;
} & RouterHints;
export declare const Router: ({ base, routes }?: RouterOptions) => RouterType;
