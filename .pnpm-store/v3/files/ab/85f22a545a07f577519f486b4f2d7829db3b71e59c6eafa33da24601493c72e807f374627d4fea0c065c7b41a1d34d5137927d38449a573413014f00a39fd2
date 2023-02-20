/**
 * @remix-run/dev v1.12.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cacache = require('cacache');

function putJson(cachePath, key, data) {
  return cacache.put(cachePath, key, JSON.stringify(data));
}
function getJson(cachePath, key) {
  return cacache.get(cachePath, key).then(obj => JSON.parse(obj.data.toString("utf-8")));
}

Object.defineProperty(exports, 'get', {
  enumerable: true,
  get: function () { return cacache.get; }
});
Object.defineProperty(exports, 'put', {
  enumerable: true,
  get: function () { return cacache.put; }
});
exports.getJson = getJson;
exports.putJson = putJson;
