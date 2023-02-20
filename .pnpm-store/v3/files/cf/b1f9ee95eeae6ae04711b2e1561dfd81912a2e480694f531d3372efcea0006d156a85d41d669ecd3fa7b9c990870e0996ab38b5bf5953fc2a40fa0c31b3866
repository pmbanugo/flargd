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

var path = require('path');
var colors = require('../colors.js');
var git = require('./utils/git.js');
var log = require('./utils/log.js');
var task = require('./utils/task.js');
var index = require('./replace-remix-magic-imports/index.js');
var error = require('./utils/error.js');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);

const codemods = {
  "replace-remix-magic-imports": index["default"]
};
const isCodemodName = maybe => Object.keys(codemods).includes(maybe);
const availableCodemodsText = ["Available codemods:", ...Object.keys(codemods).sort().map(name => `- ${name}`)].join("\n");
var runCodemod = (async (projectDir, codemodName, {
  dry = false,
  force = false
} = {}) => {
  if (dry) log.info(`${colors.yellow("! Dry mode")}: files will not be overwritten`);
  if (force) log.info(`${colors.yellow("! Force mode")}: uncommitted changes may be lost`);
  let gitStatus = await git.status(projectDir);
  if (!dry && !force && gitStatus === "not a git repository") {
    throw new error.CodemodError(`${path__namespace.resolve(projectDir)} is not a git repository`, "To override this safety check, use the --force flag");
  }
  if (!dry && !force && gitStatus === "dirty") {
    throw new error.CodemodError(`${path__namespace.resolve(projectDir)} has uncommitted changes`, ["Stash or commit your changes before running codemods", "To override this safety check, use the --force flag"].join("\n"));
  }
  let codemod = await task.task(`Finding codemod: ${colors.blue(codemodName)}`, async () => {
    if (!isCodemodName(codemodName)) {
      throw new error.CodemodError(`Unrecognized codemod: ${colors.blue(codemodName)}`, availableCodemodsText);
    }
    return codemods[codemodName];
  }, `Found codemod: ${colors.blue(codemodName)}`);
  await codemod(projectDir, {
    dry,
    force
  });
});

exports["default"] = runCodemod;
