import type { Condition } from "~/constant";

// TODO: This flag is the same as the API. Move common types and operations to a shared library
export interface Flag {
  name: string;
  description?: string;
  percentage: FlagPercentage;
  app: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface FlagPercentage {
  amount: number;
  conditions: Condition[];
}
