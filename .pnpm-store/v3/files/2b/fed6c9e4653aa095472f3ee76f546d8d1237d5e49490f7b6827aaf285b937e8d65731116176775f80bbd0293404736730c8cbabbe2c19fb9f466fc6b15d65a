import { b as resolve, f as distDir, r as relative } from './chunk-utils-env.4ebb0106.js';
import { c as createBirpc } from './vendor-index.783e7f3e.js';
import { workerId } from 'tinypool';
import { ModuleCacheMap } from 'vite-node/client';
import { isPrimitive } from 'vite-node/utils';
import { g as getWorkerState } from './chunk-mock-date.91595ccd.js';
import { e as executeInViteNode } from './chunk-runtime-mocker.66533d65.js';
import { r as rpc } from './chunk-runtime-rpc.e79efa9a.js';
import { p as processError } from './chunk-runtime-error.f2062967.js';
import 'node:url';
import 'path';
import 'std-env';
import 'node:path';
import 'picocolors';
import 'local-pkg';
import 'vite';
import './vendor-index.b0346fe4.js';
import 'acorn';
import 'node:module';
import 'node:fs';
import 'node:assert';
import 'node:process';
import 'node:v8';
import 'node:util';
import './chunk-utils-timers.52534f96.js';
import 'util';
import 'chai';

let _viteNode;
const moduleCache = new ModuleCacheMap();
const mockMap = /* @__PURE__ */ new Map();
async function startViteNode(ctx) {
  if (_viteNode)
    return _viteNode;
  const { config } = ctx;
  const processExit = process.exit;
  process.exit = (code = process.exitCode || 0) => {
    const error = new Error(`process.exit called with "${code}"`);
    rpc().onWorkerExit(error, code);
    return processExit(code);
  };
  function catchError(err, type) {
    var _a;
    const worker = getWorkerState();
    const error = processError(err);
    if (worker.filepath && !isPrimitive(error)) {
      error.VITEST_TEST_NAME = (_a = worker.current) == null ? void 0 : _a.name;
      error.VITEST_TEST_PATH = relative(config.root, worker.filepath);
    }
    rpc().onUnhandledError(error, type);
  }
  process.on("uncaughtException", (e) => catchError(e, "Uncaught Exception"));
  process.on("unhandledRejection", (e) => catchError(e, "Unhandled Rejection"));
  const { run: run2 } = (await executeInViteNode({
    files: [
      resolve(distDir, "entry.js")
    ],
    fetchModule(id) {
      return rpc().fetch(id);
    },
    resolveId(id, importer) {
      return rpc().resolveId(id, importer);
    },
    moduleCache,
    mockMap,
    interopDefault: config.deps.interopDefault,
    root: config.root,
    base: config.base
  }))[0];
  _viteNode = { run: run2 };
  return _viteNode;
}
function init(ctx) {
  if (typeof __vitest_worker__ !== "undefined" && ctx.config.threads && ctx.config.isolate)
    throw new Error(`worker for ${ctx.files.join(",")} already initialized by ${getWorkerState().ctx.files.join(",")}. This is probably an internal bug of Vitest.`);
  const { config, port, workerId: workerId$1 } = ctx;
  process.env.VITEST_WORKER_ID = String(workerId$1);
  process.env.VITEST_POOL_ID = String(workerId);
  globalThis.__vitest_environment__ = config.environment;
  globalThis.__vitest_worker__ = {
    ctx,
    moduleCache,
    config,
    mockMap,
    rpc: createBirpc(
      {},
      {
        eventNames: ["onUserConsoleLog", "onFinished", "onCollected", "onWorkerExit"],
        post(v) {
          port.postMessage(v);
        },
        on(fn) {
          port.addListener("message", fn);
        }
      }
    )
  };
  if (ctx.invalidates) {
    ctx.invalidates.forEach((fsPath) => {
      moduleCache.delete(fsPath);
      moduleCache.delete(`mock:${fsPath}`);
    });
  }
  ctx.files.forEach((i) => moduleCache.delete(i));
}
async function run(ctx) {
  init(ctx);
  const { run: run2 } = await startViteNode(ctx);
  return run2(ctx.files, ctx.config);
}

export { run };
