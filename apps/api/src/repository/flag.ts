import type { Flag } from "../flag";

interface AppFlags {
  team: string;
  app: string;
  flags: Flag[];
  createdAt: string;
  updatedAt: string;
}

export const createKey = ({ team, app }: { team: string; app: string }) =>
  `team:${team}:app:${app}:flags` as const;

export async function getFlag(
  KV: KVNamespace,
  { team, app, name }: { team: string; app: string; name: string }
) {
  const appFlags = await KV.get<AppFlags>(createKey({ team, app }), "json");
  return appFlags?.flags.find((flag) => flag.name === name);
}

export function getFlags(
  KV: KVNamespace,
  { team, app }: { team: string; app: string }
) {
  return KV.get<AppFlags>(createKey({ team, app }), "json");
}

export async function getSelectedFlags(
  KV: KVNamespace,
  { team, app, flags }: { team: string; app: string; flags: string[] }
) {
  const appFlags = await getFlags(KV, { team, app });
  if (appFlags) {
    const selectedFlags = new Set(flags);
    appFlags.flags = appFlags.flags.filter(({ name }) =>
      selectedFlags.has(name)
    );
  }

  return appFlags;
}

export async function saveFlag(
  KV: KVNamespace,
  {
    team,
    app,
    name,
    description,
    percentage,
  }: Flag & { team: string; app: string }
) {
  const key = createKey({ team, app });
  const appFlags = await KV.get<AppFlags>(key, "json");

  if (appFlags) {
    const flags = appFlags.flags.filter((flag) => flag.name !== name);
    flags.push({ name, description, percentage });

    const data: AppFlags = {
      team,
      app,
      flags,
      createdAt: appFlags.createdAt,
      updatedAt: new Date().toISOString(),
    };
    return KV.put(key, JSON.stringify(data));
  } else {
    const date = new Date().toISOString();
    const appFlags: AppFlags = {
      team,
      app,
      createdAt: date,
      updatedAt: date,
      flags: [{ name, description, percentage }],
    };

    return KV.put(key, JSON.stringify(appFlags));
  }
}

export async function deleteFlag(
  KV: KVNamespace,
  { team, app, name }: { team: string; app: string; name: string }
) {
  const key = createKey({ team, app });
  const appFlags = await KV.get<AppFlags>(key, "json");

  if (appFlags) {
    return KV.put(
      key,
      JSON.stringify({
        ...appFlags,
        flags: appFlags.flags.filter((flag) => flag.name !== name),
      })
    );
  }
}

export function deleteFlags(
  KV: KVNamespace,
  { team, app }: { team: string; app: string }
) {
  return KV.delete(createKey({ team, app }));
}
