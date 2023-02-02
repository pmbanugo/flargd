import type { CfRequestProperty } from "./util/request";

export type Condition =
  | "is"
  | "is_not"
  | "contains"
  | "does_not_contain"
  | "in_list"
  | "not_in_list";

export interface Flag {
  name: string;
  percentage: FlagPercentage;
  app: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface FlagPercentage {
  amount: number;
  conditions: {
    attribute: ContionalAttribute;
    condition: Condition;
    target: string | string[];
  }[];
}

export type ContionalAttribute = CfRequestProperty | "email";

export function createFlagKey({
  prefix = "public",
  app,
  flagName,
}: {
  prefix?: string; //this could be anything, e.g your org name/id (e.g harshicorp)
  app: string;
  flagName: string;
}) {
  return [prefix, app, "flag", flagName].join(":");
}
