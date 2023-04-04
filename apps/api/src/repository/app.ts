interface App {
  name: string;
  description?: string;
}

interface TeamApp {
  team: string;
  apps: App[];
  defaultApp: string;
  createdAt: string;
  updatedAt: string;
}

export const createKey = (team: string) => `team:${team}:apps` as const;

export async function saveApp(
  KV: KVNamespace,
  {
    team,
    name,
    description,
    isDefault,
  }: App & { team: string; isDefault: boolean }
) {
  const key = createKey(team);
  const teamApp = await KV.get<TeamApp>(key, "json");
  if (teamApp) {
    if (teamApp.defaultApp !== name && isDefault) {
      teamApp.defaultApp = name;
    }

    const index = teamApp.apps.findIndex((app) => app.name === name);
    if (index > -1) teamApp.apps[index] = { name, description };
    else teamApp.apps.push({ name, description });

    teamApp.updatedAt = new Date().toISOString();
    return KV.put(key, JSON.stringify(teamApp));
  } else {
    const date = new Date().toISOString();
    const teamApp: TeamApp = {
      team,
      defaultApp: name,
      createdAt: date,
      updatedAt: date,
      apps: [{ name, description }],
    };

    return KV.put(key, JSON.stringify(teamApp));
  }
}

//Side note: delete the related flags after this operation executes.
export function deleteApp(KV: KVNamespace, team: string) {
  return KV.delete(createKey(team));
}

export function getApps(KV: KVNamespace, team: string) {
  return KV.get<TeamApp>(createKey(team), "json");
}

export async function appExist(
  KV: KVNamespace,
  { team, app }: { team: string; app: string }
) {
  const teamApp = await KV.get(createKey(team));
  return !!teamApp?.includes(`"name":"${app}"`);
}
