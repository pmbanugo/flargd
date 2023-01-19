import { Hono } from "hono";
// import {
//   evaluate,
// } from "./evaluation";
import { createFlagKey, Flag } from "./flag";

export interface Env {
  EDGE_FLAGS_EXPO: KVNamespace;
}

export interface FlagPayload {
  flagName: string;
  percentage?: number;
}

// export interface EvaluationResult {
//   evaluation: ReturnType<typeof evaluate>;
//   identifier: number;
// }

const OWNER = "public"; // This should be dynamic

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => c.json("Hello! Flargd Edge Feature Flags!"));

/** Create and update a flag */
app.post("/apps/:app/flag", async ({ env, req, text, json }) => {
  try {
    // TODO: validate input using zod (it might be better to just do it without zod ATM because it's the only place I need validation for now.)
    const { flagName, percentage } = await req.json<FlagPayload>();
    const { app } = req.param();

    //save flag
    const flagKey = createFlagKey({ prefix: OWNER, flagName, app });
    const date = new Date().toISOString();
    const existingFlag = await env.EDGE_FLAGS_EXPO.get<Flag>(flagKey, "json");

    let flag: Flag;
    if (existingFlag) {
      flag = {
        ...existingFlag,
        percentage: percentage ?? 100,
        updatedAt: date,
      };
    } else {
      flag = {
        name: flagName,
        percentage: percentage ?? 100,
        createdAt: date,
        updatedAt: date,
        app,
        owner: OWNER,
      };
    }

    await env.EDGE_FLAGS_EXPO.put(flagKey, JSON.stringify(flag));
    return json(flag, 201);
  } catch (error) {
    console.error({ error });
    return text("Kaboom!", 500); // Refactor later for better error handler/description
  }
});

export default app;
