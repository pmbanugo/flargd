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

var ora = require('ora');
var log = require('./log.js');
var error = require('./error.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ora__default = /*#__PURE__*/_interopDefaultLegacy(ora);

class TaskError extends Error {}
const task = async (start, callback, succeed = start) => {
  let spinner = ora__default["default"](start).start();
  try {
    let result = await callback(spinner);
    spinner.succeed(typeof succeed === "string" ? succeed : succeed(result));
    return result;
  } catch (error$1) {
    if (error$1 instanceof error.CodemodError) {
      spinner.fail(error$1.message);
      if (error$1.additionalInfo) log.info(error$1.additionalInfo);
      throw new TaskError(error$1.message);
    }
    throw error$1;
  }
};

exports.TaskError = TaskError;
exports.task = task;
