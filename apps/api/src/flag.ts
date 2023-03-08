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
  description?: string;
  percentage: FlagPercentage;
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
