import { promises } from 'node:fs';
import { m as micromatch_1 } from './vendor-index.57682f0c.js';
import { g as getWorkerState, a as resetModules } from './chunk-mock-date.91595ccd.js';
import { v as vi } from './chunk-utils-import.eb63557e.js';
import { a as envs } from './chunk-env-node.ffd1183b.js';
import { a as setupGlobalEnv, s as startTests, w as withEnv } from './chunk-runtime-setup.8ca273cd.js';
import 'util';
import 'path';
import 'node:path';
import 'picocolors';
import 'local-pkg';
import './chunk-utils-env.4ebb0106.js';
import 'node:url';
import 'std-env';
import './chunk-runtime-chain.07d16eac.js';
import 'chai';
import './vendor-_commonjsHelpers.addc3445.js';
import './chunk-utils-timers.52534f96.js';
import './vendor-index.723a074f.js';
import 'tinyspy';
import './chunk-utils-source-map.832515f7.js';
import './chunk-runtime-rpc.e79efa9a.js';
import 'fs';
import 'node:console';
import 'perf_hooks';
import './chunk-integrations-coverage.18366936.js';
import './chunk-runtime-error.f2062967.js';
import 'vite-node/source-map';

function groupBy(collection, iteratee) {
  return collection.reduce((acc, item) => {
    const key = iteratee(item);
    acc[key] || (acc[key] = []);
    acc[key].push(item);
    return acc;
  }, {});
}
async function run(files, config) {
  await setupGlobalEnv(config);
  const workerState = getWorkerState();
  if (config.browser) {
    workerState.mockMap.clear();
    await startTests(files, config);
    return;
  }
  const filesWithEnv = await Promise.all(files.map(async (file) => {
    var _a, _b;
    const code = await promises.readFile(file, "utf-8");
    let env = (_a = code.match(/@(?:vitest|jest)-environment\s+?([\w-]+)\b/)) == null ? void 0 : _a[1];
    if (!env) {
      for (const [glob, target] of config.environmentMatchGlobs || []) {
        if (micromatch_1.isMatch(file, glob)) {
          env = target;
          break;
        }
      }
    }
    env || (env = config.environment || "node");
    const envOptions = JSON.parse(((_b = code.match(/@(?:vitest|jest)-environment-options\s+?(.+)/)) == null ? void 0 : _b[1]) || "null");
    return {
      file,
      env,
      envOptions: envOptions ? { [env]: envOptions } : null
    };
  }));
  const filesByEnv = groupBy(filesWithEnv, ({ env }) => env);
  const orderedEnvs = envs.concat(
    Object.keys(filesByEnv).filter((env) => !envs.includes(env))
  );
  for (const env of orderedEnvs) {
    const environment = env;
    const files2 = filesByEnv[environment];
    if (!files2 || !files2.length)
      continue;
    globalThis.__vitest_environment__ = environment;
    const filesByOptions = groupBy(files2, ({ envOptions }) => JSON.stringify(envOptions));
    for (const options of Object.keys(filesByOptions)) {
      const files3 = filesByOptions[options];
      if (!files3 || !files3.length)
        continue;
      await withEnv(environment, files3[0].envOptions || config.environmentOptions || {}, async () => {
        for (const { file } of files3) {
          if (config.isolate) {
            workerState.mockMap.clear();
            resetModules(workerState.moduleCache, true);
          }
          workerState.filepath = file;
          await startTests([file], config);
          workerState.filepath = void 0;
          vi.resetConfig();
        }
      });
    }
  }
}

export { run };
