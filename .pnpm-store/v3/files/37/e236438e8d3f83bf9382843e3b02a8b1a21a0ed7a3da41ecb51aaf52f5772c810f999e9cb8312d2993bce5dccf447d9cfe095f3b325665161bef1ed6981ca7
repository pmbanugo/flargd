import type { StaticHandlerContext } from "@remix-run/router";
import type { AppLoadContext } from "./data";
import type { ServerBuild } from "./build";
export declare type RequestHandler = (request: Request, loadContext?: AppLoadContext) => Promise<Response>;
export declare type CreateRequestHandlerFunction = (build: ServerBuild, mode?: string) => RequestHandler;
export declare const createRequestHandler: CreateRequestHandlerFunction;
export declare function differentiateCatchVersusErrorBoundaries(build: ServerBuild, context: StaticHandlerContext): void;
