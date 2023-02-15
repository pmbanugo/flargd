interface Context {
  host?: string;
  app?: string;
  distinctId?: string;
  userContext?: Record<string, any>;
}

const DEFAULT_HOST = "https://api.flargd.dev";
const DEFAULT_APP = "default";

export function createClient(
  context: Context = { host: DEFAULT_HOST, app: DEFAULT_APP }
) {
  const host = context.host ?? DEFAULT_HOST,
    app = context.app ?? DEFAULT_APP,
    distinctId = context.distinctId,
    userContext = context.userContext;

  return {
    /**
     * Returns the evaluation result of a flag.
     *
     *
     * @param name - The name of the feature flag to retrieve
     * @returns The feature flag
     *
     */
    async get(name: string) {
      try {
        let url = `${host}/apps/${app}/flags/${name}/evaluation`;
        if (distinctId) {
          url = `${url}/${distinctId}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          console.info(
            `Flargd ⚠️: Fetch request to retrieve the feature [${name}] failed`
          );
        }

        const data = (await res.json()) as { enable: boolean };

        return data;
      } catch (error) {
        console.error(
          `Flargd ⚠️: Fetch request to retrieve the feature [${name}] failed`
        );
        return { enable: false };
      }
    },
  };
}
