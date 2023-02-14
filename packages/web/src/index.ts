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
  return {
    _host: context.host ?? DEFAULT_HOST,
    _app: context.app ?? DEFAULT_APP,
    _distinctId: context.distinctId,
    _userContext: context.userContext,
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
        let url = `${this._host}/apps/${this._app}/flags/${name}/evaluation`;
        if (this._distinctId) {
          url = `${url}/${this._distinctId}`;
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
