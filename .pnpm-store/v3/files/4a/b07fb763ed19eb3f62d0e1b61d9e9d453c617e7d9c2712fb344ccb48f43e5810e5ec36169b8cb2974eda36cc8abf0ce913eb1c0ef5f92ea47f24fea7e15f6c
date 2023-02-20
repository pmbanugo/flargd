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

var chalk = require('chalk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

// https://no-color.org/
const useColor = chalk__default["default"].supportsColor && !process.env.NO_COLOR;
const identity = x => x;
const safe = style => useColor ? style : identity;
const heading = safe(chalk__default["default"].underline);
const arg = safe(chalk__default["default"].yellowBright);
const error = safe(chalk__default["default"].red);
const warning = safe(chalk__default["default"].yellow);
safe(chalk__default["default"].blue);
const logoBlue = safe(chalk__default["default"].blueBright);
const logoGreen = safe(chalk__default["default"].greenBright);
const logoYellow = safe(chalk__default["default"].yellowBright);
const logoPink = safe(chalk__default["default"].magentaBright);
const logoRed = safe(chalk__default["default"].redBright);

// raw styles
const bold = safe(chalk__default["default"].bold);

// raw colors
const blue = safe(chalk__default["default"].blue);
const cyan = safe(chalk__default["default"].cyan);
const gray = safe(chalk__default["default"].gray);
const red = safe(chalk__default["default"].red);
const yellow = safe(chalk__default["default"].yellow);

exports.arg = arg;
exports.blue = blue;
exports.bold = bold;
exports.cyan = cyan;
exports.error = error;
exports.gray = gray;
exports.heading = heading;
exports.logoBlue = logoBlue;
exports.logoGreen = logoGreen;
exports.logoPink = logoPink;
exports.logoRed = logoRed;
exports.logoYellow = logoYellow;
exports.red = red;
exports.warning = warning;
exports.yellow = yellow;
