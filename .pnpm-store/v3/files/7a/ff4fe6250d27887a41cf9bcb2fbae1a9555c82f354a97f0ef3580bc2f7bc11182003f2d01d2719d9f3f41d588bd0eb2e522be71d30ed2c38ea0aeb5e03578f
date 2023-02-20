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

const modes = ["development", "production", "test"];
const parseMode = (raw, fallback) => {
  if (modes.includes(raw)) {
    return raw;
  }
  if (!fallback) {
    throw Error(`Unrecognized mode: '${raw}'`);
  }
  return fallback;
};

exports.parseMode = parseMode;
