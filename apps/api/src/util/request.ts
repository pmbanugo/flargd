import type { IRequest } from "itty-router";

export interface Env {
  FLARGD_STORE: KVNamespace;
}

export const CfGeographicProperties = [
  "city",
  "country",
  "continent",
  "postalCode",
  "region",
] as const;

export type CfRequestProperty = typeof CfGeographicProperties[number] | "ip";

// TODO: Consider adding test for this 🥴
export function getCfProperties(req: IRequest) {
  const ip = req.headers.get("CF-Connecting-IP");

  const props = CfGeographicProperties.reduce(
    (prev, current) => ({ ...prev, [current]: req.cf?.[current] }),
    {}
  );
  return { ...props, ip } as Record<CfRequestProperty, string>;
}
