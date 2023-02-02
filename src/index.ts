import { Router } from "itty-router";
import { calculatePercentage, evaluate } from "./evaluation";
import { createFlagKey, Flag, FlagPercentage } from "./flag";
import { getCfProperties } from "./util/request";
import type { Env } from "./util/request";
import { json, notFound, text } from "./util/response";

interface FlagPayload {
  flagName: string;
  percentage: FlagPercentage;
}

const OWNER = "public"; // This should be dynamic

const router = Router();

router.get("/", () => new Response("Hello! Flargd Edge Feature Flags!"));

/** Create and update a flag */
router.post("/apps/:app/flag", async (req, env: Env) => {
  try {
    // TODO: validate input
    const { flagName, percentage } = (await req.json()) as FlagPayload;
    const { app } = req.params;

    const flagKey = createFlagKey({ prefix: OWNER, flagName, app });
    const date = new Date().toISOString();
    const existingFlag = await env.FLARGD_STORE.get<Flag>(flagKey, "json");

    let flag: Flag;
    if (existingFlag) {
      flag = {
        ...existingFlag,
        percentage,
        updatedAt: date,
      };
    } else {
      flag = {
        name: flagName,
        percentage,
        createdAt: date,
        updatedAt: date,
        app,
        owner: OWNER,
      };
    }

    await env.FLARGD_STORE.put(flagKey, JSON.stringify(flag));
    return json(flag, 201);
  } catch (error) {
    console.error({ error });
    return text("Kaboom!", 500); // Refactor later for better error handler/description
  }
});

router.get("/apps/:app/flags/:flagName", async (req, env: Env) => {
  const { app, flagName } = req.params;
  const flagKey = createFlagKey({ prefix: OWNER, flagName, app });

  try {
    const flag = await env.FLARGD_STORE.get<Flag>(flagKey, "json");

    if (flag) {
      return json(flag);
    }

    return notFound();
  } catch (error) {
    console.error({ error });

    return text("Kaboom!", 500);
  }
});

router.get(
  "/apps/:app/flags/:flagName/evaluation/:identifier?",
  async (req, env: Env) => {
    const { app, flagName, identifier: requestIdentifier } = req.params;
    const flagKey = createFlagKey({ prefix: OWNER, flagName, app });

    try {
      const cacheTtl = 300; // TODO: make this configurable at runtime
      const options: KVNamespaceGetOptions<"json"> = { cacheTtl, type: "json" };
      const flag = await env.FLARGD_STORE.get<Flag>(flagKey, options);

      if (flag) {
        const userPercentage = await calculatePercentage(requestIdentifier);
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

export default {
  fetch: router.handle,
};
