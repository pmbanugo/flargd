'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@babel/core');

const packageIdentifiers = new Set(['@vanilla-extract/css', '@vanilla-extract/recipes']);
const debuggableFunctionConfig = {
  style: {
    maxParams: 2
  },
  createTheme: {
    maxParams: 3
  },
  styleVariants: {
    maxParams: 3,
    hasDebugId: ({
      arguments: args
    }) => core.types.isStringLiteral(args.at(-1)) || core.types.isTemplateLiteral(args.at(-1))
  },
  fontFace: {
    maxParams: 2
  },
  keyframes: {
    maxParams: 2
  },
  createVar: {
    maxParams: 1
  },
  recipe: {
    maxParams: 2
  },
  createContainer: {
    maxParams: 1
  }
};
const styleFunctions = [...Object.keys(debuggableFunctionConfig), 'globalStyle', 'createGlobalTheme', 'createThemeContract', 'globalFontFace', 'globalKeyframes', 'recipe'];
const extractName = node => {
  if (core.types.isObjectProperty(node) && core.types.isIdentifier(node.key)) {
    return node.key.name;
  } else if ((core.types.isVariableDeclarator(node) || core.types.isFunctionDeclaration(node)) && core.types.isIdentifier(node.id)) {
    return node.id.name;
  } else if (core.types.isExportDefaultDeclaration(node)) {
    return 'default';
  } else if (core.types.isVariableDeclarator(node) && core.types.isArrayPattern(node.id) && core.types.isIdentifier(node.id.elements[0])) {
    return node.id.elements[0].name;
  }
};
const getDebugId = path => {
  const firstRelevantParentPath = path.findParent(({
    node
  }) => !(core.types.isCallExpression(node) || core.types.isSequenceExpression(node)));
  if (!firstRelevantParentPath) {
    return;
  }

  // Special case: Handle `export const [themeClass, vars] = createTheme({});`
  // when it's already been compiled into this:
  //
  // var _createTheme = createTheme({}),
  //   _createTheme2 = _slicedToArray(_createTheme, 2),
  //   themeClass = _createTheme2[0],
  //   vars = _createTheme2[1];
  if (core.types.isVariableDeclaration(firstRelevantParentPath.parent) && firstRelevantParentPath.parent.declarations.length === 4) {
    const [themeDeclarator,, classNameDeclarator] = firstRelevantParentPath.parent.declarations;
    if (core.types.isCallExpression(themeDeclarator.init) && core.types.isIdentifier(themeDeclarator.init.callee, {
      name: 'createTheme'
    }) && core.types.isVariableDeclarator(classNameDeclarator) && core.types.isIdentifier(classNameDeclarator.id)) {
      return classNameDeclarator.id.name;
    }
  }
  const relevantParent = firstRelevantParentPath.node;
  if (core.types.isObjectProperty(relevantParent) || core.types.isReturnStatement(relevantParent) || core.types.isArrowFunctionExpression(relevantParent) || core.types.isArrayExpression(relevantParent) || core.types.isSpreadElement(relevantParent)) {
    const names = [];
    path.findParent(({
      node
    }) => {
      const name = extractName(node);
      if (name) {
        names.unshift(name);
      }
      // Traverse all the way to the root
      return false;
    });
    return names.join('_');
  } else {
    return extractName(relevantParent);
  }
};
const getRelevantCall = (node, namespaceImport, importIdentifiers) => {
  const {
    callee
  } = node;
  if (namespaceImport && core.types.isMemberExpression(callee) && core.types.isIdentifier(callee.object, {
    name: namespaceImport
  })) {
    return styleFunctions.find(exportName => core.types.isIdentifier(callee.property, {
      name: exportName
    }));
  } else {
    const importInfo = Array.from(importIdentifiers.entries()).find(([identifier]) => core.types.isIdentifier(callee, {
      name: identifier
    }));
    if (importInfo) {
      return importInfo[1];
    }
  }
};
function index () {
  return {
    pre() {
      this.importIdentifiers = new Map();
      this.namespaceImport = '';
    },
    visitor: {
      ImportDeclaration(path) {
        if (packageIdentifiers.has(path.node.source.value)) {
          path.node.specifiers.forEach(specifier => {
            if (core.types.isImportNamespaceSpecifier(specifier)) {
              this.namespaceImport = specifier.local.name;
            } else if (core.types.isImportSpecifier(specifier)) {
              const {
                imported,
                local
              } = specifier;
              const importName = core.types.isIdentifier(imported) ? imported.name : imported.value;
              if (styleFunctions.includes(importName)) {
                this.importIdentifiers.set(local.name, importName);
              }
            }
          });
        }
      },
      CallExpression(path) {
        const {
          node
        } = path;
        const usedExport = getRelevantCall(node, this.namespaceImport, this.importIdentifiers);
        if (usedExport && usedExport in debuggableFunctionConfig) {
          const {
            maxParams,
            hasDebugId
          } = debuggableFunctionConfig[usedExport];
          if (node.arguments.length < maxParams && !(hasDebugId !== null && hasDebugId !== void 0 && hasDebugId(node))) {
            const debugIdent = getDebugId(path);
            if (debugIdent) {
              node.arguments.push(core.types.stringLiteral(debugIdent));
            }
          }
        }
      }
    }
  };
}

exports["default"] = index;
