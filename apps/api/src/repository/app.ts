interface App {
  name: string;
  description?: string;
  isDefault?: true;
}

interface TeamApp {
  team: string;
  apps: App[];
  createdAt: string;
  updatedAt: string;
}

export const createKey = (team: string) => `team:${team}:apps` as const;

export async function saveApp(
  KV: KVNamespace,
  { team, name, description, isDefault }: App & { team: string }
) {
  const key = createKey(team);
  const teamApp = await KV.get<TeamApp>(key, "json");
  if (teamApp) {
    const apps = isDefault
      ? teamApp.apps
          .filter((app) => app.name !== name)
          .map((app) => {
            if (app.isDefault) {
              return { ...app, isDefault: undefined };
            }
            return app;
          })
      : teamApp.apps.filter((app) => app.name !== name);
    apps.push({ name, description, isDefault });

    const data: TeamApp = {
      team,
      apps,
      createdAt: teamApp.createdAt,
      updatedAt: new Date().toISOString(),
    };
    return KV.put(key, JSON.stringify(data));
  } else {
    const date = new Date().toISOString();
    const teamApp: TeamApp = {
      team,
      createdAt: date,
      updatedAt: date,
      apps: [{ name, description, isDefault: true }],
    };

    return KV.put(key, JSON.stringify(teamApp));
  }
}

export function deleteApp(KV: KVNamespace, team: string) {
  return KV.delete(createKey(team));
}

export function getApps(KV: KVNamespace, team: string) {
  return KV.get<TeamApp>(createKey(team), "json");
}
