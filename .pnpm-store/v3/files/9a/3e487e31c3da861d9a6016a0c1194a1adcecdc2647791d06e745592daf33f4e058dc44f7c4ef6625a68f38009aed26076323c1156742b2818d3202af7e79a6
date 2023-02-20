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

class CodemodError extends Error {
  constructor(message, additionalInfo) {
    super(message);

    // Show up in console as `CodemodError`, not just `Error`
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.additionalInfo = additionalInfo;
  }
}

exports.CodemodError = CodemodError;
