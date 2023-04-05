interface Context {
  host?: string;
  app?: string;
  team?: string;
  distinctId?: string;
  userContext?: Record<string, any>;
}

const DEFAULT_HOST = "https://api.flargd.dev";
const DEFAULT_APP = "default";
const DEFAULT_TEAM = "public";

export function createClient(
  context: Context = {
    host: DEFAULT_HOST,
    app: DEFAULT_APP,
    team: DEFAULT_TEAM,
  }
) {
  const host = context.host ?? DEFAULT_HOST,
    app = context.app ?? DEFAULT_APP,
    team = context.team ?? DEFAULT_TEAM,
    distinctId = context.distinctId,
    userContext = context.userContext;

  return {
    /**
     * Returns the evaluation result of a flag.
     *
     * @param flag - The feature flag to retrieve
     * @returns The feature flag
     *
     */
    async get(flag: string) {
      try {
        let url = `${host}/teams/${team}/apps/${app}/evaluation/${flag}`;
        if (distinctId) {
          url = `${url}/${distinctId}`;
        }

        const res = await fetch(url);
        if (!res.ok) {
          console.info(
            `Flargd ⚠️: Fetch request to retrieve the feature [${flag}] failed`
          );
          throw new Error("Flargd: Error Fetching Data");
        }

        return (await res.json()) as { enable: boolean };
      } catch (error) {
        console.error(`Flargd ⚠️: Error fetching the feature flag [${flag}].`);
        return { enable: false, error: true };
      }
    },
    /**
     * Returns the evaluation result of the flags.
     *
     *
     * @param flags - The feature flags to retrieve. There should be at least 2 items in the array
     * @returns The feature flags
     * @throws Throws error if there are less than two items (flag names) in the array
     *
     */
    async getMany(
      flags: string[]
    ): Promise<Record<string, { enable: boolean }> | { error: boolean }> {
      if (!Array.isArray(flags) || flags.length < 2) {
        throw new Error(
          "There should be at least two feature flag names passed as argument"
        );
      }

      try {
        const base = `${host}/teams/${team}/apps/${app}/evaluations${
          distinctId ? "/" + distinctId : ""
        }`;
        const url = new URL(base);
        flags.forEach((name) => url.searchParams.append("flags", name));

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(
            "Flargd: Error Fetching Data. Response status: " + res.status
          );
        }

        return await res.json();
      } catch (error) {
        console.error(
          `Flargd ⚠️: Error fetching the feature flags [${flags}] failed`
        );
        console.info({ error });
        return { error: true };
      }
    },
  };
}
