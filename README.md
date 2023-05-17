# Flargd - A fast, edge-based feature flag solution for modern applications 🏎

Flargd is a feature flag application that you can use to implement feature toggling in your application. You can self-host it on Cloudflare Workers, and use it in your edge or serverless application (but not limited to these environments/runtimes).

> ⚠️ Flargd is currently in beta. Expect breaking changes prior to v1.0. You can follow my weekly update [publicly, on Twitter](https://twitter.com/p_mbanugo/status/1616467436919742465).

![Speed test](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pxvkbt5d7h7rdyjc17rp.png)

## Features 💰

- **Fast** ⚡️ Less than 50ms RTT on average
- **Minimal & Lightweight** 🧘🏽‍♀️ Minimalistic API that gets the job done
- **Edge Runtime** ⚙️ Runs close to your users and application
- **Self-hostable** 👩🏽‍💻
- **Multi-project** support: You can configure feature flags for different applications you own
- Admin UI
- Web client/SDK < [1Kb](https://bundlephobia.com/package/@flargd/web)
- React Hooks and other framework integration (Coming soon)

> This project aims to be minimal, lightweight, fast, and easy to deploy and use on Edge and JavaScript runtimes. It's not meant to compete with other feature-flagging software in terms of features. Therefore, you'd likely use a different approach to achieve similar things with Flargd.

## Self Hosting

Flargd is built on Cloudflare Workers and KV. Follow these instructions to deploy to the Workers Platform:

1. Clone this project.
2. Run pnpm install at the project's root directory. _You can use any other package manager you choose_
3. Create a [KV namespace](https://developers.cloudflare.com/workers/wrangler/workers-kv/#create-a-kv-namespace-with-wrangler) and update the `id` in **apps/api/wrangler.toml** for the `FLARGD_STORE` binding.
4. Deploy the API in the **apps/api** directory using wrangler -- `wrangler publish` or `npx wrangler publish` from the _apps/api_ directory.
5. Get the domain/URL for the workers you deployed in step 3. Copy it and replace the `CORE_API` variable value in **apps/admin-ui/wrangler.toml** with your Workers API domain.
6. Deploy the admin UI located in the **apps/admin-ui** directory using wrangler.

> You can deploy with the [wrangler CLI](https://github.com/cloudflare/wrangler2) using the command `npx wrangler publish` (or `pnpm dlx wrangler publish`).

## Quickstart

> This quickstart guide assumes you've already deployed your Flargd workers (API & UI) on Cloudflare Workers.

The first thing to do before using feature flags is to define them. You do that through the admin UI. To access the admin UI, open the URL to the deployed app in your browser. You should be presented with a page that looks like what you see below.

![Flargd UI Console](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mya1ami6vumt62o61yea.png)

You should see an empty table if you're running the app for the first time. Otherwise, you'll see the list of flags and buttons to edit or delete them.

To create a feature flag, click the **Add Flag** button and the top left corner of the page. That should take you to the _create flag_ page. On this page, you can add a flag name and optionally a description. The percentage by default is set to `100`, and setting it to `0` disables the flag. The percentage value determines the ratio of users the flag should be enabled. The _Conditions_ section is optional and it allows you to apply rules to a flag. Each rule must pass for a flag to be evaluated as _active_.

![Flargd - Create Page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bj0ixf9xn6362t9oxdp5.png)

Enter the name `New_About_Page` for the flag and set the percentage to `70`. Click the **Save** but to save the flag. Follow the same steps to create flags for the following values with whatever percentage you like:

- `New_Marketing_Page`
- `New_Product_Page`

### Using The Flags

Let's make use of a basic A/B test Next.js application. You can clone the app from the [official examples repo](https://github.com/pmbanugo/flargd-examples/tree/main/edge-middleware/vercel-basic-ab-test-nextjs). After cloning, copy the `.env.example` file in this directory to `.env.local`:

```bash
cp .env.example .env.local
```

Open `.env.local` and update `EDGE_FLAGS_HOST` to match the domain name for your _Flargd_ API.

Open the terminal and run `npm install` to install the dependencies. Included in the installed dependencies is the [@flargd/web](https://www.npmjs.com/package/@flargd/web) npm package which is used by web clients/apps to access the feature flags.

It provides two methods to retrieve flags using the `get()` and `getMany()` functions. You can see the usage in the **lib/api.ts** file. The `getFeatureFlagVariant()` function first instantiates the client using the `createClient()` function, then it calls `client.get(featureName)` to retrieve the flag.

```typescript
export async function getFeatureFlagVariant(
  featureName: Flags,
  distinctUserId: string
): Promise<FlagValue> {
  if (!distinctUserId) {
    throw new Error(`distinctUserId is required and it can't be empty`);
  }

  const client = createClient({
    host: EDGE_FLAGS_HOST,
    app: EDGE_FLAGS_APP,
    distinctId: distinctUserId,
  });

  const flag = await client.get(featureName);

  return flag.enable;
}
```

The `getFeatureFlagVariant()` function is used in **middleware.ts** at the root of the project. This is where the feature flag is retrieved and the middleware decides where to redirect the user based on the result. When deployed on Vercel, the middleware executes before a request is processed on a site, to provide speed and personalization to your users!

> This is where Flargd shines! 🌟 Your Edge Middleware or Functions, together with your feature flags, runs close to the user, with reduced latency. They run at the same location as your edge functions (Vercel Edge Functions/Middleware, Cloudflare Workers, etc), giving your application an increased speed 🏎⚡️

Start the Next.js application using the command `npm run dev`. Open it in your browser and follow the UI prompt. You can click the **reset** button to reset the feature flag values.

There you have your first application using Flargd 👏🏽

For more examples, check out [github.com/pmbanugo/flargd-examples](https://github.com/pmbanugo/flargd-examples).

For more description about the @flargd/web SDK, check its [documentation](/packages/web/README.md)

## Examples

You'll find most of the examples in [github.com/pmbanugo/flargd-examples](https://github.com/pmbanugo/flargd-examples). Here are a few examples:

- [Vercel Edge Middleware](https://github.com/pmbanugo/flargd-examples/tree/main/edge-functions/vercel-edge-middleware-nextjs): This example shows how to do A/B testing at the edge with Vercel Edge Middleware and Flargd.

There'll be more examples in the near future 👨🏽‍💻

## Admin UI

### Conditions

Conditions are a way to apply rules to the flags. A condition consists of an **attribute**, **condition**, and a set of **values/target**. The attributes include:

1. City: The city of the originating request, for example, `"Munich"`.
1. Country: The two-letter country [code (in ISO 3166-1 Alpha 2 format)](https://www.iso.org/obp/ui/#search/code/) of the user/client. E.g `DE` for Germany.
1. Continent: The continent of the incoming user/client request. This is represented by the continent code such as:
   - AF: Africa
   - AN: Antarctica
   - AS: Asia
   - EU: Europe
   - NA: North America
   - OC: Oceania
   - SA: South America
   - T1: Tor network
1. Postal Code: The postal code associated with the user/client request.
1. Region: The [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) name for the first level region associated with the user/client request, for example, `"Texas"`.
1. IP: The IP of the user/client.

The _condition_ is a way to compare the values in the request, to the values defined for the flag. The _target_ contains the values to compare with the incoming client request. You can add multiple values, separated by a comma.

## Contributing

See the [contribution guide](/CONTRIBUTING.md)

## Roadmap 🚧

Coming soon 🔜

## Author

This project is created by [Peter Mbanugo](https://github.com/pmbanugo)
