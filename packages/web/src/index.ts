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
        let url = `${host}/apps/${app}/evaluation/${name}`;
        if (distinctId) {
          url = `${url}/${distinctId}`;
        }

        const res = await fetch(url);
        if (!res.ok) {
          console.info(
            `Flargd ⚠️: Fetch request to retrieve the feature [${name}] failed`
          );
          throw new Error("Flargd: Error Fetching Data");
        }

        return (await res.json()) as { enable: boolean };
      } catch (error) {
        console.error(`Flargd ⚠️: Error fetching the feature flag [${name}].`);
        return { enable: false, error: true };
      }
    },
    /**
     * Returns the evaluation result of the flags.
     *
     *
     * @param names - The names of the feature flag to retrieve. There should be at least 2 items in the array
     * @returns The feature flags
     * @throws Throws error if there are less than two items (flag names) in the array
     *
     */
    async getMany(
      names: string[]
    ): Promise<Record<string, { enable: boolean }> | { error: boolean }> {
      if (!Array.isArray(names) || names.length < 2) {
        throw new Error(
          "There should be at least two feature flag names passed as argument"
        );
      }

      try {
        const base = `${host}/apps/${app}/evaluations${
          distinctId ? "/" + distinctId : ""
        }`;
        const url = new URL(base);
        names.forEach((name) => url.searchParams.append("flags", name));

        const res = await fetch(url);

        if (!res.ok) {
          console.info(
            `Flargd ⚠️: Fetch request to retrieve the features [${names}] failed`
          );
          throw new Error("Flargd: Error Fetching Data");
        }

        return await res.json();
      } catch (error) {
        console.error(
          `Flargd ⚠️: Error fetching the feature flags [${names}] failed`
        );
        return { error: true };
      }
    },
  };
}
