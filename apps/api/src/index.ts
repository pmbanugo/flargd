import { Router } from "itty-router";
import { calculatePercentage, evaluate } from "./evaluation";
import { createFlagKey } from "./flag";
import type { Flag, FlagPercentage } from "./flag";
import { getCfProperties } from "./util/request";
import type { Env } from "./util/request";
import { json, notFound, text } from "./util/response";

interface FlagPayload {
  flagName: string;
  description?: string;
  percentage: FlagPercentage;
}

type Metadata = Omit<Flag, "percentage" | "owner" | "app"> & {
  percentage: number;
};

const OWNER = "public"; // TODO: This should be dynamic

const router = Router();

router.get("/", () => new Response("Hello! Flargd Edge Feature Flags!"));

/** Create and update a flag */
router.post("/apps/:app/flag", async (req, env: Env) => {
  try {
    // TODO: validate input
    const { flagName, description, percentage } =
      (await req.json()) as FlagPayload;
    const { app } = req.params;

    const flagKey = createFlagKey({ prefix: OWNER, flagName, app });
    const date = new Date().toISOString();
    const { value: existingFlag, metadata: existingMeta } =
      await env.FLARGD_STORE.getWithMetadata<Flag, Metadata>(flagKey, "json");

    let flag: Flag;
    let metadata: Metadata;

    if (existingFlag && existingMeta) {
      metadata = {
        ...existingMeta,
        percentage: percentage.amount,
        description,
        updatedAt: date,
      };
      flag = {
        ...existingFlag,
        percentage,
        description,
        updatedAt: date,
      };
    } else {
      metadata = {
        name: flagName,
        description,
        percentage: percentage.amount,
        createdAt: date,
        updatedAt: date,
      };

      flag = { ...metadata, percentage, app, owner: OWNER };
    }

    await env.FLARGD_STORE.put(flagKey, JSON.stringify(flag), { metadata });
    return json(flag, 201);
  } catch (error) {
    console.error({ error });
    return text("Kaboom!", 500); // Refactor later for better error handler/description
  }
});

router.get("/apps/:app/flags", async (req, env: Env) => {
  const { app } = req.params;
  const prefix = `${OWNER}:${app}:`;

  try {
    const { keys } = await env.FLARGD_STORE.list<Metadata>({ prefix });

    return json(
      keys.map(
        ({ metadata }) =>
          metadata && {
            name: metadata.name,
            description: metadata.description,
            createdAt: metadata.createdAt,
            percentage: metadata.percentage,
          }
      )
    );
  } catch (error) {
    console.error({ error });

    return text("Kaboom!", 500);
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

router.delete("/apps/:app/flags/:flagName", async (req, env: Env) => {
  const { app, flagName } = req.params;
  const flagKey = createFlagKey({ prefix: OWNER, flagName, app });

  try {
    await env.FLARGD_STORE.delete(flagKey);
    return new Response(undefined, { status: 204 });
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
