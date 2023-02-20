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

var t = require('@babel/types');
var _ = require('lodash');
var createTransform = require('../createTransform.js');
var error = require('../utils/error.js');
var _export = require('./utils/export.js');
var remix = require('./utils/remix.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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

var t__namespace = /*#__PURE__*/_interopNamespace(t);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

const createRemixMagicImportReplacer = ({
  runtime,
  adapter
}) => {
  let remixExports = [..._export.getRuntimeExports(runtime), ...(adapter ? _export.getAdapterExports(adapter) : []), ..._export.getRendererExports("react")];
  let _key = ({
    kind,
    name
  }) => `kind:${kind},name:${name}`;
  let remixImportReplacements = new Map(remixExports.map(({
    source,
    kind,
    name
  }) => [_key({
    kind,
    name
  }), {
    source,
    name
  }]));
  return key => remixImportReplacements.get(_key(key));
};

// NOTE: `import { type blah } from "blah"` syntax introduced in TS 4.5
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#type-modifiers-on-import-names
// which we started using in feb 18 2022
// https://github.com/remix-run/remix/pull/2028/files#diff-c4027b59d017e68accdc8974b21bd70721924836b18284a05b5a4944cf463c6fL16
// starting with v1.2.2
// https://github.com/remix-run/remix/blob/v1.2.2/package.json#L102
// which was release on February 21, 2022

const findRemixImportDeclarations = program => {
  let found = [];
  program.traverse({
    ImportDeclaration: path => {
      let source = path.node.source.value;
      if (!remix.isRemixPackage(source)) {
        return;
      }
      found.push(path);
    }
  });
  return found;
};
const flattenRemixImportDeclarations = remixImportDeclarations => {
  let flattened = [];
  remixImportDeclarations.forEach(declaration => {
    let {
      source,
      specifiers
    } = declaration.node;
    // Side-effect imports like `import "remix"` not produced flattened specifiers
    // so they will not contribute to the new Remix import declarations
    specifiers.forEach(specifier => {
      if (t__namespace.isImportDefaultSpecifier(specifier)) {
        throw declaration.buildCodeFrameError("This codemod does not support default imports for the `remix` package.\n" + "Replace the default import with named imports and try again.");
      }
      if (t__namespace.isImportNamespaceSpecifier(specifier)) {
        throw declaration.buildCodeFrameError("This codemod does not support namespace imports for the `remix` package.\n" + "Replace the namespace import with named imports and try again.");
      }
      let {
        imported,
        local,
        importKind
      } = specifier;
      let kind = importKind === "type" || declaration.node.importKind === "type" ? "type" : importKind ?? declaration.node.importKind ?? "value";
      let name = t__namespace.isStringLiteral(imported) ? imported.value : imported.name;
      flattened.push({
        source: source.value,
        kind,
        name,
        alias: local.name === name ? undefined : local.name,
        _declaration: declaration
      });
    });
  });
  return flattened;
};
const convertToNewRemixImports = (currentRemixImports, options) => {
  let replaceRemixMagicImport = createRemixMagicImportReplacer(options);
  return currentRemixImports.map(currentRemixImport => {
    if (currentRemixImport.source !== "remix") {
      return currentRemixImport;
    }
    let newRemixImport = replaceRemixMagicImport({
      kind: currentRemixImport.kind,
      name: currentRemixImport.name
    });
    if (newRemixImport === undefined) {
      throw currentRemixImport._declaration.buildCodeFrameError(`Unrecognized import from 'remix': ` + `${currentRemixImport.kind === "type" ? "type " : ""}${currentRemixImport.name}`);
    }
    return {
      source: newRemixImport.source,
      kind: currentRemixImport.kind,
      name: newRemixImport.name,
      alias: currentRemixImport.alias
    };
  });
};
const groupImportsBySource = imports => {
  let grouped = new Map();
  imports.forEach(imp => {
    let current = grouped.get(imp.source) ?? [];
    grouped.set(imp.source, [...current, imp]);
  });
  return grouped;
};
const plugin = options => babel => {
  let {
    types: t
  } = babel;
  return {
    visitor: {
      Program(program) {
        // find current Remix import declarations
        let currentRemixImportDeclarations = findRemixImportDeclarations(program);

        // check for magic `from "remix"` imports
        let magicRemixImports = currentRemixImportDeclarations.filter(path => path.node.source.value === "remix");
        if (magicRemixImports.length === 0) return;

        // flatten current Remix import declarations to specifiers
        let currentRemixImports = flattenRemixImportDeclarations(currentRemixImportDeclarations);

        // convert current remix imports to new imports
        let newRemixImports = convertToNewRemixImports(currentRemixImports, options);

        // group new imports by source
        let newRemixImportsBySource = Array.from(groupImportsBySource(newRemixImports));

        // create new import declarations
        let newRemixImportDeclarations = ___default["default"].sortBy(newRemixImportsBySource, ([source]) => source).map(([source, specifiers]) => {
          return t.importDeclaration(___default["default"].sortBy(specifiers, ["kind", "name"]).map(spec => {
            if (spec.source !== source) throw new error.CodemodError(`Specifier source '${spec.source}' does not match declaration source '${source}'`);
            return {
              type: "ImportSpecifier",
              local: t.identifier(spec.alias ?? spec.name),
              imported: t.identifier(spec.name),
              importKind: spec.kind
            };
          }), t.stringLiteral(source));
        });

        // add new remix import declarations
        currentRemixImportDeclarations[0].insertAfter(newRemixImportDeclarations);

        // remove old remix import declarations
        currentRemixImportDeclarations.forEach(decl => decl.remove());
      }
    }
  };
};
var replaceRemixImports = (options => createTransform["default"](plugin(options)));

exports["default"] = replaceRemixImports;
