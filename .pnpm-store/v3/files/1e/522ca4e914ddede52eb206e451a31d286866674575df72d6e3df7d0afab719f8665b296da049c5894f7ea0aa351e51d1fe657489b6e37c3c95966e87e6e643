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

var execa = require('execa');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var execa__default = /*#__PURE__*/_interopDefaultLegacy(execa);

const TEN_MEBIBYTE = 1024 * 1024 * 10;
const status = async (dir = process.cwd()) => {
  // Simplified version of `sync` method of `is-git-clean` package
  try {
    let gitStatus = await execa__default["default"]("git", ["status", "--porcelain"], {
      cwd: dir,
      encoding: "utf8",
      maxBuffer: TEN_MEBIBYTE
    });
    return gitStatus.stdout === "" ? "clean" : "dirty";
  } catch (error) {
    if (error instanceof Error && error.message.includes("fatal: not a git repository (or any of the parent directories): .git")) {
      return "not a git repository";
    }
    throw error;
  }
};

exports.status = status;
