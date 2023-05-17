# Flargd - @flargd/web

This is the web client for [Flargd](https://github.com/pmbanugo/flargd). It can be used anywhere JavaScript runs (i.e browsers, Node.js, and any Edge runtime).

## Getting Started

Install the package

```bash
npm i @flargd/web
```

Then you initialise the client:

```javascript
import { createClient } from "@flargd/web";
import { EDGE_FLAGS_HOST } from "./constants"; // EDGE_FLAGS_HOST is a constant value that could be resolved to an environment variable

const client = createClient({ host: EDGE_FLAGS_HOST });
```

The `createClient()` function takes a context object which is used to configure the client. See the next section for more info.

After the client is created, you can retrieve a feature flag using the `get()` method.

```javascript
const flag = await client.get("feature-name");
```

The `get()` function returns an object with a boolean property `enable`. If it resolves to true, then you can enable the feature for the user.

If you want to retrieve more than one flag, you should use `getMany()` or `getAll()` function.

```javascript
const flags = await client.getMany(["feature-1", "feature_2"]);
const allFlags = await client.getAll();
```

The `getAll()` function allows you to evaluate all the flags associated to an app. `getMany()` on the other hand allows you to retrieve a few flags.

See the [examples repo](https://github.com/pmbanugo/flargd-examples) for more code examples.

### Configuration Context

The configuration context has the following shape in TypeScript:

```typescript
interface Context {
  host?: string;
  app?: string;
  team?: string;
  distinctId?: string;
}
```

If `app`, `host`, or `team` are skipped, a default value will be used. For `app`, it defaults to **default**, for `host` it's **https://api.flargd.dev**, while `team` defaults to `public`.

The `distinctId` is optional and has no default. It is used by flargd as part of the evaluation criteria for a flag. If it is present, you are guaranteed to make get the same result each time you call `get()`, `getMany()`, or `getAll()`. If absent, the server generates a random identifier for each call to the `get()` or `getMany()` function. If you want a consistent result, it's advised to initialise with a value for `distinctId`.

You can use a unique identifier for the user, for example, the user ID in your database or the session ID if you want to keep it consistent only for the session. You can also generate and cache a random identifier for the user using `crypto.randomUUID()`
