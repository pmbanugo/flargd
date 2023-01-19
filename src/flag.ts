export interface Flag {
  name: string;
  percentage: number;
  app: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

// TODO: write test for function
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
