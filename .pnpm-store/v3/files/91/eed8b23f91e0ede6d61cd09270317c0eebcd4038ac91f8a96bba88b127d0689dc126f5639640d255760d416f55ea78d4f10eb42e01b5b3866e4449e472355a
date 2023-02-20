import type { Adapter, Renderer, Runtime } from "./remix";
export declare type Export<Source extends string = string> = {
    source: Source;
    kind: "type" | "value" | "typeof";
    name: string;
    alias?: string;
};
export declare const getRuntimeExports: (runtime: Runtime) => Export<"@remix-run/node" | "@remix-run/cloudflare">[];
export declare const getAdapterExports: (adapter: Adapter) => Export<"@remix-run/netlify" | "@remix-run/vercel" | "@remix-run/cloudflare-pages" | "@remix-run/cloudflare-workers" | "@remix-run/express" | "@remix-run/architect">[];
export declare const getRendererExports: (renderer: Renderer) => Export<"@remix-run/react">[];
