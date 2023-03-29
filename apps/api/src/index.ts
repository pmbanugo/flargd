import { Router } from "itty-router";
import { calculatePercentage, evaluate } from "./evaluation";
import type { FlagPercentage } from "./flag";
import { getCfProperties } from "./util/request";
import type { Env } from "./util/request";
import { json, notFound, text } from "./util/response";
import {
  deleteFlag,
  getFlag,
  getFlags,
  getSelectedFlags,
  saveFlag,
} from "./repository/flag";
import { getApps, saveApp } from "./repository/app";

const router = Router();

router.get("/", () => new Response("Hello! Flargd Edge Feature Flags!"));

/** Create and update a flag */
router.post("/teams/:team/apps/:app/flags/:flag", async (req, env: Env) => {
  try {
    // TODO: validate input
    const { description, percentage } = (await req.json()) as {
      description?: string;
      percentage: FlagPercentage;
    };
    const { app, team, flag: name } = req.params;

    await saveFlag(env.FLARGD_STORE, {
      team,
      app,
      name,
      description,
      percentage,
    });

    return json({ name, description, percentage }, 201);
  } catch (error) {
    console.error({ error });
    return text("Kaboom!", 500); // Refactor later for better error handler/description
  }
});

router.get("/teams/:team/apps/:app/flags", async (req, env: Env) => {
  const { app, team } = req.params;
  try {
    const appFlags: Awaited<ReturnType<typeof getFlags>> = await getFlags(
      env.FLARGD_STORE,
      { team, app }
    );

    return json(appFlags?.flags ?? []);
  } catch (error) {
    console.error({ error });
    return text("Kaboom!", 500);
  }
});

router.get("/teams/:team/apps/:app/flags/:flag", async (req, env: Env) => {
  const { app, flag: name, team } = req.params;

  try {
    const flag = await getFlag(env.FLARGD_STORE, { team, app, name });
    if (flag) {
      return json(flag);
    }

    return notFound();
  } catch (error) {
    console.error({ error });
    return text("Kaboom!", 500);
  }
});

router.delete("/teams/:team/apps/:app/flags/:flag", async (req, env: Env) => {
  const { app, flag: name, team } = req.params;

  try {
    await deleteFlag(env.FLARGD_STORE, { team, app, name });
    return new Response(undefined, { status: 204 });
  } catch (error) {
    console.error({ error });
    return text("Kaboom!", 500);
  }
});

router.get(
  "/teams/:team/apps/:app/evaluations/:identifier?",
  async (req, env: Env) => {
    const { app, identifier, team } = req.params;
    const { flags: flagNames } = req.query;
    if (!flagNames || !Array.isArray(flagNames)) {
      return text("Expected flags search query to be at least 2", 400);
    }
    //TODO: Add check to remove duplicate flag names.

    try {
      const appFlags = await getSelectedFlags(env.FLARGD_STORE, {
        team,
        app,
        flags: flagNames,
      });

      if (appFlags) {
        const cfProperties = getCfProperties(req);
        const userPercentage = await calculatePercentage(identifier);
        const result = appFlags.flags.reduce((flags, currentFlag) => {
          flags[currentFlag.name] = evaluate(
            currentFlag.percentage,
            userPercentage,
            cfProperties
          );

          return flags;
        }, {} as Record<string, ReturnType<typeof evaluate>>);

        return json(result);
      }

      return notFound();
    } catch (error) {
      console.error({ error });
      return text("Kaboom!", 500);
    }
  }
);

router.get(
  "/teams/:team/apps/:app/evaluation/:flag/:identifier?",
  async (req, env: Env) => {
    const { app, flag: name, identifier, team } = req.params;

    try {
      const flag = await getFlag(env.FLARGD_STORE, { team, app, name });

      if (flag) {
        const userPercentage = await calculatePercentage(identifier);
        const evaluation = evaluate(
          flag.percentage,
          userPercentage,
          getCfProperties(req)
        );

        return json<ReturnType<typeof evaluate>>(evaluation);
      }

      return notFound();
    } catch (error) {
      console.error({ error });
      return text("Kaboom!", 500);
    }
  }
);

router.get("/teams/:team/apps", async (req, { FLARGD_STORE }: Env) => {
  const { team } = req.params;
  try {
    const teamApps: Awaited<ReturnType<typeof getApps>> = await getApps(
      FLARGD_STORE,
      team
    );
    if (teamApps) {
      return json({ apps: teamApps.apps, defaultApp: teamApps.defaultApp });
    }
    return notFound();
  } catch (error) {
    console.error({ error });
    return text("Kaboom!", 500);
  }
});

router.post("/teams/:team/apps/:app", async (req, { FLARGD_STORE }: Env) => {
  try {
    // TODO: validate input e.g if isDefault is set, it must be true
    const { description, isDefault } = (await req.json()) as {
      description?: string;
      isDefault?: boolean;
    };
    const { app, team } = req.params;

    await saveApp(FLARGD_STORE, {
      team,
      name: app,
      description,
      isDefault: !!isDefault,
    });

    return json({ name: app, description, isDefault }, 201);
  } catch (error) {
    console.error({ error });
    return text("Kaboom!", 500); // Refactor later for better error handler/description
  }
});

export default {
  fetch: router.handle,
};
