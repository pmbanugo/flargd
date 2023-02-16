# Flargd - A fast &amp; minimalist feature flag app that runs on the edge 🏎

Flargd is a feature flag application that you can use to implement feature toggling in your application. You can self-host it on Cloudflare Workers, and use it in your edge or serverless application (but not limited to these environments/runtimes).

> ⚠️ Flargd is currently in beta. Expect breaking changes prior to v1.0. You can follow my weekly update [publicly, on Twitter](https://twitter.com/p_mbanugo/status/1616467436919742465).

## Features 💰

- **Fast** ⚡️ Less than 80ms RTT
- **Minimal & Lightweight** 🧘🏽‍♀️ Minimalistic API that gets the job done
- **Edge Runtime** ⚙️ Runs close to your users and application
- **Self-hostable** 👩🏽‍💻
- **Multi-project** support: You can configure feature flags for different applications you own
- Admin UI
- Web client/SDK
- React Hooks and other framework integration (Coming soon)

> This project aims to be minimal, lightweight, fast, and easy to deploy and use on Edge and JavaScript runtimes. It's not meant to compete with other feature flagging software in terms of features. Therefore, you'd likely use a different approach to achieve similar things with Flargd.

## Hosting

Flargd is built on Cloudflare Workers and KV. Follow these instructions to deploy to Workers Platform:

1. Clone this project.
2. Create a [KV namespace](https://developers.cloudflare.com/workers/wrangler/workers-kv/#create-a-kv-namespace-with-wrangler) and update the `id` in _wrangler.toml_ for the `FLARGD_STORE` binding.
3. Deploy it with the [wrangler CLI](https://github.com/cloudflare/wrangler2) using the command `npx wrangler publish` (or pnpm dlx wrangler publish).

You can try with my [demo URL (https://flargd.pmbanugo.workers.dev/)](https://flargd.pmbanugo.workers.dev/) if you want to experiment without deploying your own Worker. Just make sure to use a unique app name when accessing the API or using the examples. ⚠️ _That API may change its behaviour in the coming weeks but there's already work in progress for a public playground_.

## Examples

You'll find most of the examples in [github.com/pmbanugo/flargd-examples](https://github.com/pmbanugo/flargd-examples). Here are a few examples:

- [Vercel Edge Middleware](https://github.com/pmbanugo/flargd-examples/tree/main/edge-functions/vercel-edge-middleware-nextjs): This example show how to do A/B testing at the edge with Vercel Edge Middleware and Flargd.

There'll be more examples in the near future 👨🏽‍💻

## API Endpoints

AT the core of Flargd are HTTP APIs, everything is just a wrapper/abstraction (👀 client SDKs). Here are the API endpoitns:

### **/apps/:app/flag** - POST

TODO: describe endpoint

### **/apps/:app/flags/:flag** - GET

TODO: describe endpoint

### **/apps/:app/flags/:flagName/evaluation/:identifier?** - GET

TODO: describe endpoint

## Contributing

Contributions are welcome! 💖 I just started this project a few days ago so I don't have any issues open at the moment. I hope to find time in the next few weeks to create them and open them for contributions.

So, feel free to send PR to fix bugs if you find any. If you want to contribute to some features (e.g TS/JS SDK, React hooks, Admin UI, etc), you can open an issue. You can also reach out to me on [Twitter](https://twitter.com/p_mbanugo).
