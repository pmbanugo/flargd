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

var WebSocket = require('ws');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);

let serve = options => {
  let wss = new WebSocket__default["default"].Server({
    port: options.port
  });
  let broadcast = message => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket__default["default"].OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  };
  let reload = () => broadcast({
    type: "RELOAD"
  });
  let log = messageText => {
    let _message = `💿 ${messageText}`;
    console.log(_message);
    broadcast({
      type: "LOG",
      message: _message
    });
  };
  return {
    reload,
    log,
    close: wss.close
  };
};

exports.serve = serve;
