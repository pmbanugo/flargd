import { j as join, c as basename, d as dirname, r as relative, e as extname, b as resolve, f as distDir, g as rootDir, h as isAbsolute, i as isNode, k as configFiles, l as defaultPort, n as normalize, t as toNamespacedPath, E as EXIT_CODE_RESTART } from './chunk-utils-env.4ebb0106.js';
import { p as pLimit, g as generateHash, c as calculateSuiteHash, s as someTasksAreOnly, i as interpretTaskModes, a as getCoverageProvider, C as CoverageProviderMap } from './chunk-integrations-coverage.18366936.js';
import { g as getEnvPackageName } from './chunk-env-node.ffd1183b.js';
import { y as ensurePackageInstalled, z as getTasks, A as AggregateErrorPonyfill, s as slash$1, k as relativePath, B as getTests, e as getFullName, u as hasFailed, C as hasFailedSnapshot, D as getSuites, j as notNullish, l as shuffle, t as toArray, n as noop$1, E as deepMerge, b as getCallLastIndex, F as removeUndefinedValues, G as isWindows, H as stdout } from './chunk-mock-date.91595ccd.js';
import { loadConfigFromFile, normalizePath, createServer, mergeConfig } from 'vite';
import path$8 from 'node:path';
import url, { fileURLToPath } from 'node:url';
import process$1 from 'node:process';
import fs$8, { promises, existsSync } from 'node:fs';
import k from 'path';
import require$$0 from 'os';
import { m as micromatch_1 } from './vendor-index.57682f0c.js';
import require$$0$1 from 'stream';
import require$$2 from 'events';
import require$$0$2, { existsSync as existsSync$1, readFileSync } from 'fs';
import { c as commonjsGlobal } from './vendor-_commonjsHelpers.addc3445.js';
import c from 'picocolors';
import { ViteNodeRunner } from 'vite-node/client';
import { ViteNodeServer } from 'vite-node/server';
import { writeFile, rm } from 'node:fs/promises';
import { e as execa } from './vendor-index.451e37bc.js';
import { SourceMapConsumer } from 'source-map';
import K, { createRequire } from 'module';
import { parse } from 'acorn';
import { ancestor } from 'acorn-walk';
import { MessageChannel } from 'node:worker_threads';
import { cpus, hostname } from 'node:os';
import { Tinypool } from 'tinypool';
import { c as createBirpc } from './vendor-index.783e7f3e.js';
import { performance } from 'perf_hooks';
import { s as stripAnsi, c as cliTruncate, b as parseStacktrace, d as stringWidth, e as sliceAnsi, a as positionToOffset, l as lineSplitRE } from './chunk-utils-source-map.832515f7.js';
import { g as safeSetInterval, h as safeClearInterval, s as safeSetTimeout, d as ansiStyles, c as createPatch, a as stringify, b as safeClearTimeout } from './chunk-utils-timers.52534f96.js';
import { isCI } from 'std-env';
import { resolveModule } from 'local-pkg';
import { createHash } from 'crypto';
import { slash as slash$2, cleanUrl } from 'vite-node/utils';
import { o as onetime } from './vendor-index.9c919048.js';
import { s as signalExit } from './vendor-index.e6c27006.js';
import { createHash as createHash$1 } from 'node:crypto';
import MagicString from './chunk-magic-string.3a794426.js';
import { stripLiteral } from 'strip-literal';
import require$$0$3 from 'readline';
import { p as prompts } from './vendor-index.9f20a9be.js';

var version$1 = "0.27.3";

class EndError extends Error {
	constructor(value) {
		super();
		this.value = value;
	}
}

// The input can also be a promise, so we await it.
const testElement = async (element, tester) => tester(await element);

// The input can also be a promise, so we `Promise.all()` them both.
const finder = async element => {
	const values = await Promise.all(element);
	if (values[1] === true) {
		throw new EndError(values[0]);
	}

	return false;
};

async function pLocate(
	iterable,
	tester,
	{
		concurrency = Number.POSITIVE_INFINITY,
		preserveOrder = true,
	} = {},
) {
	const limit = pLimit(concurrency);

	// Start all the promises concurrently with optional limit.
	const items = [...iterable].map(element => [element, limit(testElement, element, tester)]);

	// Check the promises either serially or concurrently.
	const checkLimit = pLimit(preserveOrder ? 1 : Number.POSITIVE_INFINITY);

	try {
		await Promise.all(items.map(element => checkLimit(finder, element)));
	} catch (error) {
		if (error instanceof EndError) {
			return error.value;
		}

		throw error;
	}
}

const typeMappings = {
	directory: 'isDirectory',
	file: 'isFile',
};

function checkType(type) {
	if (Object.hasOwnProperty.call(typeMappings, type)) {
		return;
	}

	throw new Error(`Invalid type specified: ${type}`);
}

const matchType = (type, stat) => stat[typeMappings[type]]();

const toPath$1 = urlOrPath => urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath;

async function locatePath(
	paths,
	{
		cwd = process$1.cwd(),
		type = 'file',
		allowSymlinks = true,
		concurrency,
		preserveOrder,
	} = {},
) {
	checkType(type);
	cwd = toPath$1(cwd);

	const statFunction = allowSymlinks ? promises.stat : promises.lstat;

	return pLocate(paths, async path_ => {
		try {
			const stat = await statFunction(path$8.resolve(cwd, path_));
			return matchType(type, stat);
		} catch {
			return false;
		}
	}, {concurrency, preserveOrder});
}

const toPath = urlOrPath => urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath;

const findUpStop = Symbol('findUpStop');

async function findUpMultiple(name, options = {}) {
	let directory = path$8.resolve(toPath(options.cwd) || '');
	const {root} = path$8.parse(directory);
	const stopAt = path$8.resolve(directory, options.stopAt || root);
	const limit = options.limit || Number.POSITIVE_INFINITY;
	const paths = [name].flat();

	const runMatcher = async locateOptions => {
		if (typeof name !== 'function') {
			return locatePath(paths, locateOptions);
		}

		const foundPath = await name(locateOptions.cwd);
		if (typeof foundPath === 'string') {
			return locatePath([foundPath], locateOptions);
		}

		return foundPath;
	};

	const matches = [];
	// eslint-disable-next-line no-constant-condition
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const foundPath = await runMatcher({...options, cwd: directory});

		if (foundPath === findUpStop) {
			break;
		}

		if (foundPath) {
			matches.push(path$8.resolve(directory, foundPath));
		}

		if (directory === stopAt || matches.length >= limit) {
			break;
		}

		directory = path$8.dirname(directory);
	}

	return matches;
}

async function findUp(name, options = {}) {
	const matches = await findUpMultiple(name, {...options, limit: 1});
	return matches[0];
}

var tasks = {};

var utils$b = {};

var array$1 = {};

Object.defineProperty(array$1, "__esModule", { value: true });
array$1.splitWhen = array$1.flatten = void 0;
function flatten(items) {
    return items.reduce((collection, item) => [].concat(collection, item), []);
}
array$1.flatten = flatten;
function splitWhen(items, predicate) {
    const result = [[]];
    let groupIndex = 0;
    for (const item of items) {
        if (predicate(item)) {
            groupIndex++;
            result[groupIndex] = [];
        }
        else {
            result[groupIndex].push(item);
        }
    }
    return result;
}
array$1.splitWhen = splitWhen;

var errno$1 = {};

Object.defineProperty(errno$1, "__esModule", { value: true });
errno$1.isEnoentCodeError = void 0;
function isEnoentCodeError(error) {
    return error.code === 'ENOENT';
}
errno$1.isEnoentCodeError = isEnoentCodeError;

var fs$7 = {};

Object.defineProperty(fs$7, "__esModule", { value: true });
fs$7.createDirentFromStats = void 0;
class DirentFromStats$1 {
    constructor(name, stats) {
        this.name = name;
        this.isBlockDevice = stats.isBlockDevice.bind(stats);
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
        this.isDirectory = stats.isDirectory.bind(stats);
        this.isFIFO = stats.isFIFO.bind(stats);
        this.isFile = stats.isFile.bind(stats);
        this.isSocket = stats.isSocket.bind(stats);
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
    }
}
function createDirentFromStats$1(name, stats) {
    return new DirentFromStats$1(name, stats);
}
fs$7.createDirentFromStats = createDirentFromStats$1;

var path$7 = {};

Object.defineProperty(path$7, "__esModule", { value: true });
path$7.removeLeadingDotSegment = path$7.escape = path$7.makeAbsolute = path$7.unixify = void 0;
const path$6 = k;
const LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2; // ./ or .\\
const UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g;
/**
 * Designed to work only with simple paths: `dir\\file`.
 */
function unixify(filepath) {
    return filepath.replace(/\\/g, '/');
}
path$7.unixify = unixify;
function makeAbsolute(cwd, filepath) {
    return path$6.resolve(cwd, filepath);
}
path$7.makeAbsolute = makeAbsolute;
function escape(pattern) {
    return pattern.replace(UNESCAPED_GLOB_SYMBOLS_RE, '\\$2');
}
path$7.escape = escape;
function removeLeadingDotSegment(entry) {
    // We do not use `startsWith` because this is 10x slower than current implementation for some cases.
    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
    if (entry.charAt(0) === '.') {
        const secondCharactery = entry.charAt(1);
        if (secondCharactery === '/' || secondCharactery === '\\') {
            return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
        }
    }
    return entry;
}
path$7.removeLeadingDotSegment = removeLeadingDotSegment;

var pattern$1 = {};

/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isExtglob$1 = function isExtglob(str) {
  if (typeof str !== 'string' || str === '') {
    return false;
  }

  var match;
  while ((match = /(\\).|([@?!+*]\(.*\))/g.exec(str))) {
    if (match[2]) return true;
    str = str.slice(match.index + match[0].length);
  }

  return false;
};

/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isExtglob = isExtglob$1;
var chars = { '{': '}', '(': ')', '[': ']'};
var strictCheck = function(str) {
  if (str[0] === '!') {
    return true;
  }
  var index = 0;
  var pipeIndex = -2;
  var closeSquareIndex = -2;
  var closeCurlyIndex = -2;
  var closeParenIndex = -2;
  var backSlashIndex = -2;
  while (index < str.length) {
    if (str[index] === '*') {
      return true;
    }

    if (str[index + 1] === '?' && /[\].+)]/.test(str[index])) {
      return true;
    }

    if (closeSquareIndex !== -1 && str[index] === '[' && str[index + 1] !== ']') {
      if (closeSquareIndex < index) {
        closeSquareIndex = str.indexOf(']', index);
      }
      if (closeSquareIndex > index) {
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
        backSlashIndex = str.indexOf('\\', index);
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
      }
    }

    if (closeCurlyIndex !== -1 && str[index] === '{' && str[index + 1] !== '}') {
      closeCurlyIndex = str.indexOf('}', index);
      if (closeCurlyIndex > index) {
        backSlashIndex = str.indexOf('\\', index);
        if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
          return true;
        }
      }
    }

    if (closeParenIndex !== -1 && str[index] === '(' && str[index + 1] === '?' && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ')') {
      closeParenIndex = str.indexOf(')', index);
      if (closeParenIndex > index) {
        backSlashIndex = str.indexOf('\\', index);
        if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
          return true;
        }
      }
    }

    if (pipeIndex !== -1 && str[index] === '(' && str[index + 1] !== '|') {
      if (pipeIndex < index) {
        pipeIndex = str.indexOf('|', index);
      }
      if (pipeIndex !== -1 && str[pipeIndex + 1] !== ')') {
        closeParenIndex = str.indexOf(')', pipeIndex);
        if (closeParenIndex > pipeIndex) {
          backSlashIndex = str.indexOf('\\', pipeIndex);
          if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
            return true;
          }
        }
      }
    }

    if (str[index] === '\\') {
      var open = str[index + 1];
      index += 2;
      var close = chars[open];

      if (close) {
        var n = str.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }

      if (str[index] === '!') {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};

var relaxedCheck = function(str) {
  if (str[0] === '!') {
    return true;
  }
  var index = 0;
  while (index < str.length) {
    if (/[*?{}()[\]]/.test(str[index])) {
      return true;
    }

    if (str[index] === '\\') {
      var open = str[index + 1];
      index += 2;
      var close = chars[open];

      if (close) {
        var n = str.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }

      if (str[index] === '!') {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};

var isGlob$1 = function isGlob(str, options) {
  if (typeof str !== 'string' || str === '') {
    return false;
  }

  if (isExtglob(str)) {
    return true;
  }

  var check = strictCheck;

  // optionally relax check
  if (options && options.strict === false) {
    check = relaxedCheck;
  }

  return check(str);
};

var isGlob = isGlob$1;
var pathPosixDirname = k.posix.dirname;
var isWin32 = require$$0.platform() === 'win32';

var slash = '/';
var backslash = /\\/g;
var enclosure = /[\{\[].*[\}\]]$/;
var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;

/**
 * @param {string} str
 * @param {Object} opts
 * @param {boolean} [opts.flipBackslashes=true]
 * @returns {string}
 */
var globParent$1 = function globParent(str, opts) {
  var options = Object.assign({ flipBackslashes: true }, opts);

  // flip windows path separators
  if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
    str = str.replace(backslash, slash);
  }

  // special case for strings ending in enclosure containing path separator
  if (enclosure.test(str)) {
    str += slash;
  }

  // preserves full path in case of trailing path separator
  str += 'a';

  // remove path parts that are globby
  do {
    str = pathPosixDirname(str);
  } while (isGlob(str) || globby.test(str));

  // remove escape chars and return result
  return str.replace(escaped, '$1');
};

Object.defineProperty(pattern$1, "__esModule", { value: true });
pattern$1.matchAny = pattern$1.convertPatternsToRe = pattern$1.makeRe = pattern$1.getPatternParts = pattern$1.expandBraceExpansion = pattern$1.expandPatternsWithBraceExpansion = pattern$1.isAffectDepthOfReadingPattern = pattern$1.endsWithSlashGlobStar = pattern$1.hasGlobStar = pattern$1.getBaseDirectory = pattern$1.isPatternRelatedToParentDirectory = pattern$1.getPatternsOutsideCurrentDirectory = pattern$1.getPatternsInsideCurrentDirectory = pattern$1.getPositivePatterns = pattern$1.getNegativePatterns = pattern$1.isPositivePattern = pattern$1.isNegativePattern = pattern$1.convertToNegativePattern = pattern$1.convertToPositivePattern = pattern$1.isDynamicPattern = pattern$1.isStaticPattern = void 0;
const path$5 = k;
const globParent = globParent$1;
const micromatch = micromatch_1;
const GLOBSTAR = '**';
const ESCAPE_SYMBOL = '\\';
const COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
const REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/;
const REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/;
const GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/;
const BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./;
function isStaticPattern(pattern, options = {}) {
    return !isDynamicPattern(pattern, options);
}
pattern$1.isStaticPattern = isStaticPattern;
function isDynamicPattern(pattern, options = {}) {
    /**
     * A special case with an empty string is necessary for matching patterns that start with a forward slash.
     * An empty string cannot be a dynamic pattern.
     * For example, the pattern `/lib/*` will be spread into parts: '', 'lib', '*'.
     */
    if (pattern === '') {
        return false;
    }
    /**
     * When the `caseSensitiveMatch` option is disabled, all patterns must be marked as dynamic, because we cannot check
     * filepath directly (without read directory).
     */
    if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
        return true;
    }
    if (COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) {
        return true;
    }
    if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
        return true;
    }
    if (options.braceExpansion !== false && hasBraceExpansion(pattern)) {
        return true;
    }
    return false;
}
pattern$1.isDynamicPattern = isDynamicPattern;
function hasBraceExpansion(pattern) {
    const openingBraceIndex = pattern.indexOf('{');
    if (openingBraceIndex === -1) {
        return false;
    }
    const closingBraceIndex = pattern.indexOf('}', openingBraceIndex + 1);
    if (closingBraceIndex === -1) {
        return false;
    }
    const braceContent = pattern.slice(openingBraceIndex, closingBraceIndex);
    return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent);
}
function convertToPositivePattern(pattern) {
    return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
}
pattern$1.convertToPositivePattern = convertToPositivePattern;
function convertToNegativePattern(pattern) {
    return '!' + pattern;
}
pattern$1.convertToNegativePattern = convertToNegativePattern;
function isNegativePattern(pattern) {
    return pattern.startsWith('!') && pattern[1] !== '(';
}
pattern$1.isNegativePattern = isNegativePattern;
function isPositivePattern(pattern) {
    return !isNegativePattern(pattern);
}
pattern$1.isPositivePattern = isPositivePattern;
function getNegativePatterns(patterns) {
    return patterns.filter(isNegativePattern);
}
pattern$1.getNegativePatterns = getNegativePatterns;
function getPositivePatterns$1(patterns) {
    return patterns.filter(isPositivePattern);
}
pattern$1.getPositivePatterns = getPositivePatterns$1;
/**
 * Returns patterns that can be applied inside the current directory.
 *
 * @example
 * // ['./*', '*', 'a/*']
 * getPatternsInsideCurrentDirectory(['./*', '*', 'a/*', '../*', './../*'])
 */
function getPatternsInsideCurrentDirectory(patterns) {
    return patterns.filter((pattern) => !isPatternRelatedToParentDirectory(pattern));
}
pattern$1.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory;
/**
 * Returns patterns to be expanded relative to (outside) the current directory.
 *
 * @example
 * // ['../*', './../*']
 * getPatternsInsideCurrentDirectory(['./*', '*', 'a/*', '../*', './../*'])
 */
function getPatternsOutsideCurrentDirectory(patterns) {
    return patterns.filter(isPatternRelatedToParentDirectory);
}
pattern$1.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory;
function isPatternRelatedToParentDirectory(pattern) {
    return pattern.startsWith('..') || pattern.startsWith('./..');
}
pattern$1.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory;
function getBaseDirectory(pattern) {
    return globParent(pattern, { flipBackslashes: false });
}
pattern$1.getBaseDirectory = getBaseDirectory;
function hasGlobStar(pattern) {
    return pattern.includes(GLOBSTAR);
}
pattern$1.hasGlobStar = hasGlobStar;
function endsWithSlashGlobStar(pattern) {
    return pattern.endsWith('/' + GLOBSTAR);
}
pattern$1.endsWithSlashGlobStar = endsWithSlashGlobStar;
function isAffectDepthOfReadingPattern(pattern) {
    const basename = path$5.basename(pattern);
    return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
}
pattern$1.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
function expandPatternsWithBraceExpansion(patterns) {
    return patterns.reduce((collection, pattern) => {
        return collection.concat(expandBraceExpansion(pattern));
    }, []);
}
pattern$1.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
function expandBraceExpansion(pattern) {
    return micromatch.braces(pattern, {
        expand: true,
        nodupes: true
    });
}
pattern$1.expandBraceExpansion = expandBraceExpansion;
function getPatternParts(pattern, options) {
    let { parts } = micromatch.scan(pattern, Object.assign(Object.assign({}, options), { parts: true }));
    /**
     * The scan method returns an empty array in some cases.
     * See micromatch/picomatch#58 for more details.
     */
    if (parts.length === 0) {
        parts = [pattern];
    }
    /**
     * The scan method does not return an empty part for the pattern with a forward slash.
     * This is another part of micromatch/picomatch#58.
     */
    if (parts[0].startsWith('/')) {
        parts[0] = parts[0].slice(1);
        parts.unshift('');
    }
    return parts;
}
pattern$1.getPatternParts = getPatternParts;
function makeRe(pattern, options) {
    return micromatch.makeRe(pattern, options);
}
pattern$1.makeRe = makeRe;
function convertPatternsToRe(patterns, options) {
    return patterns.map((pattern) => makeRe(pattern, options));
}
pattern$1.convertPatternsToRe = convertPatternsToRe;
function matchAny(entry, patternsRe) {
    return patternsRe.some((patternRe) => patternRe.test(entry));
}
pattern$1.matchAny = matchAny;

var stream$4 = {};

/*
 * merge2
 * https://github.com/teambition/merge2
 *
 * Copyright (c) 2014-2020 Teambition
 * Licensed under the MIT license.
 */
const Stream = require$$0$1;
const PassThrough = Stream.PassThrough;
const slice = Array.prototype.slice;

var merge2_1 = merge2$1;

function merge2$1 () {
  const streamsQueue = [];
  const args = slice.call(arguments);
  let merging = false;
  let options = args[args.length - 1];

  if (options && !Array.isArray(options) && options.pipe == null) {
    args.pop();
  } else {
    options = {};
  }

  const doEnd = options.end !== false;
  const doPipeError = options.pipeError === true;
  if (options.objectMode == null) {
    options.objectMode = true;
  }
  if (options.highWaterMark == null) {
    options.highWaterMark = 64 * 1024;
  }
  const mergedStream = PassThrough(options);

  function addStream () {
    for (let i = 0, len = arguments.length; i < len; i++) {
      streamsQueue.push(pauseStreams(arguments[i], options));
    }
    mergeStream();
    return this
  }

  function mergeStream () {
    if (merging) {
      return
    }
    merging = true;

    let streams = streamsQueue.shift();
    if (!streams) {
      process.nextTick(endStream);
      return
    }
    if (!Array.isArray(streams)) {
      streams = [streams];
    }

    let pipesCount = streams.length + 1;

    function next () {
      if (--pipesCount > 0) {
        return
      }
      merging = false;
      mergeStream();
    }

    function pipe (stream) {
      function onend () {
        stream.removeListener('merge2UnpipeEnd', onend);
        stream.removeListener('end', onend);
        if (doPipeError) {
          stream.removeListener('error', onerror);
        }
        next();
      }
      function onerror (err) {
        mergedStream.emit('error', err);
      }
      // skip ended stream
      if (stream._readableState.endEmitted) {
        return next()
      }

      stream.on('merge2UnpipeEnd', onend);
      stream.on('end', onend);

      if (doPipeError) {
        stream.on('error', onerror);
      }

      stream.pipe(mergedStream, { end: false });
      // compatible for old stream
      stream.resume();
    }

    for (let i = 0; i < streams.length; i++) {
      pipe(streams[i]);
    }

    next();
  }

  function endStream () {
    merging = false;
    // emit 'queueDrain' when all streams merged.
    mergedStream.emit('queueDrain');
    if (doEnd) {
      mergedStream.end();
    }
  }

  mergedStream.setMaxListeners(0);
  mergedStream.add = addStream;
  mergedStream.on('unpipe', function (stream) {
    stream.emit('merge2UnpipeEnd');
  });

  if (args.length) {
    addStream.apply(null, args);
  }
  return mergedStream
}

// check and pause streams for pipe.
function pauseStreams (streams, options) {
  if (!Array.isArray(streams)) {
    // Backwards-compat with old-style streams
    if (!streams._readableState && streams.pipe) {
      streams = streams.pipe(PassThrough(options));
    }
    if (!streams._readableState || !streams.pause || !streams.pipe) {
      throw new Error('Only readable stream can be merged.')
    }
    streams.pause();
  } else {
    for (let i = 0, len = streams.length; i < len; i++) {
      streams[i] = pauseStreams(streams[i], options);
    }
  }
  return streams
}

Object.defineProperty(stream$4, "__esModule", { value: true });
stream$4.merge = void 0;
const merge2 = merge2_1;
function merge(streams) {
    const mergedStream = merge2(streams);
    streams.forEach((stream) => {
        stream.once('error', (error) => mergedStream.emit('error', error));
    });
    mergedStream.once('close', () => propagateCloseEventToSources(streams));
    mergedStream.once('end', () => propagateCloseEventToSources(streams));
    return mergedStream;
}
stream$4.merge = merge;
function propagateCloseEventToSources(streams) {
    streams.forEach((stream) => stream.emit('close'));
}

var string$1 = {};

Object.defineProperty(string$1, "__esModule", { value: true });
string$1.isEmpty = string$1.isString = void 0;
function isString(input) {
    return typeof input === 'string';
}
string$1.isString = isString;
function isEmpty(input) {
    return input === '';
}
string$1.isEmpty = isEmpty;

Object.defineProperty(utils$b, "__esModule", { value: true });
utils$b.string = utils$b.stream = utils$b.pattern = utils$b.path = utils$b.fs = utils$b.errno = utils$b.array = void 0;
const array = array$1;
utils$b.array = array;
const errno = errno$1;
utils$b.errno = errno;
const fs$6 = fs$7;
utils$b.fs = fs$6;
const path$4 = path$7;
utils$b.path = path$4;
const pattern = pattern$1;
utils$b.pattern = pattern;
const stream$3 = stream$4;
utils$b.stream = stream$3;
const string = string$1;
utils$b.string = string;

Object.defineProperty(tasks, "__esModule", { value: true });
tasks.convertPatternGroupToTask = tasks.convertPatternGroupsToTasks = tasks.groupPatternsByBaseDirectory = tasks.getNegativePatternsAsPositive = tasks.getPositivePatterns = tasks.convertPatternsToTasks = tasks.generate = void 0;
const utils$a = utils$b;
function generate(patterns, settings) {
    const positivePatterns = getPositivePatterns(patterns);
    const negativePatterns = getNegativePatternsAsPositive(patterns, settings.ignore);
    const staticPatterns = positivePatterns.filter((pattern) => utils$a.pattern.isStaticPattern(pattern, settings));
    const dynamicPatterns = positivePatterns.filter((pattern) => utils$a.pattern.isDynamicPattern(pattern, settings));
    const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, /* dynamic */ false);
    const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, /* dynamic */ true);
    return staticTasks.concat(dynamicTasks);
}
tasks.generate = generate;
/**
 * Returns tasks grouped by basic pattern directories.
 *
 * Patterns that can be found inside (`./`) and outside (`../`) the current directory are handled separately.
 * This is necessary because directory traversal starts at the base directory and goes deeper.
 */
function convertPatternsToTasks(positive, negative, dynamic) {
    const tasks = [];
    const patternsOutsideCurrentDirectory = utils$a.pattern.getPatternsOutsideCurrentDirectory(positive);
    const patternsInsideCurrentDirectory = utils$a.pattern.getPatternsInsideCurrentDirectory(positive);
    const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory);
    const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
    tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic));
    /*
     * For the sake of reducing future accesses to the file system, we merge all tasks within the current directory
     * into a global task, if at least one pattern refers to the root (`.`). In this case, the global task covers the rest.
     */
    if ('.' in insideCurrentDirectoryGroup) {
        tasks.push(convertPatternGroupToTask('.', patternsInsideCurrentDirectory, negative, dynamic));
    }
    else {
        tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic));
    }
    return tasks;
}
tasks.convertPatternsToTasks = convertPatternsToTasks;
function getPositivePatterns(patterns) {
    return utils$a.pattern.getPositivePatterns(patterns);
}
tasks.getPositivePatterns = getPositivePatterns;
function getNegativePatternsAsPositive(patterns, ignore) {
    const negative = utils$a.pattern.getNegativePatterns(patterns).concat(ignore);
    const positive = negative.map(utils$a.pattern.convertToPositivePattern);
    return positive;
}
tasks.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
function groupPatternsByBaseDirectory(patterns) {
    const group = {};
    return patterns.reduce((collection, pattern) => {
        const base = utils$a.pattern.getBaseDirectory(pattern);
        if (base in collection) {
            collection[base].push(pattern);
        }
        else {
            collection[base] = [pattern];
        }
        return collection;
    }, group);
}
tasks.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
function convertPatternGroupsToTasks(positive, negative, dynamic) {
    return Object.keys(positive).map((base) => {
        return convertPatternGroupToTask(base, positive[base], negative, dynamic);
    });
}
tasks.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
function convertPatternGroupToTask(base, positive, negative, dynamic) {
    return {
        dynamic,
        positive,
        negative,
        base,
        patterns: [].concat(positive, negative.map(utils$a.pattern.convertToNegativePattern))
    };
}
tasks.convertPatternGroupToTask = convertPatternGroupToTask;

var patterns = {};

Object.defineProperty(patterns, "__esModule", { value: true });
patterns.removeDuplicateSlashes = patterns.transform = void 0;
/**
 * Matches a sequence of two or more consecutive slashes, excluding the first two slashes at the beginning of the string.
 * The latter is due to the presence of the device path at the beginning of the UNC path.
 * @todo rewrite to negative lookbehind with the next major release.
 */
const DOUBLE_SLASH_RE = /(?!^)\/{2,}/g;
function transform(patterns) {
    return patterns.map((pattern) => removeDuplicateSlashes(pattern));
}
patterns.transform = transform;
/**
 * This package only works with forward slashes as a path separator.
 * Because of this, we cannot use the standard `path.normalize` method, because on Windows platform it will use of backslashes.
 */
function removeDuplicateSlashes(pattern) {
    return pattern.replace(DOUBLE_SLASH_RE, '/');
}
patterns.removeDuplicateSlashes = removeDuplicateSlashes;

var async$7 = {};

var async$6 = {};

var out$3 = {};

var async$5 = {};

var async$4 = {};

var out$2 = {};

var async$3 = {};

var out$1 = {};

var async$2 = {};

Object.defineProperty(async$2, "__esModule", { value: true });
async$2.read = void 0;
function read$3(path, settings, callback) {
    settings.fs.lstat(path, (lstatError, lstat) => {
        if (lstatError !== null) {
            callFailureCallback$2(callback, lstatError);
            return;
        }
        if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
            callSuccessCallback$2(callback, lstat);
            return;
        }
        settings.fs.stat(path, (statError, stat) => {
            if (statError !== null) {
                if (settings.throwErrorOnBrokenSymbolicLink) {
                    callFailureCallback$2(callback, statError);
                    return;
                }
                callSuccessCallback$2(callback, lstat);
                return;
            }
            if (settings.markSymbolicLink) {
                stat.isSymbolicLink = () => true;
            }
            callSuccessCallback$2(callback, stat);
        });
    });
}
async$2.read = read$3;
function callFailureCallback$2(callback, error) {
    callback(error);
}
function callSuccessCallback$2(callback, result) {
    callback(null, result);
}

var sync$7 = {};

Object.defineProperty(sync$7, "__esModule", { value: true });
sync$7.read = void 0;
function read$2(path, settings) {
    const lstat = settings.fs.lstatSync(path);
    if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
        return lstat;
    }
    try {
        const stat = settings.fs.statSync(path);
        if (settings.markSymbolicLink) {
            stat.isSymbolicLink = () => true;
        }
        return stat;
    }
    catch (error) {
        if (!settings.throwErrorOnBrokenSymbolicLink) {
            return lstat;
        }
        throw error;
    }
}
sync$7.read = read$2;

var settings$3 = {};

var fs$5 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
	const fs = require$$0$2;
	exports.FILE_SYSTEM_ADAPTER = {
	    lstat: fs.lstat,
	    stat: fs.stat,
	    lstatSync: fs.lstatSync,
	    statSync: fs.statSync
	};
	function createFileSystemAdapter(fsMethods) {
	    if (fsMethods === undefined) {
	        return exports.FILE_SYSTEM_ADAPTER;
	    }
	    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
	}
	exports.createFileSystemAdapter = createFileSystemAdapter;
} (fs$5));

Object.defineProperty(settings$3, "__esModule", { value: true });
const fs$4 = fs$5;
class Settings$2 {
    constructor(_options = {}) {
        this._options = _options;
        this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
        this.fs = fs$4.createFileSystemAdapter(this._options.fs);
        this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
    }
    _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
    }
}
settings$3.default = Settings$2;

Object.defineProperty(out$1, "__esModule", { value: true });
out$1.statSync = out$1.stat = out$1.Settings = void 0;
const async$1 = async$2;
const sync$6 = sync$7;
const settings_1$3 = settings$3;
out$1.Settings = settings_1$3.default;
function stat(path, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
        async$1.read(path, getSettings$2(), optionsOrSettingsOrCallback);
        return;
    }
    async$1.read(path, getSettings$2(optionsOrSettingsOrCallback), callback);
}
out$1.stat = stat;
function statSync(path, optionsOrSettings) {
    const settings = getSettings$2(optionsOrSettings);
    return sync$6.read(path, settings);
}
out$1.statSync = statSync;
function getSettings$2(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1$3.default) {
        return settingsOrOptions;
    }
    return new settings_1$3.default(settingsOrOptions);
}

/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

let promise;

var queueMicrotask_1 = typeof queueMicrotask === 'function'
  ? queueMicrotask.bind(typeof window !== 'undefined' ? window : commonjsGlobal)
  // reuse resolved promise, and allocate it lazily
  : cb => (promise || (promise = Promise.resolve()))
    .then(cb)
    .catch(err => setTimeout(() => { throw err }, 0));

/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

var runParallel_1 = runParallel;

const queueMicrotask$1 = queueMicrotask_1;

function runParallel (tasks, cb) {
  let results, pending, keys;
  let isSync = true;

  if (Array.isArray(tasks)) {
    results = [];
    pending = tasks.length;
  } else {
    keys = Object.keys(tasks);
    results = {};
    pending = keys.length;
  }

  function done (err) {
    function end () {
      if (cb) cb(err, results);
      cb = null;
    }
    if (isSync) queueMicrotask$1(end);
    else end();
  }

  function each (i, err, result) {
    results[i] = result;
    if (--pending === 0 || err) {
      done(err);
    }
  }

  if (!pending) {
    // empty
    done(null);
  } else if (keys) {
    // object
    keys.forEach(function (key) {
      tasks[key](function (err, result) { each(key, err, result); });
    });
  } else {
    // array
    tasks.forEach(function (task, i) {
      task(function (err, result) { each(i, err, result); });
    });
  }

  isSync = false;
}

var constants = {};

Object.defineProperty(constants, "__esModule", { value: true });
constants.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
const NODE_PROCESS_VERSION_PARTS = process.versions.node.split('.');
if (NODE_PROCESS_VERSION_PARTS[0] === undefined || NODE_PROCESS_VERSION_PARTS[1] === undefined) {
    throw new Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);
}
const MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
const MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
const SUPPORTED_MAJOR_VERSION = 10;
const SUPPORTED_MINOR_VERSION = 10;
const IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION;
const IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
/**
 * IS `true` for Node.js 10.10 and greater.
 */
constants.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;

var utils$9 = {};

var fs$3 = {};

Object.defineProperty(fs$3, "__esModule", { value: true });
fs$3.createDirentFromStats = void 0;
class DirentFromStats {
    constructor(name, stats) {
        this.name = name;
        this.isBlockDevice = stats.isBlockDevice.bind(stats);
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
        this.isDirectory = stats.isDirectory.bind(stats);
        this.isFIFO = stats.isFIFO.bind(stats);
        this.isFile = stats.isFile.bind(stats);
        this.isSocket = stats.isSocket.bind(stats);
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
    }
}
function createDirentFromStats(name, stats) {
    return new DirentFromStats(name, stats);
}
fs$3.createDirentFromStats = createDirentFromStats;

Object.defineProperty(utils$9, "__esModule", { value: true });
utils$9.fs = void 0;
const fs$2 = fs$3;
utils$9.fs = fs$2;

var common$6 = {};

Object.defineProperty(common$6, "__esModule", { value: true });
common$6.joinPathSegments = void 0;
function joinPathSegments$1(a, b, separator) {
    /**
     * The correct handling of cases when the first segment is a root (`/`, `C:/`) or UNC path (`//?/C:/`).
     */
    if (a.endsWith(separator)) {
        return a + b;
    }
    return a + separator + b;
}
common$6.joinPathSegments = joinPathSegments$1;

Object.defineProperty(async$3, "__esModule", { value: true });
async$3.readdir = async$3.readdirWithFileTypes = async$3.read = void 0;
const fsStat$5 = out$1;
const rpl = runParallel_1;
const constants_1$1 = constants;
const utils$8 = utils$9;
const common$5 = common$6;
function read$1(directory, settings, callback) {
    if (!settings.stats && constants_1$1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        readdirWithFileTypes$1(directory, settings, callback);
        return;
    }
    readdir$1(directory, settings, callback);
}
async$3.read = read$1;
function readdirWithFileTypes$1(directory, settings, callback) {
    settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
        if (readdirError !== null) {
            callFailureCallback$1(callback, readdirError);
            return;
        }
        const entries = dirents.map((dirent) => ({
            dirent,
            name: dirent.name,
            path: common$5.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
        }));
        if (!settings.followSymbolicLinks) {
            callSuccessCallback$1(callback, entries);
            return;
        }
        const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
        rpl(tasks, (rplError, rplEntries) => {
            if (rplError !== null) {
                callFailureCallback$1(callback, rplError);
                return;
            }
            callSuccessCallback$1(callback, rplEntries);
        });
    });
}
async$3.readdirWithFileTypes = readdirWithFileTypes$1;
function makeRplTaskEntry(entry, settings) {
    return (done) => {
        if (!entry.dirent.isSymbolicLink()) {
            done(null, entry);
            return;
        }
        settings.fs.stat(entry.path, (statError, stats) => {
            if (statError !== null) {
                if (settings.throwErrorOnBrokenSymbolicLink) {
                    done(statError);
                    return;
                }
                done(null, entry);
                return;
            }
            entry.dirent = utils$8.fs.createDirentFromStats(entry.name, stats);
            done(null, entry);
        });
    };
}
function readdir$1(directory, settings, callback) {
    settings.fs.readdir(directory, (readdirError, names) => {
        if (readdirError !== null) {
            callFailureCallback$1(callback, readdirError);
            return;
        }
        const tasks = names.map((name) => {
            const path = common$5.joinPathSegments(directory, name, settings.pathSegmentSeparator);
            return (done) => {
                fsStat$5.stat(path, settings.fsStatSettings, (error, stats) => {
                    if (error !== null) {
                        done(error);
                        return;
                    }
                    const entry = {
                        name,
                        path,
                        dirent: utils$8.fs.createDirentFromStats(name, stats)
                    };
                    if (settings.stats) {
                        entry.stats = stats;
                    }
                    done(null, entry);
                });
            };
        });
        rpl(tasks, (rplError, entries) => {
            if (rplError !== null) {
                callFailureCallback$1(callback, rplError);
                return;
            }
            callSuccessCallback$1(callback, entries);
        });
    });
}
async$3.readdir = readdir$1;
function callFailureCallback$1(callback, error) {
    callback(error);
}
function callSuccessCallback$1(callback, result) {
    callback(null, result);
}

var sync$5 = {};

Object.defineProperty(sync$5, "__esModule", { value: true });
sync$5.readdir = sync$5.readdirWithFileTypes = sync$5.read = void 0;
const fsStat$4 = out$1;
const constants_1 = constants;
const utils$7 = utils$9;
const common$4 = common$6;
function read(directory, settings) {
    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        return readdirWithFileTypes(directory, settings);
    }
    return readdir(directory, settings);
}
sync$5.read = read;
function readdirWithFileTypes(directory, settings) {
    const dirents = settings.fs.readdirSync(directory, { withFileTypes: true });
    return dirents.map((dirent) => {
        const entry = {
            dirent,
            name: dirent.name,
            path: common$4.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
        };
        if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
            try {
                const stats = settings.fs.statSync(entry.path);
                entry.dirent = utils$7.fs.createDirentFromStats(entry.name, stats);
            }
            catch (error) {
                if (settings.throwErrorOnBrokenSymbolicLink) {
                    throw error;
                }
            }
        }
        return entry;
    });
}
sync$5.readdirWithFileTypes = readdirWithFileTypes;
function readdir(directory, settings) {
    const names = settings.fs.readdirSync(directory);
    return names.map((name) => {
        const entryPath = common$4.joinPathSegments(directory, name, settings.pathSegmentSeparator);
        const stats = fsStat$4.statSync(entryPath, settings.fsStatSettings);
        const entry = {
            name,
            path: entryPath,
            dirent: utils$7.fs.createDirentFromStats(name, stats)
        };
        if (settings.stats) {
            entry.stats = stats;
        }
        return entry;
    });
}
sync$5.readdir = readdir;

var settings$2 = {};

var fs$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
	const fs = require$$0$2;
	exports.FILE_SYSTEM_ADAPTER = {
	    lstat: fs.lstat,
	    stat: fs.stat,
	    lstatSync: fs.lstatSync,
	    statSync: fs.statSync,
	    readdir: fs.readdir,
	    readdirSync: fs.readdirSync
	};
	function createFileSystemAdapter(fsMethods) {
	    if (fsMethods === undefined) {
	        return exports.FILE_SYSTEM_ADAPTER;
	    }
	    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
	}
	exports.createFileSystemAdapter = createFileSystemAdapter;
} (fs$1));

Object.defineProperty(settings$2, "__esModule", { value: true });
const path$3 = k;
const fsStat$3 = out$1;
const fs = fs$1;
class Settings$1 {
    constructor(_options = {}) {
        this._options = _options;
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
        this.fs = fs.createFileSystemAdapter(this._options.fs);
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path$3.sep);
        this.stats = this._getValue(this._options.stats, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
        this.fsStatSettings = new fsStat$3.Settings({
            followSymbolicLink: this.followSymbolicLinks,
            fs: this.fs,
            throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
        });
    }
    _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
    }
}
settings$2.default = Settings$1;

Object.defineProperty(out$2, "__esModule", { value: true });
out$2.Settings = out$2.scandirSync = out$2.scandir = void 0;
const async = async$3;
const sync$4 = sync$5;
const settings_1$2 = settings$2;
out$2.Settings = settings_1$2.default;
function scandir(path, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
        async.read(path, getSettings$1(), optionsOrSettingsOrCallback);
        return;
    }
    async.read(path, getSettings$1(optionsOrSettingsOrCallback), callback);
}
out$2.scandir = scandir;
function scandirSync(path, optionsOrSettings) {
    const settings = getSettings$1(optionsOrSettings);
    return sync$4.read(path, settings);
}
out$2.scandirSync = scandirSync;
function getSettings$1(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1$2.default) {
        return settingsOrOptions;
    }
    return new settings_1$2.default(settingsOrOptions);
}

var queue = {exports: {}};

function reusify$1 (Constructor) {
  var head = new Constructor();
  var tail = head;

  function get () {
    var current = head;

    if (current.next) {
      head = current.next;
    } else {
      head = new Constructor();
      tail = head;
    }

    current.next = null;

    return current
  }

  function release (obj) {
    tail.next = obj;
    tail = obj;
  }

  return {
    get: get,
    release: release
  }
}

var reusify_1 = reusify$1;

/* eslint-disable no-var */

var reusify = reusify_1;

function fastqueue (context, worker, concurrency) {
  if (typeof context === 'function') {
    concurrency = worker;
    worker = context;
    context = null;
  }

  if (concurrency < 1) {
    throw new Error('fastqueue concurrency must be greater than 1')
  }

  var cache = reusify(Task);
  var queueHead = null;
  var queueTail = null;
  var _running = 0;
  var errorHandler = null;

  var self = {
    push: push,
    drain: noop,
    saturated: noop,
    pause: pause,
    paused: false,
    concurrency: concurrency,
    running: running,
    resume: resume,
    idle: idle,
    length: length,
    getQueue: getQueue,
    unshift: unshift,
    empty: noop,
    kill: kill,
    killAndDrain: killAndDrain,
    error: error
  };

  return self

  function running () {
    return _running
  }

  function pause () {
    self.paused = true;
  }

  function length () {
    var current = queueHead;
    var counter = 0;

    while (current) {
      current = current.next;
      counter++;
    }

    return counter
  }

  function getQueue () {
    var current = queueHead;
    var tasks = [];

    while (current) {
      tasks.push(current.value);
      current = current.next;
    }

    return tasks
  }

  function resume () {
    if (!self.paused) return
    self.paused = false;
    for (var i = 0; i < self.concurrency; i++) {
      _running++;
      release();
    }
  }

  function idle () {
    return _running === 0 && self.length() === 0
  }

  function push (value, done) {
    var current = cache.get();

    current.context = context;
    current.release = release;
    current.value = value;
    current.callback = done || noop;
    current.errorHandler = errorHandler;

    if (_running === self.concurrency || self.paused) {
      if (queueTail) {
        queueTail.next = current;
        queueTail = current;
      } else {
        queueHead = current;
        queueTail = current;
        self.saturated();
      }
    } else {
      _running++;
      worker.call(context, current.value, current.worked);
    }
  }

  function unshift (value, done) {
    var current = cache.get();

    current.context = context;
    current.release = release;
    current.value = value;
    current.callback = done || noop;

    if (_running === self.concurrency || self.paused) {
      if (queueHead) {
        current.next = queueHead;
        queueHead = current;
      } else {
        queueHead = current;
        queueTail = current;
        self.saturated();
      }
    } else {
      _running++;
      worker.call(context, current.value, current.worked);
    }
  }

  function release (holder) {
    if (holder) {
      cache.release(holder);
    }
    var next = queueHead;
    if (next) {
      if (!self.paused) {
        if (queueTail === queueHead) {
          queueTail = null;
        }
        queueHead = next.next;
        next.next = null;
        worker.call(context, next.value, next.worked);
        if (queueTail === null) {
          self.empty();
        }
      } else {
        _running--;
      }
    } else if (--_running === 0) {
      self.drain();
    }
  }

  function kill () {
    queueHead = null;
    queueTail = null;
    self.drain = noop;
  }

  function killAndDrain () {
    queueHead = null;
    queueTail = null;
    self.drain();
    self.drain = noop;
  }

  function error (handler) {
    errorHandler = handler;
  }
}

function noop () {}

function Task () {
  this.value = null;
  this.callback = noop;
  this.next = null;
  this.release = noop;
  this.context = null;
  this.errorHandler = null;

  var self = this;

  this.worked = function worked (err, result) {
    var callback = self.callback;
    var errorHandler = self.errorHandler;
    var val = self.value;
    self.value = null;
    self.callback = noop;
    if (self.errorHandler) {
      errorHandler(err, val);
    }
    callback.call(self.context, err, result);
    self.release(self);
  };
}

function queueAsPromised (context, worker, concurrency) {
  if (typeof context === 'function') {
    concurrency = worker;
    worker = context;
    context = null;
  }

  function asyncWrapper (arg, cb) {
    worker.call(this, arg)
      .then(function (res) {
        cb(null, res);
      }, cb);
  }

  var queue = fastqueue(context, asyncWrapper, concurrency);

  var pushCb = queue.push;
  var unshiftCb = queue.unshift;

  queue.push = push;
  queue.unshift = unshift;
  queue.drained = drained;

  return queue

  function push (value) {
    var p = new Promise(function (resolve, reject) {
      pushCb(value, function (err, result) {
        if (err) {
          reject(err);
          return
        }
        resolve(result);
      });
    });

    // Let's fork the promise chain to
    // make the error bubble up to the user but
    // not lead to a unhandledRejection
    p.catch(noop);

    return p
  }

  function unshift (value) {
    var p = new Promise(function (resolve, reject) {
      unshiftCb(value, function (err, result) {
        if (err) {
          reject(err);
          return
        }
        resolve(result);
      });
    });

    // Let's fork the promise chain to
    // make the error bubble up to the user but
    // not lead to a unhandledRejection
    p.catch(noop);

    return p
  }

  function drained () {
    var previousDrain = queue.drain;

    var p = new Promise(function (resolve) {
      queue.drain = function () {
        previousDrain();
        resolve();
      };
    });

    return p
  }
}

queue.exports = fastqueue;
queue.exports.promise = queueAsPromised;

var common$3 = {};

Object.defineProperty(common$3, "__esModule", { value: true });
common$3.joinPathSegments = common$3.replacePathSegmentSeparator = common$3.isAppliedFilter = common$3.isFatalError = void 0;
function isFatalError(settings, error) {
    if (settings.errorFilter === null) {
        return true;
    }
    return !settings.errorFilter(error);
}
common$3.isFatalError = isFatalError;
function isAppliedFilter(filter, value) {
    return filter === null || filter(value);
}
common$3.isAppliedFilter = isAppliedFilter;
function replacePathSegmentSeparator(filepath, separator) {
    return filepath.split(/[/\\]/).join(separator);
}
common$3.replacePathSegmentSeparator = replacePathSegmentSeparator;
function joinPathSegments(a, b, separator) {
    if (a === '') {
        return b;
    }
    /**
     * The correct handling of cases when the first segment is a root (`/`, `C:/`) or UNC path (`//?/C:/`).
     */
    if (a.endsWith(separator)) {
        return a + b;
    }
    return a + separator + b;
}
common$3.joinPathSegments = joinPathSegments;

var reader$1 = {};

Object.defineProperty(reader$1, "__esModule", { value: true });
const common$2 = common$3;
class Reader$1 {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._root = common$2.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
    }
}
reader$1.default = Reader$1;

Object.defineProperty(async$4, "__esModule", { value: true });
const events_1 = require$$2;
const fsScandir$2 = out$2;
const fastq = queue.exports;
const common$1 = common$3;
const reader_1$4 = reader$1;
class AsyncReader extends reader_1$4.default {
    constructor(_root, _settings) {
        super(_root, _settings);
        this._settings = _settings;
        this._scandir = fsScandir$2.scandir;
        this._emitter = new events_1.EventEmitter();
        this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
        this._isFatalError = false;
        this._isDestroyed = false;
        this._queue.drain = () => {
            if (!this._isFatalError) {
                this._emitter.emit('end');
            }
        };
    }
    read() {
        this._isFatalError = false;
        this._isDestroyed = false;
        setImmediate(() => {
            this._pushToQueue(this._root, this._settings.basePath);
        });
        return this._emitter;
    }
    get isDestroyed() {
        return this._isDestroyed;
    }
    destroy() {
        if (this._isDestroyed) {
            throw new Error('The reader is already destroyed');
        }
        this._isDestroyed = true;
        this._queue.killAndDrain();
    }
    onEntry(callback) {
        this._emitter.on('entry', callback);
    }
    onError(callback) {
        this._emitter.once('error', callback);
    }
    onEnd(callback) {
        this._emitter.once('end', callback);
    }
    _pushToQueue(directory, base) {
        const queueItem = { directory, base };
        this._queue.push(queueItem, (error) => {
            if (error !== null) {
                this._handleError(error);
            }
        });
    }
    _worker(item, done) {
        this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
            if (error !== null) {
                done(error, undefined);
                return;
            }
            for (const entry of entries) {
                this._handleEntry(entry, item.base);
            }
            done(null, undefined);
        });
    }
    _handleError(error) {
        if (this._isDestroyed || !common$1.isFatalError(this._settings, error)) {
            return;
        }
        this._isFatalError = true;
        this._isDestroyed = true;
        this._emitter.emit('error', error);
    }
    _handleEntry(entry, base) {
        if (this._isDestroyed || this._isFatalError) {
            return;
        }
        const fullpath = entry.path;
        if (base !== undefined) {
            entry.path = common$1.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
        }
        if (common$1.isAppliedFilter(this._settings.entryFilter, entry)) {
            this._emitEntry(entry);
        }
        if (entry.dirent.isDirectory() && common$1.isAppliedFilter(this._settings.deepFilter, entry)) {
            this._pushToQueue(fullpath, base === undefined ? undefined : entry.path);
        }
    }
    _emitEntry(entry) {
        this._emitter.emit('entry', entry);
    }
}
async$4.default = AsyncReader;

Object.defineProperty(async$5, "__esModule", { value: true });
const async_1$4 = async$4;
class AsyncProvider {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new async_1$4.default(this._root, this._settings);
        this._storage = [];
    }
    read(callback) {
        this._reader.onError((error) => {
            callFailureCallback(callback, error);
        });
        this._reader.onEntry((entry) => {
            this._storage.push(entry);
        });
        this._reader.onEnd(() => {
            callSuccessCallback(callback, this._storage);
        });
        this._reader.read();
    }
}
async$5.default = AsyncProvider;
function callFailureCallback(callback, error) {
    callback(error);
}
function callSuccessCallback(callback, entries) {
    callback(null, entries);
}

var stream$2 = {};

Object.defineProperty(stream$2, "__esModule", { value: true });
const stream_1$5 = require$$0$1;
const async_1$3 = async$4;
class StreamProvider {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new async_1$3.default(this._root, this._settings);
        this._stream = new stream_1$5.Readable({
            objectMode: true,
            read: () => { },
            destroy: () => {
                if (!this._reader.isDestroyed) {
                    this._reader.destroy();
                }
            }
        });
    }
    read() {
        this._reader.onError((error) => {
            this._stream.emit('error', error);
        });
        this._reader.onEntry((entry) => {
            this._stream.push(entry);
        });
        this._reader.onEnd(() => {
            this._stream.push(null);
        });
        this._reader.read();
        return this._stream;
    }
}
stream$2.default = StreamProvider;

var sync$3 = {};

var sync$2 = {};

Object.defineProperty(sync$2, "__esModule", { value: true });
const fsScandir$1 = out$2;
const common = common$3;
const reader_1$3 = reader$1;
class SyncReader extends reader_1$3.default {
    constructor() {
        super(...arguments);
        this._scandir = fsScandir$1.scandirSync;
        this._storage = [];
        this._queue = new Set();
    }
    read() {
        this._pushToQueue(this._root, this._settings.basePath);
        this._handleQueue();
        return this._storage;
    }
    _pushToQueue(directory, base) {
        this._queue.add({ directory, base });
    }
    _handleQueue() {
        for (const item of this._queue.values()) {
            this._handleDirectory(item.directory, item.base);
        }
    }
    _handleDirectory(directory, base) {
        try {
            const entries = this._scandir(directory, this._settings.fsScandirSettings);
            for (const entry of entries) {
                this._handleEntry(entry, base);
            }
        }
        catch (error) {
            this._handleError(error);
        }
    }
    _handleError(error) {
        if (!common.isFatalError(this._settings, error)) {
            return;
        }
        throw error;
    }
    _handleEntry(entry, base) {
        const fullpath = entry.path;
        if (base !== undefined) {
            entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
            this._pushToStorage(entry);
        }
        if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
            this._pushToQueue(fullpath, base === undefined ? undefined : entry.path);
        }
    }
    _pushToStorage(entry) {
        this._storage.push(entry);
    }
}
sync$2.default = SyncReader;

Object.defineProperty(sync$3, "__esModule", { value: true });
const sync_1$3 = sync$2;
class SyncProvider {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new sync_1$3.default(this._root, this._settings);
    }
    read() {
        return this._reader.read();
    }
}
sync$3.default = SyncProvider;

var settings$1 = {};

Object.defineProperty(settings$1, "__esModule", { value: true });
const path$2 = k;
const fsScandir = out$2;
class Settings {
    constructor(_options = {}) {
        this._options = _options;
        this.basePath = this._getValue(this._options.basePath, undefined);
        this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY);
        this.deepFilter = this._getValue(this._options.deepFilter, null);
        this.entryFilter = this._getValue(this._options.entryFilter, null);
        this.errorFilter = this._getValue(this._options.errorFilter, null);
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path$2.sep);
        this.fsScandirSettings = new fsScandir.Settings({
            followSymbolicLinks: this._options.followSymbolicLinks,
            fs: this._options.fs,
            pathSegmentSeparator: this._options.pathSegmentSeparator,
            stats: this._options.stats,
            throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
        });
    }
    _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
    }
}
settings$1.default = Settings;

Object.defineProperty(out$3, "__esModule", { value: true });
out$3.Settings = out$3.walkStream = out$3.walkSync = out$3.walk = void 0;
const async_1$2 = async$5;
const stream_1$4 = stream$2;
const sync_1$2 = sync$3;
const settings_1$1 = settings$1;
out$3.Settings = settings_1$1.default;
function walk(directory, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
        new async_1$2.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
        return;
    }
    new async_1$2.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
}
out$3.walk = walk;
function walkSync(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    const provider = new sync_1$2.default(directory, settings);
    return provider.read();
}
out$3.walkSync = walkSync;
function walkStream(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    const provider = new stream_1$4.default(directory, settings);
    return provider.read();
}
out$3.walkStream = walkStream;
function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1$1.default) {
        return settingsOrOptions;
    }
    return new settings_1$1.default(settingsOrOptions);
}

var reader = {};

Object.defineProperty(reader, "__esModule", { value: true });
const path$1 = k;
const fsStat$2 = out$1;
const utils$6 = utils$b;
class Reader {
    constructor(_settings) {
        this._settings = _settings;
        this._fsStatSettings = new fsStat$2.Settings({
            followSymbolicLink: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
        });
    }
    _getFullEntryPath(filepath) {
        return path$1.resolve(this._settings.cwd, filepath);
    }
    _makeEntry(stats, pattern) {
        const entry = {
            name: pattern,
            path: pattern,
            dirent: utils$6.fs.createDirentFromStats(pattern, stats)
        };
        if (this._settings.stats) {
            entry.stats = stats;
        }
        return entry;
    }
    _isFatalError(error) {
        return !utils$6.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
    }
}
reader.default = Reader;

var stream$1 = {};

Object.defineProperty(stream$1, "__esModule", { value: true });
const stream_1$3 = require$$0$1;
const fsStat$1 = out$1;
const fsWalk$2 = out$3;
const reader_1$2 = reader;
class ReaderStream extends reader_1$2.default {
    constructor() {
        super(...arguments);
        this._walkStream = fsWalk$2.walkStream;
        this._stat = fsStat$1.stat;
    }
    dynamic(root, options) {
        return this._walkStream(root, options);
    }
    static(patterns, options) {
        const filepaths = patterns.map(this._getFullEntryPath, this);
        const stream = new stream_1$3.PassThrough({ objectMode: true });
        stream._write = (index, _enc, done) => {
            return this._getEntry(filepaths[index], patterns[index], options)
                .then((entry) => {
                if (entry !== null && options.entryFilter(entry)) {
                    stream.push(entry);
                }
                if (index === filepaths.length - 1) {
                    stream.end();
                }
                done();
            })
                .catch(done);
        };
        for (let i = 0; i < filepaths.length; i++) {
            stream.write(i);
        }
        return stream;
    }
    _getEntry(filepath, pattern, options) {
        return this._getStat(filepath)
            .then((stats) => this._makeEntry(stats, pattern))
            .catch((error) => {
            if (options.errorFilter(error)) {
                return null;
            }
            throw error;
        });
    }
    _getStat(filepath) {
        return new Promise((resolve, reject) => {
            this._stat(filepath, this._fsStatSettings, (error, stats) => {
                return error === null ? resolve(stats) : reject(error);
            });
        });
    }
}
stream$1.default = ReaderStream;

Object.defineProperty(async$6, "__esModule", { value: true });
const fsWalk$1 = out$3;
const reader_1$1 = reader;
const stream_1$2 = stream$1;
class ReaderAsync extends reader_1$1.default {
    constructor() {
        super(...arguments);
        this._walkAsync = fsWalk$1.walk;
        this._readerStream = new stream_1$2.default(this._settings);
    }
    dynamic(root, options) {
        return new Promise((resolve, reject) => {
            this._walkAsync(root, options, (error, entries) => {
                if (error === null) {
                    resolve(entries);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    async static(patterns, options) {
        const entries = [];
        const stream = this._readerStream.static(patterns, options);
        // After #235, replace it with an asynchronous iterator.
        return new Promise((resolve, reject) => {
            stream.once('error', reject);
            stream.on('data', (entry) => entries.push(entry));
            stream.once('end', () => resolve(entries));
        });
    }
}
async$6.default = ReaderAsync;

var provider = {};

var deep = {};

var partial = {};

var matcher = {};

Object.defineProperty(matcher, "__esModule", { value: true });
const utils$5 = utils$b;
class Matcher {
    constructor(_patterns, _settings, _micromatchOptions) {
        this._patterns = _patterns;
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
        this._storage = [];
        this._fillStorage();
    }
    _fillStorage() {
        /**
         * The original pattern may include `{,*,**,a/*}`, which will lead to problems with matching (unresolved level).
         * So, before expand patterns with brace expansion into separated patterns.
         */
        const patterns = utils$5.pattern.expandPatternsWithBraceExpansion(this._patterns);
        for (const pattern of patterns) {
            const segments = this._getPatternSegments(pattern);
            const sections = this._splitSegmentsIntoSections(segments);
            this._storage.push({
                complete: sections.length <= 1,
                pattern,
                segments,
                sections
            });
        }
    }
    _getPatternSegments(pattern) {
        const parts = utils$5.pattern.getPatternParts(pattern, this._micromatchOptions);
        return parts.map((part) => {
            const dynamic = utils$5.pattern.isDynamicPattern(part, this._settings);
            if (!dynamic) {
                return {
                    dynamic: false,
                    pattern: part
                };
            }
            return {
                dynamic: true,
                pattern: part,
                patternRe: utils$5.pattern.makeRe(part, this._micromatchOptions)
            };
        });
    }
    _splitSegmentsIntoSections(segments) {
        return utils$5.array.splitWhen(segments, (segment) => segment.dynamic && utils$5.pattern.hasGlobStar(segment.pattern));
    }
}
matcher.default = Matcher;

Object.defineProperty(partial, "__esModule", { value: true });
const matcher_1 = matcher;
class PartialMatcher extends matcher_1.default {
    match(filepath) {
        const parts = filepath.split('/');
        const levels = parts.length;
        const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
        for (const pattern of patterns) {
            const section = pattern.sections[0];
            /**
             * In this case, the pattern has a globstar and we must read all directories unconditionally,
             * but only if the level has reached the end of the first group.
             *
             * fixtures/{a,b}/**
             *  ^ true/false  ^ always true
            */
            if (!pattern.complete && levels > section.length) {
                return true;
            }
            const match = parts.every((part, index) => {
                const segment = pattern.segments[index];
                if (segment.dynamic && segment.patternRe.test(part)) {
                    return true;
                }
                if (!segment.dynamic && segment.pattern === part) {
                    return true;
                }
                return false;
            });
            if (match) {
                return true;
            }
        }
        return false;
    }
}
partial.default = PartialMatcher;

Object.defineProperty(deep, "__esModule", { value: true });
const utils$4 = utils$b;
const partial_1 = partial;
class DeepFilter {
    constructor(_settings, _micromatchOptions) {
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
    }
    getFilter(basePath, positive, negative) {
        const matcher = this._getMatcher(positive);
        const negativeRe = this._getNegativePatternsRe(negative);
        return (entry) => this._filter(basePath, entry, matcher, negativeRe);
    }
    _getMatcher(patterns) {
        return new partial_1.default(patterns, this._settings, this._micromatchOptions);
    }
    _getNegativePatternsRe(patterns) {
        const affectDepthOfReadingPatterns = patterns.filter(utils$4.pattern.isAffectDepthOfReadingPattern);
        return utils$4.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
    }
    _filter(basePath, entry, matcher, negativeRe) {
        if (this._isSkippedByDeep(basePath, entry.path)) {
            return false;
        }
        if (this._isSkippedSymbolicLink(entry)) {
            return false;
        }
        const filepath = utils$4.path.removeLeadingDotSegment(entry.path);
        if (this._isSkippedByPositivePatterns(filepath, matcher)) {
            return false;
        }
        return this._isSkippedByNegativePatterns(filepath, negativeRe);
    }
    _isSkippedByDeep(basePath, entryPath) {
        /**
         * Avoid unnecessary depth calculations when it doesn't matter.
         */
        if (this._settings.deep === Infinity) {
            return false;
        }
        return this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
    }
    _getEntryLevel(basePath, entryPath) {
        const entryPathDepth = entryPath.split('/').length;
        if (basePath === '') {
            return entryPathDepth;
        }
        const basePathDepth = basePath.split('/').length;
        return entryPathDepth - basePathDepth;
    }
    _isSkippedSymbolicLink(entry) {
        return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
    }
    _isSkippedByPositivePatterns(entryPath, matcher) {
        return !this._settings.baseNameMatch && !matcher.match(entryPath);
    }
    _isSkippedByNegativePatterns(entryPath, patternsRe) {
        return !utils$4.pattern.matchAny(entryPath, patternsRe);
    }
}
deep.default = DeepFilter;

var entry$1 = {};

Object.defineProperty(entry$1, "__esModule", { value: true });
const utils$3 = utils$b;
class EntryFilter {
    constructor(_settings, _micromatchOptions) {
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
        this.index = new Map();
    }
    getFilter(positive, negative) {
        const positiveRe = utils$3.pattern.convertPatternsToRe(positive, this._micromatchOptions);
        const negativeRe = utils$3.pattern.convertPatternsToRe(negative, this._micromatchOptions);
        return (entry) => this._filter(entry, positiveRe, negativeRe);
    }
    _filter(entry, positiveRe, negativeRe) {
        if (this._settings.unique && this._isDuplicateEntry(entry)) {
            return false;
        }
        if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
            return false;
        }
        if (this._isSkippedByAbsoluteNegativePatterns(entry.path, negativeRe)) {
            return false;
        }
        const filepath = this._settings.baseNameMatch ? entry.name : entry.path;
        const isDirectory = entry.dirent.isDirectory();
        const isMatched = this._isMatchToPatterns(filepath, positiveRe, isDirectory) && !this._isMatchToPatterns(entry.path, negativeRe, isDirectory);
        if (this._settings.unique && isMatched) {
            this._createIndexRecord(entry);
        }
        return isMatched;
    }
    _isDuplicateEntry(entry) {
        return this.index.has(entry.path);
    }
    _createIndexRecord(entry) {
        this.index.set(entry.path, undefined);
    }
    _onlyFileFilter(entry) {
        return this._settings.onlyFiles && !entry.dirent.isFile();
    }
    _onlyDirectoryFilter(entry) {
        return this._settings.onlyDirectories && !entry.dirent.isDirectory();
    }
    _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
        if (!this._settings.absolute) {
            return false;
        }
        const fullpath = utils$3.path.makeAbsolute(this._settings.cwd, entryPath);
        return utils$3.pattern.matchAny(fullpath, patternsRe);
    }
    _isMatchToPatterns(entryPath, patternsRe, isDirectory) {
        const filepath = utils$3.path.removeLeadingDotSegment(entryPath);
        // Trying to match files and directories by patterns.
        const isMatched = utils$3.pattern.matchAny(filepath, patternsRe);
        // A pattern with a trailling slash can be used for directory matching.
        // To apply such pattern, we need to add a tralling slash to the path.
        if (!isMatched && isDirectory) {
            return utils$3.pattern.matchAny(filepath + '/', patternsRe);
        }
        return isMatched;
    }
}
entry$1.default = EntryFilter;

var error = {};

Object.defineProperty(error, "__esModule", { value: true });
const utils$2 = utils$b;
class ErrorFilter {
    constructor(_settings) {
        this._settings = _settings;
    }
    getFilter() {
        return (error) => this._isNonFatalError(error);
    }
    _isNonFatalError(error) {
        return utils$2.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
    }
}
error.default = ErrorFilter;

var entry = {};

Object.defineProperty(entry, "__esModule", { value: true });
const utils$1 = utils$b;
class EntryTransformer {
    constructor(_settings) {
        this._settings = _settings;
    }
    getTransformer() {
        return (entry) => this._transform(entry);
    }
    _transform(entry) {
        let filepath = entry.path;
        if (this._settings.absolute) {
            filepath = utils$1.path.makeAbsolute(this._settings.cwd, filepath);
            filepath = utils$1.path.unixify(filepath);
        }
        if (this._settings.markDirectories && entry.dirent.isDirectory()) {
            filepath += '/';
        }
        if (!this._settings.objectMode) {
            return filepath;
        }
        return Object.assign(Object.assign({}, entry), { path: filepath });
    }
}
entry.default = EntryTransformer;

Object.defineProperty(provider, "__esModule", { value: true });
const path = k;
const deep_1 = deep;
const entry_1 = entry$1;
const error_1 = error;
const entry_2 = entry;
class Provider {
    constructor(_settings) {
        this._settings = _settings;
        this.errorFilter = new error_1.default(this._settings);
        this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
        this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
        this.entryTransformer = new entry_2.default(this._settings);
    }
    _getRootDirectory(task) {
        return path.resolve(this._settings.cwd, task.base);
    }
    _getReaderOptions(task) {
        const basePath = task.base === '.' ? '' : task.base;
        return {
            basePath,
            pathSegmentSeparator: '/',
            concurrency: this._settings.concurrency,
            deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
            entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
            errorFilter: this.errorFilter.getFilter(),
            followSymbolicLinks: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            stats: this._settings.stats,
            throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
            transform: this.entryTransformer.getTransformer()
        };
    }
    _getMicromatchOptions() {
        return {
            dot: this._settings.dot,
            matchBase: this._settings.baseNameMatch,
            nobrace: !this._settings.braceExpansion,
            nocase: !this._settings.caseSensitiveMatch,
            noext: !this._settings.extglob,
            noglobstar: !this._settings.globstar,
            posix: true,
            strictSlashes: false
        };
    }
}
provider.default = Provider;

Object.defineProperty(async$7, "__esModule", { value: true });
const async_1$1 = async$6;
const provider_1$2 = provider;
class ProviderAsync extends provider_1$2.default {
    constructor() {
        super(...arguments);
        this._reader = new async_1$1.default(this._settings);
    }
    async read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const entries = await this.api(root, task, options);
        return entries.map((entry) => options.transform(entry));
    }
    api(root, task, options) {
        if (task.dynamic) {
            return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
    }
}
async$7.default = ProviderAsync;

var stream = {};

Object.defineProperty(stream, "__esModule", { value: true });
const stream_1$1 = require$$0$1;
const stream_2 = stream$1;
const provider_1$1 = provider;
class ProviderStream extends provider_1$1.default {
    constructor() {
        super(...arguments);
        this._reader = new stream_2.default(this._settings);
    }
    read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const source = this.api(root, task, options);
        const destination = new stream_1$1.Readable({ objectMode: true, read: () => { } });
        source
            .once('error', (error) => destination.emit('error', error))
            .on('data', (entry) => destination.emit('data', options.transform(entry)))
            .once('end', () => destination.emit('end'));
        destination
            .once('close', () => source.destroy());
        return destination;
    }
    api(root, task, options) {
        if (task.dynamic) {
            return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
    }
}
stream.default = ProviderStream;

var sync$1 = {};

var sync = {};

Object.defineProperty(sync, "__esModule", { value: true });
const fsStat = out$1;
const fsWalk = out$3;
const reader_1 = reader;
class ReaderSync extends reader_1.default {
    constructor() {
        super(...arguments);
        this._walkSync = fsWalk.walkSync;
        this._statSync = fsStat.statSync;
    }
    dynamic(root, options) {
        return this._walkSync(root, options);
    }
    static(patterns, options) {
        const entries = [];
        for (const pattern of patterns) {
            const filepath = this._getFullEntryPath(pattern);
            const entry = this._getEntry(filepath, pattern, options);
            if (entry === null || !options.entryFilter(entry)) {
                continue;
            }
            entries.push(entry);
        }
        return entries;
    }
    _getEntry(filepath, pattern, options) {
        try {
            const stats = this._getStat(filepath);
            return this._makeEntry(stats, pattern);
        }
        catch (error) {
            if (options.errorFilter(error)) {
                return null;
            }
            throw error;
        }
    }
    _getStat(filepath) {
        return this._statSync(filepath, this._fsStatSettings);
    }
}
sync.default = ReaderSync;

Object.defineProperty(sync$1, "__esModule", { value: true });
const sync_1$1 = sync;
const provider_1 = provider;
class ProviderSync extends provider_1.default {
    constructor() {
        super(...arguments);
        this._reader = new sync_1$1.default(this._settings);
    }
    read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const entries = this.api(root, task, options);
        return entries.map(options.transform);
    }
    api(root, task, options) {
        if (task.dynamic) {
            return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
    }
}
sync$1.default = ProviderSync;

var settings = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
	const fs = require$$0$2;
	const os = require$$0;
	/**
	 * The `os.cpus` method can return zero. We expect the number of cores to be greater than zero.
	 * https://github.com/nodejs/node/blob/7faeddf23a98c53896f8b574a6e66589e8fb1eb8/lib/os.js#L106-L107
	 */
	const CPU_COUNT = Math.max(os.cpus().length, 1);
	exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
	    lstat: fs.lstat,
	    lstatSync: fs.lstatSync,
	    stat: fs.stat,
	    statSync: fs.statSync,
	    readdir: fs.readdir,
	    readdirSync: fs.readdirSync
	};
	class Settings {
	    constructor(_options = {}) {
	        this._options = _options;
	        this.absolute = this._getValue(this._options.absolute, false);
	        this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
	        this.braceExpansion = this._getValue(this._options.braceExpansion, true);
	        this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
	        this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
	        this.cwd = this._getValue(this._options.cwd, process.cwd());
	        this.deep = this._getValue(this._options.deep, Infinity);
	        this.dot = this._getValue(this._options.dot, false);
	        this.extglob = this._getValue(this._options.extglob, true);
	        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
	        this.fs = this._getFileSystemMethods(this._options.fs);
	        this.globstar = this._getValue(this._options.globstar, true);
	        this.ignore = this._getValue(this._options.ignore, []);
	        this.markDirectories = this._getValue(this._options.markDirectories, false);
	        this.objectMode = this._getValue(this._options.objectMode, false);
	        this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
	        this.onlyFiles = this._getValue(this._options.onlyFiles, true);
	        this.stats = this._getValue(this._options.stats, false);
	        this.suppressErrors = this._getValue(this._options.suppressErrors, false);
	        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
	        this.unique = this._getValue(this._options.unique, true);
	        if (this.onlyDirectories) {
	            this.onlyFiles = false;
	        }
	        if (this.stats) {
	            this.objectMode = true;
	        }
	    }
	    _getValue(option, value) {
	        return option === undefined ? value : option;
	    }
	    _getFileSystemMethods(methods = {}) {
	        return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
	    }
	}
	exports.default = Settings;
} (settings));

const taskManager = tasks;
const patternManager = patterns;
const async_1 = async$7;
const stream_1 = stream;
const sync_1 = sync$1;
const settings_1 = settings;
const utils = utils$b;
async function FastGlob(source, options) {
    assertPatternsInput(source);
    const works = getWorks(source, async_1.default, options);
    const result = await Promise.all(works);
    return utils.array.flatten(result);
}
// https://github.com/typescript-eslint/typescript-eslint/issues/60
// eslint-disable-next-line no-redeclare
(function (FastGlob) {
    function sync(source, options) {
        assertPatternsInput(source);
        const works = getWorks(source, sync_1.default, options);
        return utils.array.flatten(works);
    }
    FastGlob.sync = sync;
    function stream(source, options) {
        assertPatternsInput(source);
        const works = getWorks(source, stream_1.default, options);
        /**
         * The stream returned by the provider cannot work with an asynchronous iterator.
         * To support asynchronous iterators, regardless of the number of tasks, we always multiplex streams.
         * This affects performance (+25%). I don't see best solution right now.
         */
        return utils.stream.merge(works);
    }
    FastGlob.stream = stream;
    function generateTasks(source, options) {
        assertPatternsInput(source);
        const patterns = patternManager.transform([].concat(source));
        const settings = new settings_1.default(options);
        return taskManager.generate(patterns, settings);
    }
    FastGlob.generateTasks = generateTasks;
    function isDynamicPattern(source, options) {
        assertPatternsInput(source);
        const settings = new settings_1.default(options);
        return utils.pattern.isDynamicPattern(source, settings);
    }
    FastGlob.isDynamicPattern = isDynamicPattern;
    function escapePath(source) {
        assertPatternsInput(source);
        return utils.path.escape(source);
    }
    FastGlob.escapePath = escapePath;
})(FastGlob || (FastGlob = {}));
function getWorks(source, _Provider, options) {
    const patterns = patternManager.transform([].concat(source));
    const settings = new settings_1.default(options);
    const tasks = taskManager.generate(patterns, settings);
    const provider = new _Provider(settings);
    return tasks.map(provider.read, provider);
}
function assertPatternsInput(input) {
    const source = [].concat(input);
    const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
    if (!isValidSource) {
        throw new TypeError('Patterns must be a string (non empty) or an array of strings');
    }
}
var out = FastGlob;

class SnapshotManager {
  constructor(options) {
    this.options = options;
    this.summary = void 0;
    this.extension = ".snap";
    this.clear();
  }
  clear() {
    this.summary = emptySummary(this.options);
  }
  add(result) {
    addSnapshotResult(this.summary, result);
  }
  resolvePath(testPath) {
    const resolver = this.options.resolveSnapshotPath || (() => {
      return join(
        join(
          dirname(testPath),
          "__snapshots__"
        ),
        `${basename(testPath)}${this.extension}`
      );
    });
    return resolver(testPath, this.extension);
  }
}
function emptySummary(options) {
  const summary = {
    added: 0,
    failure: false,
    filesAdded: 0,
    filesRemoved: 0,
    filesRemovedList: [],
    filesUnmatched: 0,
    filesUpdated: 0,
    matched: 0,
    total: 0,
    unchecked: 0,
    uncheckedKeysByFile: [],
    unmatched: 0,
    updated: 0,
    didUpdate: options.updateSnapshot === "all"
  };
  return summary;
}
function addSnapshotResult(summary, result) {
  if (result.added)
    summary.filesAdded++;
  if (result.fileDeleted)
    summary.filesRemoved++;
  if (result.unmatched)
    summary.filesUnmatched++;
  if (result.updated)
    summary.filesUpdated++;
  summary.added += result.added;
  summary.matched += result.matched;
  summary.unchecked += result.unchecked;
  if (result.uncheckedKeys && result.uncheckedKeys.length > 0) {
    summary.uncheckedKeysByFile.push({
      filePath: result.filepath,
      keys: result.uncheckedKeys
    });
  }
  summary.unmatched += result.unmatched;
  summary.updated += result.updated;
  summary.total += result.added + result.matched + result.unmatched + result.updated;
}

function A(n){return /^\\\\\?\\/.test(n)?n:n.replace(/\\/g,"/")}function y(n,u){for(;;){const l=k.join(n,u);if(require$$0$2.existsSync(l))return A(l);const e=k.dirname(n);if(e===n)return;n=e;}}const M=/^\.{1,2}(\/.*)?$/,R=n=>A(M.test(n)?n:`./${n}`);function d(n,u=!1){const l=n.length;let e=0,t="",f=0,i=16,b=0,c=0,w=0,T=0,p=0;function V(o,r){let s=0,O=0;for(;s<o||!r;){let m=n.charCodeAt(e);if(m>=48&&m<=57)O=O*16+m-48;else if(m>=65&&m<=70)O=O*16+m-65+10;else if(m>=97&&m<=102)O=O*16+m-97+10;else break;e++,s++;}return s<o&&(O=-1),O}function D(o){e=o,t="",f=0,i=16,p=0;}function v(){let o=e;if(n.charCodeAt(e)===48)e++;else for(e++;e<n.length&&B(n.charCodeAt(e));)e++;if(e<n.length&&n.charCodeAt(e)===46)if(e++,e<n.length&&B(n.charCodeAt(e)))for(e++;e<n.length&&B(n.charCodeAt(e));)e++;else return p=3,n.substring(o,e);let r=e;if(e<n.length&&(n.charCodeAt(e)===69||n.charCodeAt(e)===101))if(e++,(e<n.length&&n.charCodeAt(e)===43||n.charCodeAt(e)===45)&&e++,e<n.length&&B(n.charCodeAt(e))){for(e++;e<n.length&&B(n.charCodeAt(e));)e++;r=e;}else p=3;return n.substring(o,r)}function L(){let o="",r=e;for(;;){if(e>=l){o+=n.substring(r,e),p=2;break}const s=n.charCodeAt(e);if(s===34){o+=n.substring(r,e),e++;break}if(s===92){if(o+=n.substring(r,e),e++,e>=l){p=2;break}switch(n.charCodeAt(e++)){case 34:o+='"';break;case 92:o+="\\";break;case 47:o+="/";break;case 98:o+="\b";break;case 102:o+="\f";break;case 110:o+=`
`;break;case 114:o+="\r";break;case 116:o+="	";break;case 117:const m=V(4,!0);m>=0?o+=String.fromCharCode(m):p=4;break;default:p=5;}r=e;continue}if(s>=0&&s<=31)if(U(s)){o+=n.substring(r,e),p=2;break}else p=6;e++;}return o}function E(){if(t="",p=0,f=e,c=b,T=w,e>=l)return f=l,i=17;let o=n.charCodeAt(e);if(J(o)){do e++,t+=String.fromCharCode(o),o=n.charCodeAt(e);while(J(o));return i=15}if(U(o))return e++,t+=String.fromCharCode(o),o===13&&n.charCodeAt(e)===10&&(e++,t+=`
`),b++,w=e,i=14;switch(o){case 123:return e++,i=1;case 125:return e++,i=2;case 91:return e++,i=3;case 93:return e++,i=4;case 58:return e++,i=6;case 44:return e++,i=5;case 34:return e++,t=L(),i=10;case 47:const r=e-1;if(n.charCodeAt(e+1)===47){for(e+=2;e<l&&!U(n.charCodeAt(e));)e++;return t=n.substring(r,e),i=12}if(n.charCodeAt(e+1)===42){e+=2;const s=l-1;let O=!1;for(;e<s;){const m=n.charCodeAt(e);if(m===42&&n.charCodeAt(e+1)===47){e+=2,O=!0;break}e++,U(m)&&(m===13&&n.charCodeAt(e)===10&&e++,b++,w=e);}return O||(e++,p=1),t=n.substring(r,e),i=13}return t+=String.fromCharCode(o),e++,i=16;case 45:if(t+=String.fromCharCode(o),e++,e===l||!B(n.charCodeAt(e)))return i=16;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return t+=v(),i=11;default:for(;e<l&&W(o);)e++,o=n.charCodeAt(e);if(f!==e){switch(t=n.substring(f,e),t){case"true":return i=8;case"false":return i=9;case"null":return i=7}return i=16}return t+=String.fromCharCode(o),e++,i=16}}function W(o){if(J(o)||U(o))return !1;switch(o){case 125:case 93:case 123:case 91:case 34:case 58:case 44:case 47:return !1}return !0}function _(){let o;do o=E();while(o>=12&&o<=15);return o}return {setPosition:D,getPosition:()=>e,scan:u?_:E,getToken:()=>i,getTokenValue:()=>t,getTokenOffset:()=>f,getTokenLength:()=>e-f,getTokenStartLine:()=>c,getTokenStartCharacter:()=>f-T,getTokenError:()=>p}}function J(n){return n===32||n===9}function U(n){return n===10||n===13}function B(n){return n>=48&&n<=57}var H;(function(n){n[n.lineFeed=10]="lineFeed",n[n.carriageReturn=13]="carriageReturn",n[n.space=32]="space",n[n._0=48]="_0",n[n._1=49]="_1",n[n._2=50]="_2",n[n._3=51]="_3",n[n._4=52]="_4",n[n._5=53]="_5",n[n._6=54]="_6",n[n._7=55]="_7",n[n._8=56]="_8",n[n._9=57]="_9",n[n.a=97]="a",n[n.b=98]="b",n[n.c=99]="c",n[n.d=100]="d",n[n.e=101]="e",n[n.f=102]="f",n[n.g=103]="g",n[n.h=104]="h",n[n.i=105]="i",n[n.j=106]="j",n[n.k=107]="k",n[n.l=108]="l",n[n.m=109]="m",n[n.n=110]="n",n[n.o=111]="o",n[n.p=112]="p",n[n.q=113]="q",n[n.r=114]="r",n[n.s=115]="s",n[n.t=116]="t",n[n.u=117]="u",n[n.v=118]="v",n[n.w=119]="w",n[n.x=120]="x",n[n.y=121]="y",n[n.z=122]="z",n[n.A=65]="A",n[n.B=66]="B",n[n.C=67]="C",n[n.D=68]="D",n[n.E=69]="E",n[n.F=70]="F",n[n.G=71]="G",n[n.H=72]="H",n[n.I=73]="I",n[n.J=74]="J",n[n.K=75]="K",n[n.L=76]="L",n[n.M=77]="M",n[n.N=78]="N",n[n.O=79]="O",n[n.P=80]="P",n[n.Q=81]="Q",n[n.R=82]="R",n[n.S=83]="S",n[n.T=84]="T",n[n.U=85]="U",n[n.V=86]="V",n[n.W=87]="W",n[n.X=88]="X",n[n.Y=89]="Y",n[n.Z=90]="Z",n[n.asterisk=42]="asterisk",n[n.backslash=92]="backslash",n[n.closeBrace=125]="closeBrace",n[n.closeBracket=93]="closeBracket",n[n.colon=58]="colon",n[n.comma=44]="comma",n[n.dot=46]="dot",n[n.doubleQuote=34]="doubleQuote",n[n.minus=45]="minus",n[n.openBrace=123]="openBrace",n[n.openBracket=91]="openBracket",n[n.plus=43]="plus",n[n.slash=47]="slash",n[n.formFeed=12]="formFeed",n[n.tab=9]="tab";})(H||(H={}));var I;(function(n){n.DEFAULT={allowTrailingComma:!1};})(I||(I={}));function C(n,u=[],l=I.DEFAULT){let e=null,t=[];const f=[];function i(c){Array.isArray(t)?t.push(c):e!==null&&(t[e]=c);}return nn(n,{onObjectBegin:()=>{const c={};i(c),f.push(t),t=c,e=null;},onObjectProperty:c=>{e=c;},onObjectEnd:()=>{t=f.pop();},onArrayBegin:()=>{const c=[];i(c),f.push(t),t=c,e=null;},onArrayEnd:()=>{t=f.pop();},onLiteralValue:i,onError:(c,w,T)=>{u.push({error:c,offset:w,length:T});}},l),t[0]}function nn(n,u,l=I.DEFAULT){const e=d(n,!1),t=[];function f(g){return g?()=>g(e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter()):()=>!0}function i(g){return g?()=>g(e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter(),()=>t.slice()):()=>!0}function b(g){return g?a=>g(a,e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter()):()=>!0}function c(g){return g?a=>g(a,e.getTokenOffset(),e.getTokenLength(),e.getTokenStartLine(),e.getTokenStartCharacter(),()=>t.slice()):()=>!0}const w=i(u.onObjectBegin),T=c(u.onObjectProperty),p=f(u.onObjectEnd),V=i(u.onArrayBegin),D=f(u.onArrayEnd),v=c(u.onLiteralValue),L=b(u.onSeparator),E=f(u.onComment),W=b(u.onError),_=l&&l.disallowComments,o=l&&l.allowTrailingComma;function r(){for(;;){const g=e.scan();switch(e.getTokenError()){case 4:s(14);break;case 5:s(15);break;case 3:s(13);break;case 1:_||s(11);break;case 2:s(12);break;case 6:s(16);break}switch(g){case 12:case 13:_?s(10):E();break;case 16:s(1);break;case 15:case 14:break;default:return g}}}function s(g,a=[],z=[]){if(W(g),a.length+z.length>0){let F=e.getToken();for(;F!==17;){if(a.indexOf(F)!==-1){r();break}else if(z.indexOf(F)!==-1)break;F=r();}}}function O(g){const a=e.getTokenValue();return g?v(a):(T(a),t.push(a)),r(),!0}function m(){switch(e.getToken()){case 11:const g=e.getTokenValue();let a=Number(g);isNaN(a)&&(s(2),a=0),v(a);break;case 7:v(null);break;case 8:v(!0);break;case 9:v(!1);break;default:return !1}return r(),!0}function P(){return e.getToken()!==10?(s(3,[],[2,5]),!1):(O(!1),e.getToken()===6?(L(":"),r(),$()||s(4,[],[2,5])):s(5,[],[2,5]),t.pop(),!0)}function q(){w(),r();let g=!1;for(;e.getToken()!==2&&e.getToken()!==17;){if(e.getToken()===5){if(g||s(4,[],[]),L(","),r(),e.getToken()===2&&o)break}else g&&s(6,[],[]);P()||s(4,[],[2,5]),g=!0;}return p(),e.getToken()!==2?s(7,[2],[]):r(),!0}function x(){V(),r();let g=!0,a=!1;for(;e.getToken()!==4&&e.getToken()!==17;){if(e.getToken()===5){if(a||s(4,[],[]),L(","),r(),e.getToken()===4&&o)break}else a&&s(6,[],[]);g?(t.push(0),g=!1):t[t.length-1]++,$()||s(4,[],[4,5]),a=!0;}return D(),g||t.pop(),e.getToken()!==4?s(8,[4],[]):r(),!0}function $(){switch(e.getToken()){case 3:return x();case 1:return q();case 10:return O(!0);default:return m()}}return r(),e.getToken()===17?l.allowEmptyContent?!0:(s(4,[],[]),!1):$()?(e.getToken()!==17&&s(9,[],[]),!0):(s(4,[],[]),!1)}var G;(function(n){n[n.None=0]="None",n[n.UnexpectedEndOfComment=1]="UnexpectedEndOfComment",n[n.UnexpectedEndOfString=2]="UnexpectedEndOfString",n[n.UnexpectedEndOfNumber=3]="UnexpectedEndOfNumber",n[n.InvalidUnicode=4]="InvalidUnicode",n[n.InvalidEscapeCharacter=5]="InvalidEscapeCharacter",n[n.InvalidCharacter=6]="InvalidCharacter";})(G||(G={}));var X;(function(n){n[n.OpenBraceToken=1]="OpenBraceToken",n[n.CloseBraceToken=2]="CloseBraceToken",n[n.OpenBracketToken=3]="OpenBracketToken",n[n.CloseBracketToken=4]="CloseBracketToken",n[n.CommaToken=5]="CommaToken",n[n.ColonToken=6]="ColonToken",n[n.NullKeyword=7]="NullKeyword",n[n.TrueKeyword=8]="TrueKeyword",n[n.FalseKeyword=9]="FalseKeyword",n[n.StringLiteral=10]="StringLiteral",n[n.NumericLiteral=11]="NumericLiteral",n[n.LineCommentTrivia=12]="LineCommentTrivia",n[n.BlockCommentTrivia=13]="BlockCommentTrivia",n[n.LineBreakTrivia=14]="LineBreakTrivia",n[n.Trivia=15]="Trivia",n[n.Unknown=16]="Unknown",n[n.EOF=17]="EOF";})(X||(X={}));const en=C;var Y;(function(n){n[n.InvalidSymbol=1]="InvalidSymbol",n[n.InvalidNumberFormat=2]="InvalidNumberFormat",n[n.PropertyNameExpected=3]="PropertyNameExpected",n[n.ValueExpected=4]="ValueExpected",n[n.ColonExpected=5]="ColonExpected",n[n.CommaExpected=6]="CommaExpected",n[n.CloseBraceExpected=7]="CloseBraceExpected",n[n.CloseBracketExpected=8]="CloseBracketExpected",n[n.EndOfFileExpected=9]="EndOfFileExpected",n[n.InvalidCommentToken=10]="InvalidCommentToken",n[n.UnexpectedEndOfComment=11]="UnexpectedEndOfComment",n[n.UnexpectedEndOfString=12]="UnexpectedEndOfString",n[n.UnexpectedEndOfNumber=13]="UnexpectedEndOfNumber",n[n.InvalidUnicode=14]="InvalidUnicode",n[n.InvalidEscapeCharacter=15]="InvalidEscapeCharacter",n[n.InvalidCharacter=16]="InvalidCharacter";})(Y||(Y={}));const Z=n=>en(require$$0$2.readFileSync(n,"utf8")),{existsSync:N}=require$$0$2,tn=()=>{const{findPnpApi:n}=K;return n&&n(process.cwd())};function h(n){const u=Z(n);return k.join(n,"..",u&&"tsconfig"in u?u.tsconfig:"tsconfig.json")}function ln(n,u){let l=n;const e=n[0]===".";if(e||k.isAbsolute(n)){if(e&&(l===".."&&(l+="/tsconfig.json"),l=k.resolve(u,l)),N(l)&&require$$0$2.statSync(l).isFile()||!l.endsWith(".json")&&(l+=".json",N(l)))return l;throw new Error(`File '${n}' not found.`)}const t=tn();if(t){const{resolveRequest:i}=t,[b,c]=n.split("/"),w=b.startsWith("@")?`${b}/${c}`:b;try{if(w===n){const T=i(k.join(w,"package.json"),u);if(T){const p=h(T);if(N(p))return p}}else {let T;try{T=i(n,u,{extensions:[".json"]});}catch{T=i(k.join(n,"tsconfig.json"),u);}if(T)return T}}catch{}}let f=y(u,k.join("node_modules",l));if(f){if(require$$0$2.statSync(f).isDirectory()){const i=k.join(f,"package.json");if(N(i)?f=h(i):f=k.join(f,"tsconfig.json"),N(f))return f}else if(f.endsWith(".json"))return f}if(!l.endsWith(".json")&&(l+=".json",f=y(u,k.join("node_modules",l)),f))return f;throw new Error(`File '${n}' not found.`)}function Q(n){var u;let l;try{l=require$$0$2.realpathSync(n);}catch{throw new Error(`Cannot resolve tsconfig at path: ${n}`)}const e=k.dirname(l);let t=Z(l)||{};if(typeof t!="object")throw new SyntaxError(`Failed to parse tsconfig at: ${n}`);if(t.extends){const f=ln(t.extends,e),i=Q(f);if(delete i.references,(u=i.compilerOptions)!=null&&u.baseUrl){const{compilerOptions:c}=i;c.baseUrl=k.relative(e,k.join(k.dirname(f),c.baseUrl))||"./";}i.files&&(i.files=i.files.map(c=>k.relative(e,k.join(k.dirname(f),c)))),i.include&&(i.include=i.include.map(c=>k.relative(e,k.join(k.dirname(f),c)))),delete t.extends;const b={...i,...t,compilerOptions:{...i.compilerOptions,...t.compilerOptions}};i.watchOptions&&(b.watchOptions={...i.watchOptions,...t.watchOptions}),t=b;}if(t.compilerOptions){const{compilerOptions:f}=t;f.baseUrl&&(f.baseUrl=R(f.baseUrl)),f.outDir&&(Array.isArray(t.exclude)||(t.exclude=[]),t.exclude.push(f.outDir),f.outDir=R(f.outDir));}else t.compilerOptions={};if(t.files&&(t.files=t.files.map(R)),t.include&&(t.include=t.include.map(A)),t.watchOptions){const{watchOptions:f}=t;f.excludeDirectories&&(f.excludeDirectories=f.excludeDirectories.map(i=>A(k.resolve(e,i))));}return t}function fn(n=process.cwd(),u="tsconfig.json"){const l=y(n,u);if(!l)return null;const e=Q(l);return {path:l,config:e}}

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const newLineRegExp = /\r?\n/;
const errCodeRegExp = /error TS(?<errCode>\d+)/;
async function makeTscErrorInfo(errInfo) {
  var _a;
  const [errFilePathPos = "", ...errMsgRawArr] = errInfo.split(":");
  if (!errFilePathPos || errMsgRawArr.length === 0 || errMsgRawArr.join("").length === 0)
    return ["unknown filepath", null];
  const errMsgRaw = errMsgRawArr.join("").trim();
  const [errFilePath, errPos] = errFilePathPos.slice(0, -1).split("(");
  if (!errFilePath || !errPos)
    return ["unknown filepath", null];
  const [errLine, errCol] = errPos.split(",");
  if (!errLine || !errCol)
    return [errFilePath, null];
  const execArr = errCodeRegExp.exec(errMsgRaw);
  if (!execArr)
    return [errFilePath, null];
  const errCodeStr = ((_a = execArr.groups) == null ? void 0 : _a.errCode) ?? "";
  if (!errCodeStr)
    return [errFilePath, null];
  const line = Number(errLine);
  const col = Number(errCol);
  const errCode = Number(errCodeStr);
  return [
    errFilePath,
    {
      filePath: errFilePath,
      errCode,
      line,
      column: col,
      errMsg: errMsgRaw.slice(`error TS${errCode} `.length)
    }
  ];
}
async function getTsconfig(root, config) {
  var _a;
  const configName = ((_a = config.tsconfig) == null ? void 0 : _a.includes("jsconfig.json")) ? "jsconfig.json" : void 0;
  const tsconfig = fn(config.tsconfig || root, configName);
  if (!tsconfig)
    throw new Error("no tsconfig.json found");
  const tempConfigPath = join(dirname(tsconfig.path), "tsconfig.vitest-temp.json");
  try {
    const tmpTsConfig = { ...tsconfig.config };
    tmpTsConfig.compilerOptions = tmpTsConfig.compilerOptions || {};
    tmpTsConfig.compilerOptions.emitDeclarationOnly = false;
    tmpTsConfig.compilerOptions.incremental = true;
    tmpTsConfig.compilerOptions.tsBuildInfoFile = join(
      __dirname,
      "tsconfig.tmp.tsbuildinfo"
    );
    const tsconfigFinalContent = JSON.stringify(tmpTsConfig, null, 2);
    await writeFile(tempConfigPath, tsconfigFinalContent);
    return { path: tempConfigPath, config: tmpTsConfig };
  } catch (err) {
    throw new Error("failed to write tsconfig.temp.json", { cause: err });
  }
}
async function getRawErrsMapFromTsCompile(tscErrorStdout) {
  const rawErrsMap = /* @__PURE__ */ new Map();
  const infos = await Promise.all(
    tscErrorStdout.split(newLineRegExp).reduce((prev, next) => {
      if (!next)
        return prev;
      else if (!next.startsWith(" "))
        prev.push(next);
      else
        prev[prev.length - 1] += `
${next}`;
      return prev;
    }, []).map((errInfoLine) => makeTscErrorInfo(errInfoLine))
  );
  infos.forEach(([errFilePath, errInfo]) => {
    var _a;
    if (!errInfo)
      return;
    if (!rawErrsMap.has(errFilePath))
      rawErrsMap.set(errFilePath, [errInfo]);
    else
      (_a = rawErrsMap.get(errFilePath)) == null ? void 0 : _a.push(errInfo);
  });
  return rawErrsMap;
}

const createIndexMap = (source) => {
  const map = /* @__PURE__ */ new Map();
  let index = 0;
  let line = 1;
  let column = 1;
  for (const char of source) {
    map.set(`${line}:${column}`, index++);
    if (char === "\n" || char === "\r\n") {
      line++;
      column = 0;
    } else {
      column++;
    }
  }
  return map;
};

async function collectTests(ctx, filepath) {
  const request = await ctx.vitenode.transformRequest(filepath);
  if (!request)
    return null;
  const ast = parse(request.code, {
    ecmaVersion: "latest",
    allowAwaitOutsideFunction: true
  });
  const testFilepath = relative(ctx.config.root, filepath);
  const file = {
    filepath,
    type: "suite",
    id: generateHash(testFilepath),
    name: testFilepath,
    mode: "run",
    tasks: [],
    start: ast.start,
    end: ast.end
  };
  const definitions = [];
  const getName = (callee) => {
    var _a, _b, _c;
    if (!callee)
      return null;
    if (callee.type === "Identifier")
      return callee.name;
    if (callee.type === "MemberExpression") {
      if ((_b = (_a = callee.object) == null ? void 0 : _a.name) == null ? void 0 : _b.startsWith("__vite_ssr_"))
        return getName(callee.property);
      return getName((_c = callee.object) == null ? void 0 : _c.property);
    }
    return null;
  };
  ancestor(ast, {
    CallExpression(node) {
      var _a;
      const { callee } = node;
      const name = getName(callee);
      if (!name)
        return;
      if (!["it", "test", "describe", "suite"].includes(name))
        return;
      const { arguments: [{ value: message }] } = node;
      const property = (_a = callee == null ? void 0 : callee.property) == null ? void 0 : _a.name;
      let mode = !property || property === name ? "run" : property;
      if (!["run", "skip", "todo", "only", "skipIf", "runIf"].includes(mode))
        throw new Error(`${name}.${mode} syntax is not supported when testing types`);
      if (mode === "skipIf" || mode === "runIf")
        mode = "skip";
      definitions.push({
        start: node.start,
        end: node.end,
        name: message,
        type: name === "it" || name === "test" ? "test" : "suite",
        mode
      });
    }
  });
  let lastSuite = file;
  const updateLatestSuite = (index) => {
    const suite = lastSuite;
    while (lastSuite !== file && lastSuite.end < index)
      lastSuite = suite.suite;
    return lastSuite;
  };
  definitions.sort((a, b) => a.start - b.start).forEach((definition) => {
    const latestSuite = updateLatestSuite(definition.start);
    let mode = definition.mode;
    if (latestSuite.mode !== "run")
      mode = latestSuite.mode;
    if (definition.type === "suite") {
      const task2 = {
        type: definition.type,
        id: "",
        suite: latestSuite,
        file,
        tasks: [],
        mode,
        name: definition.name,
        end: definition.end,
        start: definition.start,
        meta: {
          typecheck: true
        }
      };
      definition.task = task2;
      latestSuite.tasks.push(task2);
      lastSuite = task2;
      return;
    }
    const task = {
      type: definition.type,
      id: "",
      suite: latestSuite,
      file,
      mode,
      context: {},
      name: definition.name,
      end: definition.end,
      start: definition.start,
      meta: {
        typecheck: true
      }
    };
    definition.task = task;
    latestSuite.tasks.push(task);
  });
  calculateSuiteHash(file);
  const hasOnly = someTasksAreOnly(file);
  interpretTaskModes(file, ctx.config.testNamePattern, hasOnly, false, ctx.config.allowOnly);
  return {
    file,
    parsed: request.code,
    filepath,
    map: request.map,
    definitions
  };
}

class TypeCheckError extends Error {
  constructor(message, stacks) {
    super(message);
    this.message = message;
    this.stacks = stacks;
    this.name = "TypeCheckError";
  }
}
class Typechecker {
  constructor(ctx, files) {
    this.ctx = ctx;
    this.files = files;
    this._result = {
      files: [],
      sourceErrors: []
    };
    this._tests = {};
  }
  onParseStart(fn) {
    this._onParseStart = fn;
  }
  onParseEnd(fn) {
    this._onParseEnd = fn;
  }
  onWatcherRerun(fn) {
    this._onWatcherRerun = fn;
  }
  async collectFileTests(filepath) {
    return collectTests(this.ctx, filepath);
  }
  getFiles() {
    return this.files.filter((filename) => {
      const extension = extname(filename);
      return extension !== ".js" || this.allowJs;
    });
  }
  async collectTests() {
    const tests = (await Promise.all(
      this.getFiles().map((filepath) => this.collectFileTests(filepath))
    )).reduce((acc, data) => {
      if (!data)
        return acc;
      acc[data.filepath] = data;
      return acc;
    }, {});
    this._tests = tests;
    return tests;
  }
  markPassed(file) {
    var _a;
    if (!((_a = file.result) == null ? void 0 : _a.state)) {
      file.result = {
        state: "pass"
      };
    }
    const markTasks = (tasks) => {
      var _a2;
      for (const task of tasks) {
        if ("tasks" in task)
          markTasks(task.tasks);
        if (!((_a2 = task.result) == null ? void 0 : _a2.state) && task.mode === "run") {
          task.result = {
            state: "pass"
          };
        }
      }
    };
    markTasks(file.tasks);
  }
  async prepareResults(output) {
    const typeErrors = await this.parseTscLikeOutput(output);
    const testFiles = new Set(this.getFiles());
    if (!this._tests)
      this._tests = await this.collectTests();
    const sourceErrors = [];
    const files = [];
    testFiles.forEach((path) => {
      const { file, definitions, map, parsed } = this._tests[path];
      const errors = typeErrors.get(path);
      files.push(file);
      if (!errors) {
        this.markPassed(file);
        return;
      }
      const sortedDefinitions = [...definitions.sort((a, b) => b.start - a.start)];
      const mapConsumer = map && new SourceMapConsumer(map);
      const indexMap = createIndexMap(parsed);
      const markState = (task, state) => {
        task.result = {
          state: task.mode === "run" || task.mode === "only" ? state : task.mode
        };
        if (task.suite)
          markState(task.suite, state);
      };
      errors.forEach(({ error, originalError }) => {
        var _a;
        const originalPos = (mapConsumer == null ? void 0 : mapConsumer.generatedPositionFor({
          line: originalError.line,
          column: originalError.column,
          source: path
        })) || originalError;
        const index = indexMap.get(`${originalPos.line}:${originalPos.column}`);
        const definition = index != null && sortedDefinitions.find((def) => def.start <= index && def.end >= index);
        const suite = definition ? definition.task : file;
        const state = suite.mode === "run" || suite.mode === "only" ? "fail" : suite.mode;
        const errors2 = ((_a = suite.result) == null ? void 0 : _a.errors) || [];
        suite.result = {
          state,
          errors: errors2
        };
        errors2.push(error);
        if (state === "fail" && suite.suite)
          markState(suite.suite, "fail");
      });
      this.markPassed(file);
    });
    typeErrors.forEach((errors, path) => {
      if (!testFiles.has(path))
        sourceErrors.push(...errors.map(({ error }) => error));
    });
    return {
      files,
      sourceErrors
    };
  }
  async parseTscLikeOutput(output) {
    const errorsMap = await getRawErrsMapFromTsCompile(output);
    const typesErrors = /* @__PURE__ */ new Map();
    errorsMap.forEach((errors, path) => {
      const filepath = resolve(this.ctx.config.root, path);
      const suiteErrors = errors.map((info) => {
        const limit = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        const error = new TypeCheckError(info.errMsg, [
          {
            file: filepath,
            line: info.line,
            column: info.column,
            method: ""
          }
        ]);
        Error.stackTraceLimit = limit;
        return {
          originalError: info,
          error
        };
      });
      typesErrors.set(filepath, suiteErrors);
    });
    return typesErrors;
  }
  async clear() {
    if (this.tempConfigPath)
      await rm(this.tempConfigPath, { force: true });
  }
  async stop() {
    var _a;
    await this.clear();
    (_a = this.process) == null ? void 0 : _a.kill();
  }
  async ensurePackageInstalled(root, checker) {
    if (checker !== "tsc" && checker !== "vue-tsc")
      return;
    const packageName = checker === "tsc" ? "typescript" : "vue-tsc";
    await ensurePackageInstalled(packageName, root);
  }
  async prepare() {
    const { root, typecheck } = this.ctx.config;
    await this.ensurePackageInstalled(root, typecheck.checker);
    const { config, path } = await getTsconfig(root, typecheck);
    this.tempConfigPath = path;
    this.allowJs = typecheck.allowJs || config.allowJs || false;
  }
  async start() {
    var _a, _b, _c;
    if (!this.tempConfigPath)
      throw new Error("tsconfig was not initialized");
    const { root, watch, typecheck } = this.ctx.config;
    const args = ["--noEmit", "--pretty", "false", "-p", this.tempConfigPath];
    if (watch)
      args.push("--watch");
    if (typecheck.allowJs)
      args.push("--allowJs", "--checkJs");
    let output = "";
    const child = execa(typecheck.checker, args, {
      cwd: root,
      stdout: "pipe",
      reject: false
    });
    this.process = child;
    await ((_a = this._onParseStart) == null ? void 0 : _a.call(this));
    let rerunTriggered = false;
    (_b = child.stdout) == null ? void 0 : _b.on("data", (chunk) => {
      var _a2;
      output += chunk;
      if (!watch)
        return;
      if (output.includes("File change detected") && !rerunTriggered) {
        (_a2 = this._onWatcherRerun) == null ? void 0 : _a2.call(this);
        this._result.sourceErrors = [];
        this._result.files = [];
        this._tests = null;
        rerunTriggered = true;
      }
      if (/Found \w+ errors*. Watching for/.test(output)) {
        rerunTriggered = false;
        this.prepareResults(output).then((result) => {
          var _a3;
          this._result = result;
          (_a3 = this._onParseEnd) == null ? void 0 : _a3.call(this, result);
        });
        output = "";
      }
    });
    if (!watch) {
      await child;
      this._result = await this.prepareResults(output);
      await ((_c = this._onParseEnd) == null ? void 0 : _c.call(this, this._result));
    }
  }
  getResult() {
    return this._result;
  }
  getTestFiles() {
    return Object.values(this._tests || {}).map((i) => i.file);
  }
  getTestPacks() {
    return Object.values(this._tests || {}).map(({ file }) => getTasks(file)).flat().map((i) => [i.id, void 0]);
  }
}

const workerPath = url.pathToFileURL(resolve(distDir, "./worker.js")).href;
const loaderPath = url.pathToFileURL(resolve(distDir, "./loader.js")).href;
const suppressLoaderWarningsPath = resolve(rootDir, "./suppress-warnings.cjs");
function createPool(ctx) {
  var _a, _b, _c;
  const threadsCount = ctx.config.watch ? Math.max(Math.floor(cpus().length / 2), 1) : Math.max(cpus().length - 1, 1);
  const maxThreads = ctx.config.maxThreads ?? threadsCount;
  const minThreads = ctx.config.minThreads ?? threadsCount;
  const conditions = ((_a = ctx.server.config.resolve.conditions) == null ? void 0 : _a.flatMap((c) => ["--conditions", c])) || [];
  const execArgv = process.execArgv.filter(
    (execArg) => execArg.startsWith("--cpu-prof") || execArg.startsWith("--heap-prof")
  );
  const options = {
    filename: workerPath,
    useAtomics: false,
    maxThreads,
    minThreads,
    execArgv: ctx.config.deps.registerNodeLoader ? [
      ...execArgv,
      "--require",
      suppressLoaderWarningsPath,
      "--experimental-loader",
      loaderPath,
      ...conditions
    ] : [
      ...execArgv,
      ...conditions
    ]
  };
  if (ctx.config.isolate) {
    options.isolateWorkers = true;
    options.concurrentTasksPerWorker = 1;
  }
  if (!ctx.config.threads) {
    options.concurrentTasksPerWorker = 1;
    options.maxThreads = 1;
    options.minThreads = 1;
  }
  (_c = (_b = ctx.coverageProvider) == null ? void 0 : _b.onBeforeFilesRun) == null ? void 0 : _c.call(_b);
  options.env = {
    TEST: "true",
    VITEST: "true",
    NODE_ENV: ctx.config.mode || "test",
    VITEST_MODE: ctx.config.watch ? "WATCH" : "RUN",
    ...process.env,
    ...ctx.config.env
  };
  const pool = new Tinypool(options);
  const runWithFiles = (name) => {
    let id = 0;
    async function runFiles(config, files, invalidates = []) {
      ctx.state.clearFiles(files);
      const { workerPort, port } = createChannel(ctx);
      const workerId = ++id;
      const data = {
        port: workerPort,
        config,
        files,
        invalidates,
        workerId
      };
      try {
        await pool.run(data, { transferList: [workerPort], name });
      } finally {
        port.close();
        workerPort.close();
      }
    }
    const Sequencer = ctx.config.sequence.sequencer;
    const sequencer = new Sequencer(ctx);
    return async (files, invalidates) => {
      const config = ctx.getSerializableConfig();
      if (config.shard)
        files = await sequencer.shard(files);
      files = await sequencer.sort(files);
      if (!ctx.config.threads) {
        await runFiles(config, files);
      } else {
        const results = await Promise.allSettled(files.map((file) => runFiles(config, [file], invalidates)));
        const errors = results.filter((r) => r.status === "rejected").map((r) => r.reason);
        if (errors.length > 0)
          throw new AggregateErrorPonyfill(errors, "Errors occurred while running tests. For more information, see serialized error.");
      }
    };
  };
  return {
    runTests: runWithFiles("run"),
    close: async () => {
      var _a2;
      const nodeVersion = Number((_a2 = process.version.match(/v(\d+)\.(\d+)/)) == null ? void 0 : _a2[0].slice(1));
      if (nodeVersion >= 16.17)
        await Promise.all(pool.threads.map((w) => w.terminate()));
    }
  };
}
function createChannel(ctx) {
  const channel = new MessageChannel();
  const port = channel.port2;
  const workerPort = channel.port1;
  createBirpc(
    {
      async onWorkerExit(error, code) {
        await ctx.logger.printError(error, false, "Unexpected Exit");
        process.exit(code || 1);
      },
      snapshotSaved(snapshot) {
        ctx.snapshot.add(snapshot);
      },
      resolveSnapshotPath(testPath) {
        return ctx.snapshot.resolvePath(testPath);
      },
      async getSourceMap(id, force) {
        if (force) {
          const mod = ctx.server.moduleGraph.getModuleById(id);
          if (mod)
            ctx.server.moduleGraph.invalidateModule(mod);
        }
        const r = await ctx.vitenode.transformRequest(id);
        return r == null ? void 0 : r.map;
      },
      fetch(id) {
        return ctx.vitenode.fetchModule(id);
      },
      resolveId(id, importer) {
        return ctx.vitenode.resolveId(id, importer);
      },
      onPathsCollected(paths) {
        ctx.state.collectPaths(paths);
        ctx.report("onPathsCollected", paths);
      },
      onCollected(files) {
        ctx.state.collectFiles(files);
        ctx.report("onCollected", files);
      },
      onAfterSuiteRun(meta) {
        var _a;
        (_a = ctx.coverageProvider) == null ? void 0 : _a.onAfterSuiteRun(meta);
      },
      onTaskUpdate(packs) {
        ctx.state.updateTasks(packs);
        ctx.report("onTaskUpdate", packs);
      },
      onUserConsoleLog(log) {
        ctx.state.updateUserLog(log);
        ctx.report("onUserConsoleLog", log);
      },
      onUnhandledError(err, type) {
        ctx.state.catchError(err, type);
      },
      onFinished(files) {
        ctx.report("onFinished", files, ctx.state.getUnhandledErrors());
      }
    },
    {
      post(v) {
        port.postMessage(v);
      },
      on(fn) {
        port.on("message", fn);
      }
    }
  );
  return { workerPort, port };
}

const F_RIGHT = "\u2192";
const F_DOWN = "\u2193";
const F_DOWN_RIGHT = "\u21B3";
const F_POINTER = "\u276F";
const F_DOT = "\xB7";
const F_CHECK = "\u2713";
const F_CROSS = "\xD7";
const F_LONG_DASH = "\u23AF";

const spinnerMap = /* @__PURE__ */ new WeakMap();
const hookSpinnerMap = /* @__PURE__ */ new WeakMap();
const pointer = c.yellow(F_POINTER);
const skipped = c.dim(c.gray(F_DOWN));
function getCols(delta = 0) {
  var _a;
  let length = (_a = process.stdout) == null ? void 0 : _a.columns;
  if (!length || isNaN(length))
    length = 30;
  return Math.max(length + delta, 0);
}
function divider(text, left, right) {
  const cols = getCols();
  if (text) {
    const textLength = stripAnsi(text).length;
    if (left == null && right != null) {
      left = cols - textLength - right;
    } else {
      left = left ?? Math.floor((cols - textLength) / 2);
      right = cols - textLength - left;
    }
    left = Math.max(0, left);
    right = Math.max(0, right);
    return `${F_LONG_DASH.repeat(left)}${text}${F_LONG_DASH.repeat(right)}`;
  }
  return F_LONG_DASH.repeat(cols);
}
function formatTestPath(root, path) {
  var _a;
  if (isAbsolute(path))
    path = relative(root, path);
  const dir = dirname(path);
  const ext = ((_a = path.match(/(\.(spec|test)\.[cm]?[tj]sx?)$/)) == null ? void 0 : _a[0]) || "";
  const base = basename(path, ext);
  return slash$1(c.dim(`${dir}/`) + c.bold(base)) + c.dim(ext);
}
function renderSnapshotSummary(rootDir, snapshots) {
  const summary = [];
  if (snapshots.added)
    summary.push(c.bold(c.green(`${snapshots.added} written`)));
  if (snapshots.unmatched)
    summary.push(c.bold(c.red(`${snapshots.unmatched} failed`)));
  if (snapshots.updated)
    summary.push(c.bold(c.green(`${snapshots.updated} updated `)));
  if (snapshots.filesRemoved) {
    if (snapshots.didUpdate)
      summary.push(c.bold(c.green(`${snapshots.filesRemoved} files removed `)));
    else
      summary.push(c.bold(c.yellow(`${snapshots.filesRemoved} files obsolete `)));
  }
  if (snapshots.filesRemovedList && snapshots.filesRemovedList.length) {
    const [head, ...tail] = snapshots.filesRemovedList;
    summary.push(`${c.gray(F_DOWN_RIGHT)} ${formatTestPath(rootDir, head)}`);
    tail.forEach((key) => {
      summary.push(`  ${c.gray(F_DOT)} ${formatTestPath(rootDir, key)}`);
    });
  }
  if (snapshots.unchecked) {
    if (snapshots.didUpdate)
      summary.push(c.bold(c.green(`${snapshots.unchecked} removed`)));
    else
      summary.push(c.bold(c.yellow(`${snapshots.unchecked} obsolete`)));
    snapshots.uncheckedKeysByFile.forEach((uncheckedFile) => {
      summary.push(`${c.gray(F_DOWN_RIGHT)} ${formatTestPath(rootDir, uncheckedFile.filePath)}`);
      uncheckedFile.keys.forEach((key) => summary.push(`  ${c.gray(F_DOT)} ${key}`));
    });
  }
  return summary;
}
function countTestErrors(tasks) {
  return tasks.reduce((c2, i) => {
    var _a, _b;
    return c2 + (((_b = (_a = i.result) == null ? void 0 : _a.errors) == null ? void 0 : _b.length) || 0);
  }, 0);
}
function getStateString(tasks, name = "tests", showTotal = true) {
  if (tasks.length === 0)
    return c.dim(`no ${name}`);
  const passed = tasks.filter((i) => {
    var _a;
    return ((_a = i.result) == null ? void 0 : _a.state) === "pass";
  });
  const failed = tasks.filter((i) => {
    var _a;
    return ((_a = i.result) == null ? void 0 : _a.state) === "fail";
  });
  const skipped2 = tasks.filter((i) => i.mode === "skip");
  const todo = tasks.filter((i) => i.mode === "todo");
  return [
    failed.length ? c.bold(c.red(`${failed.length} failed`)) : null,
    passed.length ? c.bold(c.green(`${passed.length} passed`)) : null,
    skipped2.length ? c.yellow(`${skipped2.length} skipped`) : null,
    todo.length ? c.gray(`${todo.length} todo`) : null
  ].filter(Boolean).join(c.dim(" | ")) + (showTotal ? c.gray(` (${tasks.length})`) : "");
}
function getStateSymbol(task) {
  if (task.mode === "skip" || task.mode === "todo")
    return skipped;
  if (!task.result)
    return c.gray("\xB7");
  if (task.result.state === "run") {
    if (task.type === "suite")
      return pointer;
    let spinner = spinnerMap.get(task);
    if (!spinner) {
      spinner = elegantSpinner();
      spinnerMap.set(task, spinner);
    }
    return c.yellow(spinner());
  }
  if (task.result.state === "pass") {
    return task.type === "benchmark" ? c.green(F_DOT) : c.green(F_CHECK);
  }
  if (task.result.state === "fail") {
    return task.type === "suite" ? pointer : c.red(F_CROSS);
  }
  return " ";
}
function getHookStateSymbol(task, hookName) {
  var _a, _b;
  const state = (_b = (_a = task.result) == null ? void 0 : _a.hooks) == null ? void 0 : _b[hookName];
  if (state && state === "run") {
    let spinnerMap2 = hookSpinnerMap.get(task);
    if (!spinnerMap2) {
      spinnerMap2 = /* @__PURE__ */ new Map();
      hookSpinnerMap.set(task, spinnerMap2);
    }
    let spinner = spinnerMap2.get(hookName);
    if (!spinner) {
      spinner = elegantSpinner();
      spinnerMap2.set(hookName, spinner);
    }
    return c.yellow(spinner());
  }
}
const spinnerFrames = process.platform === "win32" ? ["-", "\\", "|", "/"] : ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"];
function elegantSpinner() {
  let index = 0;
  return () => {
    index = ++index % spinnerFrames.length;
    return spinnerFrames[index];
  };
}
function formatTimeString(date) {
  return date.toTimeString().split(" ")[0];
}
function formatProjectName(name, suffix = " ") {
  if (!name)
    return "";
  const index = name.split("").reduce((acc, v, idx) => acc + v.charCodeAt(0) + idx, 0);
  const colors = [
    c.blue,
    c.yellow,
    c.cyan,
    c.green,
    c.magenta
  ];
  return colors[index % colors.length](`|${name}|`) + suffix;
}

var _a;
const BADGE_PADDING = "       ";
const HELP_HINT = `${c.dim("press ")}${c.bold("h")}${c.dim(" to show help")}`;
const HELP_UPDATE_SNAP = c.dim("press ") + c.bold(c.yellow("u")) + c.dim(" to update snapshot");
const HELP_QUITE = `${c.dim("press ")}${c.bold("q")}${c.dim(" to quit")}`;
const WAIT_FOR_CHANGE_PASS = `
${c.bold(c.inverse(c.green(" PASS ")))}${c.green(" Waiting for file changes...")}`;
const WAIT_FOR_CHANGE_FAIL = `
${c.bold(c.inverse(c.red(" FAIL ")))}${c.red(" Tests failed. Watching for file changes...")}`;
const LAST_RUN_LOG_TIMEOUT = 1500;
class BaseReporter {
  constructor() {
    this.start = 0;
    this.end = 0;
    this.isTTY = isNode && ((_a = process.stdout) == null ? void 0 : _a.isTTY) && !isCI;
    this.ctx = void 0;
    this._filesInWatchMode = /* @__PURE__ */ new Map();
    this._lastRunTimeout = 0;
    this._lastRunCount = 0;
    this._timeStart = new Date();
    this.registerUnhandledRejection();
  }
  get mode() {
    return this.ctx.config.mode;
  }
  onInit(ctx) {
    this.ctx = ctx;
    ctx.logger.printBanner();
    this.start = performance.now();
  }
  relative(path) {
    return relativePath(this.ctx.config.root, path);
  }
  async onFinished(files = this.ctx.state.getFiles(), errors = this.ctx.state.getUnhandledErrors()) {
    this.end = performance.now();
    await this.reportSummary(files);
    if (errors.length) {
      if (!this.ctx.config.dangerouslyIgnoreUnhandledErrors)
        process.exitCode = 1;
      await this.ctx.logger.printUnhandledErrors(errors);
    }
  }
  onTaskUpdate(packs) {
    var _a2, _b, _c, _d;
    if (this.isTTY)
      return;
    const logger = this.ctx.logger;
    for (const pack of packs) {
      const task = this.ctx.state.idMap.get(pack[0]);
      if (task && "filepath" in task && ((_a2 = task.result) == null ? void 0 : _a2.state) && ((_b = task.result) == null ? void 0 : _b.state) !== "run") {
        const tests = getTests(task);
        const failed = tests.filter((t) => {
          var _a3;
          return ((_a3 = t.result) == null ? void 0 : _a3.state) === "fail";
        });
        const skipped = tests.filter((t) => t.mode === "skip" || t.mode === "todo");
        let state = c.dim(`${tests.length} test${tests.length > 1 ? "s" : ""}`);
        if (failed.length)
          state += ` ${c.dim("|")} ${c.red(`${failed.length} failed`)}`;
        if (skipped.length)
          state += ` ${c.dim("|")} ${c.yellow(`${skipped.length} skipped`)}`;
        let suffix = c.dim(" (") + state + c.dim(")");
        if (task.result.duration) {
          const color = task.result.duration > this.ctx.config.slowTestThreshold ? c.yellow : c.gray;
          suffix += color(` ${Math.round(task.result.duration)}${c.dim("ms")}`);
        }
        if (this.ctx.config.logHeapUsage && task.result.heap != null)
          suffix += c.magenta(` ${Math.floor(task.result.heap / 1024 / 1024)} MB heap used`);
        logger.log(` ${getStateSymbol(task)} ${task.name} ${suffix}`);
        for (const test of failed) {
          logger.log(c.red(`   ${pointer} ${getFullName(test)}`));
          (_d = (_c = test.result) == null ? void 0 : _c.errors) == null ? void 0 : _d.forEach((e) => {
            logger.log(c.red(`     ${F_RIGHT} ${e == null ? void 0 : e.message}`));
          });
        }
      }
    }
  }
  async onWatcherStart(files = this.ctx.state.getFiles(), errors = this.ctx.state.getUnhandledErrors()) {
    this.resetLastRunLog();
    const failed = errors.length > 0 || hasFailed(files);
    const failedSnap = hasFailedSnapshot(files);
    if (failed)
      this.ctx.logger.log(WAIT_FOR_CHANGE_FAIL);
    else
      this.ctx.logger.log(WAIT_FOR_CHANGE_PASS);
    const hints = [];
    if (this.mode !== "typecheck")
      hints.push(HELP_HINT);
    if (failedSnap)
      hints.unshift(HELP_UPDATE_SNAP);
    else
      hints.push(HELP_QUITE);
    this.ctx.logger.log(BADGE_PADDING + hints.join(c.dim(", ")));
    if (this._lastRunCount) {
      const LAST_RUN_TEXT = `rerun x${this._lastRunCount}`;
      const LAST_RUN_TEXTS = [
        c.blue(LAST_RUN_TEXT),
        c.gray(LAST_RUN_TEXT),
        c.dim(c.gray(LAST_RUN_TEXT))
      ];
      this.ctx.logger.logUpdate(BADGE_PADDING + LAST_RUN_TEXTS[0]);
      this._lastRunTimeout = 0;
      this._lastRunTimer = safeSetInterval(
        () => {
          this._lastRunTimeout += 1;
          if (this._lastRunTimeout >= LAST_RUN_TEXTS.length)
            this.resetLastRunLog();
          else
            this.ctx.logger.logUpdate(BADGE_PADDING + LAST_RUN_TEXTS[this._lastRunTimeout]);
        },
        LAST_RUN_LOG_TIMEOUT / LAST_RUN_TEXTS.length
      );
    }
  }
  resetLastRunLog() {
    safeClearInterval(this._lastRunTimer);
    this._lastRunTimer = void 0;
    this.ctx.logger.logUpdate.clear();
  }
  async onWatcherRerun(files, trigger) {
    this.resetLastRunLog();
    this.watchFilters = files;
    files.forEach((filepath) => {
      let reruns = this._filesInWatchMode.get(filepath) ?? 0;
      this._filesInWatchMode.set(filepath, ++reruns);
    });
    const BADGE = c.inverse(c.bold(c.blue(" RERUN ")));
    const TRIGGER = trigger ? c.dim(` ${this.relative(trigger)}`) : "";
    if (files.length > 1) {
      this.ctx.logger.clearFullScreen(`
${BADGE}${TRIGGER}
`);
      this._lastRunCount = 0;
    } else if (files.length === 1) {
      const rerun = this._filesInWatchMode.get(files[0]) ?? 1;
      this._lastRunCount = rerun;
      this.ctx.logger.clearFullScreen(`
${BADGE}${TRIGGER} ${c.blue(`x${rerun}`)}
`);
    }
    this._timeStart = new Date();
    this.start = performance.now();
  }
  onUserConsoleLog(log) {
    if (!this.shouldLog(log))
      return;
    const task = log.taskId ? this.ctx.state.idMap.get(log.taskId) : void 0;
    this.ctx.logger.log(c.gray(log.type + c.dim(` | ${task ? getFullName(task) : "unknown test"}`)));
    process[log.type].write(`${log.content}
`);
  }
  shouldLog(log) {
    var _a2, _b;
    if (this.ctx.config.silent)
      return false;
    const shouldLog = (_b = (_a2 = this.ctx.config).onConsoleLog) == null ? void 0 : _b.call(_a2, log.content, log.type);
    if (shouldLog === false)
      return shouldLog;
    return true;
  }
  onServerRestart(reason) {
    this.ctx.logger.log(c.bold(c.magenta(
      reason === "config" ? "\nRestarting due to config changes..." : "\nRestarting Vitest..."
    )));
  }
  async reportSummary(files) {
    await this.printErrorsSummary(files);
    if (this.mode === "benchmark")
      await this.reportBenchmarkSummary(files);
    else
      await this.reportTestSummary(files);
  }
  async reportTestSummary(files) {
    const tests = getTests(files);
    const logger = this.ctx.logger;
    const executionTime = this.end - this.start;
    const collectTime = files.reduce((acc, test) => acc + Math.max(0, test.collectDuration || 0), 0);
    const setupTime = files.reduce((acc, test) => acc + Math.max(0, test.setupDuration || 0), 0);
    const testsTime = files.reduce((acc, test) => {
      var _a2;
      return acc + Math.max(0, ((_a2 = test.result) == null ? void 0 : _a2.duration) || 0);
    }, 0);
    const transformTime = Array.from(this.ctx.vitenode.fetchCache.values()).reduce((a, b) => a + ((b == null ? void 0 : b.duration) || 0), 0);
    const threadTime = collectTime + testsTime + setupTime;
    const padTitle = (str) => c.dim(`${str.padStart(11)} `);
    const time = (time2) => {
      if (time2 > 1e3)
        return `${(time2 / 1e3).toFixed(2)}s`;
      return `${Math.round(time2)}ms`;
    };
    const snapshotOutput = renderSnapshotSummary(this.ctx.config.root, this.ctx.snapshot.summary);
    if (snapshotOutput.length) {
      logger.log(snapshotOutput.map(
        (t, i) => i === 0 ? `${padTitle("Snapshots")} ${t}` : `${padTitle("")} ${t}`
      ).join("\n"));
      if (snapshotOutput.length > 1)
        logger.log();
    }
    logger.log(padTitle("Test Files"), getStateString(files));
    logger.log(padTitle("Tests"), getStateString(tests));
    if (this.mode === "typecheck") {
      const failed = tests.filter((t) => {
        var _a2, _b, _c;
        return ((_a2 = t.meta) == null ? void 0 : _a2.typecheck) && ((_c = (_b = t.result) == null ? void 0 : _b.errors) == null ? void 0 : _c.length);
      });
      logger.log(padTitle("Type Errors"), failed.length ? c.bold(c.red(`${failed.length} failed`)) : c.dim("no errors"));
    }
    logger.log(padTitle("Start at"), formatTimeString(this._timeStart));
    if (this.watchFilters)
      logger.log(padTitle("Duration"), time(threadTime));
    else if (this.mode === "typecheck")
      logger.log(padTitle("Duration"), time(executionTime));
    else
      logger.log(padTitle("Duration"), time(executionTime) + c.dim(` (transform ${time(transformTime)}, setup ${time(setupTime)}, collect ${time(collectTime)}, tests ${time(testsTime)})`));
    logger.log();
  }
  async printErrorsSummary(files) {
    const logger = this.ctx.logger;
    const suites = getSuites(files);
    const tests = getTests(files);
    const failedSuites = suites.filter((i) => {
      var _a2;
      return (_a2 = i.result) == null ? void 0 : _a2.errors;
    });
    const failedTests = tests.filter((i) => {
      var _a2;
      return ((_a2 = i.result) == null ? void 0 : _a2.state) === "fail";
    });
    const failedTotal = countTestErrors(failedSuites) + countTestErrors(failedTests);
    let current = 1;
    const errorDivider = () => logger.error(`${c.red(c.dim(divider(`[${current++}/${failedTotal}]`, void 0, 1)))}
`);
    if (failedSuites.length) {
      logger.error(c.red(divider(c.bold(c.inverse(` Failed Suites ${failedSuites.length} `)))));
      logger.error();
      await this.printTaskErrors(failedSuites, errorDivider);
    }
    if (failedTests.length) {
      logger.error(c.red(divider(c.bold(c.inverse(` Failed Tests ${failedTests.length} `)))));
      logger.error();
      await this.printTaskErrors(failedTests, errorDivider);
    }
    return tests;
  }
  async reportBenchmarkSummary(files) {
    const logger = this.ctx.logger;
    const benchs = getTests(files);
    const topBenchs = benchs.filter((i) => {
      var _a2, _b;
      return ((_b = (_a2 = i.result) == null ? void 0 : _a2.benchmark) == null ? void 0 : _b.rank) === 1;
    });
    logger.log(`
${c.cyan(c.inverse(c.bold(" BENCH ")))} ${c.cyan("Summary")}
`);
    for (const bench of topBenchs) {
      const group = bench.suite;
      if (!group)
        continue;
      const groupName = getFullName(group);
      logger.log(`  ${bench.name}${c.dim(` - ${groupName}`)}`);
      const siblings = group.tasks.filter((i) => {
        var _a2;
        return ((_a2 = i.result) == null ? void 0 : _a2.benchmark) && i !== bench;
      }).sort((a, b) => a.result.benchmark.rank - b.result.benchmark.rank);
      for (const sibling of siblings) {
        const number = `${(sibling.result.benchmark.mean / bench.result.benchmark.mean).toFixed(2)}x`;
        logger.log(`    ${c.green(number)} ${c.gray("faster than")} ${sibling.name}`);
      }
      logger.log("");
    }
  }
  async printTaskErrors(tasks, errorDivider) {
    var _a2, _b, _c;
    const errorsQueue = [];
    for (const task of tasks) {
      (_b = (_a2 = task.result) == null ? void 0 : _a2.errors) == null ? void 0 : _b.forEach((error) => {
        const errorItem = (error == null ? void 0 : error.stackStr) && errorsQueue.find((i) => {
          var _a3;
          return ((_a3 = i[0]) == null ? void 0 : _a3.stackStr) === error.stackStr;
        });
        if (errorItem)
          errorItem[1].push(task);
        else
          errorsQueue.push([error, [task]]);
      });
    }
    for (const [error, tasks2] of errorsQueue) {
      for (const task of tasks2) {
        const filepath = (task == null ? void 0 : task.filepath) || "";
        const projectName = (task == null ? void 0 : task.projectName) || ((_c = task.file) == null ? void 0 : _c.projectName);
        let name = getFullName(task);
        if (filepath)
          name = `${name} ${c.dim(`[ ${this.relative(filepath)} ]`)}`;
        this.ctx.logger.error(`${c.red(c.bold(c.inverse(" FAIL ")))} ${formatProjectName(projectName)}${name}`);
      }
      await this.ctx.logger.printError(error);
      errorDivider();
      await Promise.resolve();
    }
  }
  registerUnhandledRejection() {
    process.on("unhandledRejection", async (err) => {
      process.exitCode = 1;
      await this.ctx.logger.printError(err, true, "Unhandled Rejection");
      this.ctx.logger.error("\n\n");
      process.exit(1);
    });
  }
}

class BasicReporter extends BaseReporter {
  constructor() {
    super(...arguments);
    this.isTTY = false;
  }
  reportSummary(files) {
    this.ctx.logger.log();
    return super.reportSummary(files);
  }
}

const DURATION_LONG$1 = 300;
const outputMap$1 = /* @__PURE__ */ new WeakMap();
function formatFilepath$1(path) {
  const lastSlash = Math.max(path.lastIndexOf("/") + 1, 0);
  const basename = path.slice(lastSlash);
  let firstDot = basename.indexOf(".");
  if (firstDot < 0)
    firstDot = basename.length;
  firstDot += lastSlash;
  return c.dim(path.slice(0, lastSlash)) + path.slice(lastSlash, firstDot) + c.dim(path.slice(firstDot));
}
function formatNumber$1(number) {
  const res = String(number.toFixed(number < 100 ? 4 : 2)).split(".");
  return res[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ",") + (res[1] ? `.${res[1]}` : "");
}
function renderHookState(task, hookName, level = 0) {
  var _a, _b;
  const state = (_b = (_a = task.result) == null ? void 0 : _a.hooks) == null ? void 0 : _b[hookName];
  if (state && state === "run")
    return `${"  ".repeat(level)} ${getHookStateSymbol(task, hookName)} ${c.dim(`[ ${hookName} ]`)}`;
  return "";
}
function renderBenchmarkItems$1(result) {
  return [
    result.name,
    formatNumber$1(result.hz || 0),
    formatNumber$1(result.p99 || 0),
    `\xB1${result.rme.toFixed(2)}%`,
    result.samples.length.toString()
  ];
}
function renderBenchmark$1(task, tasks) {
  var _a;
  const result = (_a = task.result) == null ? void 0 : _a.benchmark;
  if (!result)
    return task.name;
  const benchs = tasks.map((i) => {
    var _a2;
    return i.type === "benchmark" ? (_a2 = i.result) == null ? void 0 : _a2.benchmark : void 0;
  }).filter(notNullish);
  const allItems = benchs.map(renderBenchmarkItems$1);
  const items = renderBenchmarkItems$1(result);
  const padded = items.map((i, idx) => {
    const width = Math.max(...allItems.map((i2) => i2[idx].length));
    return idx ? i.padStart(width, " ") : i.padEnd(width, " ");
  });
  return [
    padded[0],
    c.dim("  "),
    c.blue(padded[1]),
    c.dim(" ops/sec "),
    c.cyan(padded[3]),
    c.dim(` (${padded[4]} samples)`),
    result.rank === 1 ? c.bold(c.green(" fastest")) : result.rank === benchs.length && benchs.length > 2 ? c.bold(c.gray(" slowest")) : ""
  ].join("");
}
function renderTree$1(tasks, options, level = 0) {
  var _a, _b, _c, _d, _e, _f, _g;
  let output = [];
  for (const task of tasks) {
    let suffix = "";
    let prefix = ` ${getStateSymbol(task)} `;
    if (level === 0 && task.type === "suite" && task.projectName)
      prefix += formatProjectName(task.projectName);
    if (task.type === "test" && ((_a = task.result) == null ? void 0 : _a.retryCount) && task.result.retryCount > 1)
      suffix += c.yellow(` (retry x${task.result.retryCount})`);
    if (task.type === "suite" && !((_b = task.meta) == null ? void 0 : _b.typecheck)) {
      const tests = getTests(task);
      suffix += c.dim(` (${tests.length})`);
    }
    if (task.mode === "skip" || task.mode === "todo")
      suffix += ` ${c.dim(c.gray("[skipped]"))}`;
    if (((_c = task.result) == null ? void 0 : _c.duration) != null) {
      if (task.result.duration > DURATION_LONG$1)
        suffix += c.yellow(` ${Math.round(task.result.duration)}${c.dim("ms")}`);
    }
    if (options.showHeap && ((_d = task.result) == null ? void 0 : _d.heap) != null)
      suffix += c.magenta(` ${Math.floor(task.result.heap / 1024 / 1024)} MB heap used`);
    let name = task.name;
    if (level === 0)
      name = formatFilepath$1(name);
    const padding = "  ".repeat(level);
    const body = task.type === "benchmark" ? renderBenchmark$1(task, tasks) : name;
    output.push(padding + prefix + body + suffix);
    if (((_e = task.result) == null ? void 0 : _e.state) !== "pass" && outputMap$1.get(task) != null) {
      let data = outputMap$1.get(task);
      if (typeof data === "string") {
        data = stripAnsi(data.trim().split("\n").filter(Boolean).pop());
        if (data === "")
          data = void 0;
      }
      if (data != null) {
        const out = `${"  ".repeat(level)}${F_RIGHT} ${data}`;
        output.push(`   ${c.gray(cliTruncate(out, getCols(-3)))}`);
      }
    }
    output = output.concat(renderHookState(task, "beforeAll", level + 1));
    output = output.concat(renderHookState(task, "beforeEach", level + 1));
    if (task.type === "suite" && task.tasks.length > 0) {
      if (((_f = task.result) == null ? void 0 : _f.state) === "fail" || ((_g = task.result) == null ? void 0 : _g.state) === "run" || options.renderSucceed)
        output = output.concat(renderTree$1(task.tasks, options, level + 1));
    }
    output = output.concat(renderHookState(task, "afterAll", level + 1));
    output = output.concat(renderHookState(task, "afterEach", level + 1));
  }
  return output.filter(Boolean).join("\n");
}
const createListRenderer = (_tasks, options) => {
  let tasks = _tasks;
  let timer;
  const log = options.logger.logUpdate;
  function update() {
    log(renderTree$1(tasks, options));
  }
  return {
    start() {
      if (timer)
        return this;
      timer = safeSetInterval(update, 200);
      return this;
    },
    update(_tasks2) {
      tasks = _tasks2;
      update();
      return this;
    },
    async stop() {
      if (timer) {
        safeClearInterval(timer);
        timer = void 0;
      }
      log.clear();
      options.logger.log(renderTree$1(tasks, options));
      return this;
    },
    clear() {
      log.clear();
    }
  };
};

class DefaultReporter extends BaseReporter {
  constructor() {
    super(...arguments);
    this.rendererOptions = {};
  }
  async onTestRemoved(trigger) {
    await this.stopListRender();
    this.ctx.logger.clearScreen(c.yellow("Test removed...") + (trigger ? c.dim(` [ ${this.relative(trigger)} ]
`) : ""), true);
    const files = this.ctx.state.getFiles(this.watchFilters);
    createListRenderer(files, this.rendererOptions).stop();
    this.ctx.logger.log();
    await super.reportSummary(files);
    super.onWatcherStart();
  }
  onCollected() {
    if (this.isTTY) {
      this.rendererOptions.logger = this.ctx.logger;
      this.rendererOptions.showHeap = this.ctx.config.logHeapUsage;
      this.rendererOptions.mode = this.mode;
      const files = this.ctx.state.getFiles(this.watchFilters);
      if (!this.renderer)
        this.renderer = createListRenderer(files, this.rendererOptions).start();
      else
        this.renderer.update(files);
    }
  }
  async onFinished(files = this.ctx.state.getFiles(), errors = this.ctx.state.getUnhandledErrors()) {
    await this.stopListRender();
    this.ctx.logger.log();
    await super.onFinished(files, errors);
  }
  async onWatcherStart(files = this.ctx.state.getFiles(), errors = this.ctx.state.getUnhandledErrors()) {
    await this.stopListRender();
    await super.onWatcherStart(files, errors);
  }
  async stopListRender() {
    var _a;
    await ((_a = this.renderer) == null ? void 0 : _a.stop());
    this.renderer = void 0;
  }
  async onWatcherRerun(files, trigger) {
    await this.stopListRender();
    await super.onWatcherRerun(files, trigger);
  }
  onUserConsoleLog(log) {
    var _a;
    if (!this.shouldLog(log))
      return;
    (_a = this.renderer) == null ? void 0 : _a.clear();
    super.onUserConsoleLog(log);
  }
}

const check = c.green("\xB7");
const cross = c.red("x");
const pending = c.yellow("*");
const skip = c.dim(c.gray("-"));
function render(tasks) {
  const all = getTests(tasks);
  return all.map((i) => {
    var _a;
    if (i.mode === "skip" || i.mode === "todo")
      return skip;
    switch ((_a = i.result) == null ? void 0 : _a.state) {
      case "pass":
        return check;
      case "fail":
        return cross;
      default:
        return pending;
    }
  }).join("");
}
const createDotRenderer = (_tasks, options) => {
  let tasks = _tasks;
  let timer;
  const log = options.logger.logUpdate;
  function update() {
    log(render(tasks));
  }
  return {
    start() {
      if (timer)
        return this;
      timer = safeSetInterval(update, 200);
      return this;
    },
    update(_tasks2) {
      tasks = _tasks2;
      update();
      return this;
    },
    async stop() {
      if (timer) {
        safeClearInterval(timer);
        timer = void 0;
      }
      log.clear();
      options.logger.log(render(tasks));
      return this;
    },
    clear() {
      log.clear();
    }
  };
};

class DotReporter extends BaseReporter {
  onCollected() {
    if (this.isTTY) {
      const files = this.ctx.state.getFiles(this.watchFilters);
      if (!this.renderer)
        this.renderer = createDotRenderer(files, { logger: this.ctx.logger }).start();
      else
        this.renderer.update(files);
    }
  }
  async onFinished(files = this.ctx.state.getFiles(), errors = this.ctx.state.getUnhandledErrors()) {
    await this.stopListRender();
    this.ctx.logger.log();
    await super.onFinished(files, errors);
  }
  async onWatcherStart() {
    await this.stopListRender();
    super.onWatcherStart();
  }
  async stopListRender() {
    var _a;
    (_a = this.renderer) == null ? void 0 : _a.stop();
    this.renderer = void 0;
    await new Promise((resolve) => safeSetTimeout(resolve, 10));
  }
  async onWatcherRerun(files, trigger) {
    await this.stopListRender();
    await super.onWatcherRerun(files, trigger);
  }
  onUserConsoleLog(log) {
    var _a;
    (_a = this.renderer) == null ? void 0 : _a.clear();
    super.onUserConsoleLog(log);
  }
}

const getOutputFile = (config, reporter) => {
  if (!(config == null ? void 0 : config.outputFile))
    return;
  if (typeof config.outputFile === "string")
    return config.outputFile;
  return config.outputFile[reporter];
};

const StatusMap = {
  fail: "failed",
  only: "pending",
  pass: "passed",
  run: "pending",
  skip: "skipped",
  todo: "todo"
};
class JsonReporter$1 {
  constructor() {
    this.start = 0;
  }
  onInit(ctx) {
    this.ctx = ctx;
    this.start = Date.now();
  }
  async logTasks(files) {
    var _a, _b, _c;
    const suites = getSuites(files);
    const numTotalTestSuites = suites.length;
    const tests = getTests(files);
    const numTotalTests = tests.length;
    const numFailedTestSuites = suites.filter((s) => {
      var _a2;
      return (_a2 = s.result) == null ? void 0 : _a2.errors;
    }).length;
    const numPassedTestSuites = numTotalTestSuites - numFailedTestSuites;
    const numPendingTestSuites = suites.filter((s) => {
      var _a2;
      return ((_a2 = s.result) == null ? void 0 : _a2.state) === "run";
    }).length;
    const numFailedTests = tests.filter((t) => {
      var _a2;
      return ((_a2 = t.result) == null ? void 0 : _a2.state) === "fail";
    }).length;
    const numPassedTests = numTotalTests - numFailedTests;
    const numPendingTests = tests.filter((t) => {
      var _a2;
      return ((_a2 = t.result) == null ? void 0 : _a2.state) === "run";
    }).length;
    const numTodoTests = tests.filter((t) => t.mode === "todo").length;
    const testResults = [];
    const success = numFailedTestSuites === 0 && numFailedTests === 0;
    for (const file of files) {
      const tests2 = getTests([file]);
      let startTime = tests2.reduce((prev, next) => {
        var _a2;
        return Math.min(prev, ((_a2 = next.result) == null ? void 0 : _a2.startTime) ?? Infinity);
      }, Infinity);
      if (startTime === Infinity)
        startTime = this.start;
      const endTime = tests2.reduce((prev, next) => {
        var _a2, _b2;
        return Math.max(prev, (((_a2 = next.result) == null ? void 0 : _a2.startTime) ?? 0) + (((_b2 = next.result) == null ? void 0 : _b2.duration) ?? 0));
      }, startTime);
      const assertionResults = await Promise.all(tests2.map(async (t) => {
        var _a2, _b2, _c2, _d;
        const ancestorTitles = [];
        let iter = t.suite;
        while (iter) {
          ancestorTitles.push(iter.name);
          iter = iter.suite;
        }
        ancestorTitles.reverse();
        return {
          ancestorTitles,
          fullName: ancestorTitles.length > 0 ? `${ancestorTitles.join(" ")} ${t.name}` : t.name,
          status: StatusMap[((_a2 = t.result) == null ? void 0 : _a2.state) || t.mode] || "skipped",
          title: t.name,
          duration: (_b2 = t.result) == null ? void 0 : _b2.duration,
          failureMessages: ((_d = (_c2 = t.result) == null ? void 0 : _c2.errors) == null ? void 0 : _d.map((e) => e.message)) || [],
          location: await this.getFailureLocation(t)
        };
      }));
      if (tests2.some((t) => {
        var _a2;
        return ((_a2 = t.result) == null ? void 0 : _a2.state) === "run";
      })) {
        this.ctx.logger.warn("WARNING: Some tests are still running when generating the JSON report.This is likely an internal bug in Vitest.Please report it to https://github.com/vitest-dev/vitest/issues");
      }
      testResults.push({
        assertionResults,
        startTime,
        endTime,
        status: tests2.some((t) => {
          var _a2;
          return ((_a2 = t.result) == null ? void 0 : _a2.state) === "fail";
        }) ? "failed" : "passed",
        message: ((_c = (_b = (_a = file.result) == null ? void 0 : _a.errors) == null ? void 0 : _b[0]) == null ? void 0 : _c.message) ?? "",
        name: file.filepath
      });
    }
    const result = {
      numTotalTestSuites,
      numPassedTestSuites,
      numFailedTestSuites,
      numPendingTestSuites,
      numTotalTests,
      numPassedTests,
      numFailedTests,
      numPendingTests,
      numTodoTests,
      startTime: this.start,
      success,
      testResults
    };
    await this.writeReport(JSON.stringify(result, null, 2));
  }
  async onFinished(files = this.ctx.state.getFiles()) {
    await this.logTasks(files);
  }
  async writeReport(report) {
    const outputFile = getOutputFile(this.ctx.config, "json");
    if (outputFile) {
      const reportFile = resolve(this.ctx.config.root, outputFile);
      const outputDirectory = dirname(reportFile);
      if (!existsSync(outputDirectory))
        await promises.mkdir(outputDirectory, { recursive: true });
      await promises.writeFile(reportFile, report, "utf-8");
      this.ctx.logger.log(`JSON report written to ${reportFile}`);
    } else {
      this.ctx.logger.log(report);
    }
  }
  async getFailureLocation(test) {
    var _a, _b;
    const error = (_b = (_a = test.result) == null ? void 0 : _a.errors) == null ? void 0 : _b[0];
    if (!error)
      return;
    const stack = parseStacktrace(error);
    const frame = stack[stack.length - 1];
    if (!frame)
      return;
    return { line: frame.line, column: frame.column };
  }
}

class VerboseReporter extends DefaultReporter {
  constructor() {
    super();
    this.rendererOptions.renderSucceed = true;
  }
  onTaskUpdate(packs) {
    var _a, _b, _c;
    if (this.isTTY)
      return;
    for (const pack of packs) {
      const task = this.ctx.state.idMap.get(pack[0]);
      if (task && task.type === "test" && ((_a = task.result) == null ? void 0 : _a.state) && ((_b = task.result) == null ? void 0 : _b.state) !== "run") {
        let title = ` ${getStateSymbol(task)} ${getFullName(task)}`;
        if (this.ctx.config.logHeapUsage && task.result.heap != null)
          title += c.magenta(` ${Math.floor(task.result.heap / 1024 / 1024)} MB heap used`);
        this.ctx.logger.log(title);
        if (task.result.state === "fail") {
          (_c = task.result.errors) == null ? void 0 : _c.forEach((error) => {
            this.ctx.logger.log(c.red(`   ${F_RIGHT} ${error == null ? void 0 : error.message}`));
          });
        }
      }
    }
  }
}

class IndentedLogger {
  constructor(baseLog) {
    this.baseLog = baseLog;
    this.currentIndent = "";
  }
  indent() {
    this.currentIndent += "    ";
  }
  unindent() {
    this.currentIndent = this.currentIndent.substring(0, this.currentIndent.length - 4);
  }
  log(text) {
    return this.baseLog(this.currentIndent + text);
  }
}

function yamlString(str) {
  return `"${str.replace(/"/g, '\\"')}"`;
}
function tapString(str) {
  return str.replace(/\\/g, "\\\\").replace(/#/g, "\\#").replace(/\n/g, " ");
}
class TapReporter {
  onInit(ctx) {
    this.ctx = ctx;
    this.logger = new IndentedLogger(ctx.logger.log.bind(ctx.logger));
  }
  static getComment(task) {
    var _a;
    if (task.mode === "skip")
      return " # SKIP";
    else if (task.mode === "todo")
      return " # TODO";
    else if (((_a = task.result) == null ? void 0 : _a.duration) != null)
      return ` # time=${task.result.duration.toFixed(2)}ms`;
    else
      return "";
  }
  logErrorDetails(error, stack) {
    this.logger.log(`name: ${yamlString(error.name)}`);
    this.logger.log(`message: ${yamlString(error.message)}`);
    if (stack) {
      this.logger.log(`stack: ${yamlString(`${stack.file}:${stack.line}:${stack.column}`)}`);
    }
  }
  logTasks(tasks) {
    var _a, _b;
    this.logger.log(`1..${tasks.length}`);
    for (const [i, task] of tasks.entries()) {
      const id = i + 1;
      const ok = ((_a = task.result) == null ? void 0 : _a.state) === "pass" || task.mode === "skip" || task.mode === "todo" ? "ok" : "not ok";
      const comment = TapReporter.getComment(task);
      if (task.type === "suite" && task.tasks.length > 0) {
        this.logger.log(`${ok} ${id} - ${tapString(task.name)}${comment} {`);
        this.logger.indent();
        this.logTasks(task.tasks);
        this.logger.unindent();
        this.logger.log("}");
      } else {
        this.logger.log(`${ok} ${id} - ${tapString(task.name)}${comment}`);
        if (((_b = task.result) == null ? void 0 : _b.state) === "fail" && task.result.errors) {
          this.logger.indent();
          task.result.errors.forEach((error) => {
            const stacks = parseStacktrace(error);
            const stack = stacks[0];
            this.logger.log("---");
            this.logger.log("error:");
            this.logger.indent();
            this.logErrorDetails(error);
            this.logger.unindent();
            if (stack)
              this.logger.log(`at: ${yamlString(`${stack.file}:${stack.line}:${stack.column}`)}`);
            if (error.showDiff) {
              this.logger.log(`actual: ${yamlString(error.actual)}`);
              this.logger.log(`expected: ${yamlString(error.expected)}`);
            }
          });
          this.logger.log("...");
          this.logger.unindent();
        }
      }
    }
  }
  async onFinished(files = this.ctx.state.getFiles()) {
    this.logger.log("TAP version 13");
    this.logTasks(files);
  }
}

function flattenTasks$1(task, baseName = "") {
  const base = baseName ? `${baseName} > ` : "";
  if (task.type === "suite") {
    return task.tasks.flatMap((child) => flattenTasks$1(child, `${base}${task.name}`));
  } else {
    return [{
      ...task,
      name: `${base}${task.name}`
    }];
  }
}
function removeInvalidXMLCharacters(value, removeDiscouragedChars) {
  let regex = /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;
  value = String(value || "").replace(regex, "");
  if (removeDiscouragedChars) {
    regex = new RegExp(
      "([\\x7F-\\x84]|[\\x86-\\x9F]|[\\uFDD0-\\uFDEF]|(?:\\uD83F[\\uDFFE\\uDFFF])|(?:\\uD87F[\\uDFFE\\uDFFF])|(?:\\uD8BF[\\uDFFE\\uDFFF])|(?:\\uD8FF[\\uDFFE\\uDFFF])|(?:\\uD93F[\\uDFFE\\uDFFF])|(?:\\uD97F[\\uDFFE\\uDFFF])|(?:\\uD9BF[\\uDFFE\\uDFFF])|(?:\\uD9FF[\\uDFFE\\uDFFF])|(?:\\uDA3F[\\uDFFE\\uDFFF])|(?:\\uDA7F[\\uDFFE\\uDFFF])|(?:\\uDABF[\\uDFFE\\uDFFF])|(?:\\uDAFF[\\uDFFE\\uDFFF])|(?:\\uDB3F[\\uDFFE\\uDFFF])|(?:\\uDB7F[\\uDFFE\\uDFFF])|(?:\\uDBBF[\\uDFFE\\uDFFF])|(?:\\uDBFF[\\uDFFE\\uDFFF])(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))",
      "g"
    );
    value = value.replace(regex, "");
  }
  return value;
}
function escapeXML(value) {
  return removeInvalidXMLCharacters(
    String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    true
  );
}
function executionTime(durationMS) {
  return (durationMS / 1e3).toLocaleString("en-US", { useGrouping: false, maximumFractionDigits: 10 });
}
function getDuration(task) {
  var _a;
  const duration = ((_a = task.result) == null ? void 0 : _a.duration) ?? 0;
  return executionTime(duration);
}
class JUnitReporter {
  constructor() {
    this._timeStart = new Date();
  }
  async onInit(ctx) {
    this.ctx = ctx;
    const outputFile = getOutputFile(this.ctx.config, "junit");
    if (outputFile) {
      this.reportFile = resolve(this.ctx.config.root, outputFile);
      const outputDirectory = dirname(this.reportFile);
      if (!existsSync(outputDirectory))
        await promises.mkdir(outputDirectory, { recursive: true });
      const fileFd = await promises.open(this.reportFile, "w+");
      this.baseLog = async (text) => await promises.writeFile(fileFd, `${text}
`);
    } else {
      this.baseLog = async (text) => this.ctx.logger.log(text);
    }
    this._timeStart = new Date();
    this.logger = new IndentedLogger(this.baseLog);
  }
  async writeElement(name, attrs, children) {
    const pairs = [];
    for (const key in attrs) {
      const attr = attrs[key];
      if (attr === void 0)
        continue;
      pairs.push(`${key}="${escapeXML(attr)}"`);
    }
    await this.logger.log(`<${name}${pairs.length ? ` ${pairs.join(" ")}` : ""}>`);
    this.logger.indent();
    await children.call(this);
    this.logger.unindent();
    await this.logger.log(`</${name}>`);
  }
  async writeErrorDetails(error) {
    const errorName = error.name ?? error.nameStr ?? "Unknown Error";
    const errorDetails = `${errorName}: ${error.message}`;
    await this.baseLog(escapeXML(errorDetails));
    const stack = parseStacktrace(error);
    for (const frame of stack) {
      const path = relative(this.ctx.config.root, frame.file);
      await this.baseLog(` ${F_POINTER} ${[frame.method, `${path}:${frame.line}:${frame.column}`].filter(Boolean).join(" ")}`);
      if (frame.file in this.ctx.state.filesMap)
        break;
    }
  }
  async writeLogs(task, type) {
    if (task.logs == null || task.logs.length === 0)
      return;
    const logType = type === "err" ? "stderr" : "stdout";
    const logs = task.logs.filter((log) => log.type === logType);
    if (logs.length === 0)
      return;
    await this.writeElement(`system-${type}`, {}, async () => {
      for (const log of logs)
        await this.baseLog(escapeXML(log.content));
    });
  }
  async writeTasks(tasks, filename) {
    for (const task of tasks) {
      await this.writeElement("testcase", {
        classname: filename,
        name: task.name,
        time: getDuration(task)
      }, async () => {
        var _a, _b;
        await this.writeLogs(task, "out");
        await this.writeLogs(task, "err");
        if (task.mode === "skip" || task.mode === "todo")
          await this.logger.log("<skipped/>");
        if (((_a = task.result) == null ? void 0 : _a.state) === "fail") {
          const errors = ((_b = task.result.errors) == null ? void 0 : _b.length) ? task.result.errors : [task.result.error];
          for (const error of errors) {
            await this.writeElement("failure", {
              message: error == null ? void 0 : error.message,
              type: (error == null ? void 0 : error.name) ?? (error == null ? void 0 : error.nameStr)
            }, async () => {
              if (!error)
                return;
              await this.writeErrorDetails(error);
            });
          }
        }
      });
    }
  }
  async onFinished(files = this.ctx.state.getFiles()) {
    await this.logger.log('<?xml version="1.0" encoding="UTF-8" ?>');
    const transformed = files.map((file) => {
      const tasks = file.tasks.flatMap((task) => flattenTasks$1(task));
      const stats2 = tasks.reduce(
        (stats3, task) => {
          var _a, _b;
          return {
            passed: stats3.passed + Number(((_a = task.result) == null ? void 0 : _a.state) === "pass"),
            failures: stats3.failures + Number(((_b = task.result) == null ? void 0 : _b.state) === "fail"),
            skipped: stats3.skipped + Number(task.mode === "skip" || task.mode === "todo")
          };
        },
        {
          passed: 0,
          failures: 0,
          skipped: 0
        }
      );
      return {
        ...file,
        tasks,
        stats: stats2
      };
    });
    const stats = transformed.reduce((stats2, file) => {
      stats2.tests += file.tasks.length;
      stats2.failures += file.stats.failures;
      return stats2;
    }, {
      name: process.env.VITEST_JUNIT_SUITE_NAME || "vitest tests",
      tests: 0,
      failures: 0,
      errors: 0,
      time: executionTime(new Date().getTime() - this._timeStart.getTime())
    });
    await this.writeElement("testsuites", stats, async () => {
      for (const file of transformed) {
        await this.writeElement("testsuite", {
          name: file.name,
          timestamp: new Date().toISOString(),
          hostname: hostname(),
          tests: file.tasks.length,
          failures: file.stats.failures,
          errors: 0,
          skipped: file.stats.skipped,
          time: getDuration(file)
        }, async () => {
          await this.writeTasks(file.tasks, file.name);
        });
      }
    });
    if (this.reportFile)
      this.ctx.logger.log(`JUNIT report written to ${this.reportFile}`);
  }
}

function flattenTasks(task, baseName = "") {
  const base = baseName ? `${baseName} > ` : "";
  if (task.type === "suite" && task.tasks.length > 0) {
    return task.tasks.flatMap((child) => flattenTasks(child, `${base}${task.name}`));
  } else {
    return [{
      ...task,
      name: `${base}${task.name}`
    }];
  }
}
class TapFlatReporter extends TapReporter {
  onInit(ctx) {
    super.onInit(ctx);
  }
  async onFinished(files = this.ctx.state.getFiles()) {
    this.ctx.logger.log("TAP version 13");
    const flatTasks = files.flatMap((task) => flattenTasks(task));
    this.logTasks(flatTasks);
  }
}

class HangingProcessReporter {
  onInit() {
    const _require = createRequire(import.meta.url);
    this.whyRunning = _require("why-is-node-running");
  }
  onProcessTimeout() {
    var _a;
    (_a = this.whyRunning) == null ? void 0 : _a.call(this);
  }
}

class JsonReporter {
  constructor() {
    this.start = 0;
  }
  onInit(ctx) {
    this.ctx = ctx;
  }
  async logTasks(files) {
    var _a;
    const suites = getSuites(files);
    const numTotalTestSuites = suites.length;
    const tests = getTests(files);
    const numTotalTests = tests.length;
    const testResults = {};
    const outputFile = getOutputFile(this.ctx.config.benchmark, "json");
    for (const file of files) {
      const tests2 = getTests([file]);
      for (const test of tests2) {
        const res = (_a = test.result) == null ? void 0 : _a.benchmark;
        if (!res || test.mode === "skip")
          continue;
        if (!outputFile)
          res.samples = "ignore on terminal";
        testResults[test.suite.name] = (testResults[test.suite.name] || []).concat(res);
      }
      if (tests2.some((t) => {
        var _a2;
        return ((_a2 = t.result) == null ? void 0 : _a2.state) === "run";
      })) {
        this.ctx.logger.warn("WARNING: Some tests are still running when generating the json report.This is likely an internal bug in Vitest.Please report it to https://github.com/vitest-dev/vitest/issues");
      }
    }
    const result = {
      numTotalTestSuites,
      numTotalTests,
      testResults
    };
    await this.writeReport(JSON.stringify(result, null, 2));
  }
  async onFinished(files = this.ctx.state.getFiles()) {
    await this.logTasks(files);
  }
  async writeReport(report) {
    const outputFile = getOutputFile(this.ctx.config.benchmark, "json");
    if (outputFile) {
      const reportFile = resolve(this.ctx.config.root, outputFile);
      const outputDirectory = dirname(reportFile);
      if (!existsSync(outputDirectory))
        await promises.mkdir(outputDirectory, { recursive: true });
      await promises.writeFile(reportFile, report, "utf-8");
      this.ctx.logger.log(`json report written to ${reportFile}`);
    } else {
      this.ctx.logger.log(report);
    }
  }
}

const DURATION_LONG = 300;
const outputMap = /* @__PURE__ */ new WeakMap();
function formatFilepath(path) {
  const lastSlash = Math.max(path.lastIndexOf("/") + 1, 0);
  const basename = path.slice(lastSlash);
  let firstDot = basename.indexOf(".");
  if (firstDot < 0)
    firstDot = basename.length;
  firstDot += lastSlash;
  return c.dim(path.slice(0, lastSlash)) + path.slice(lastSlash, firstDot) + c.dim(path.slice(firstDot));
}
function formatNumber(number) {
  const res = String(number.toFixed(number < 100 ? 4 : 2)).split(".");
  return res[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ",") + (res[1] ? `.${res[1]}` : "");
}
const tableHead = ["name", "hz", "min", "max", "mean", "p75", "p99", "p995", "p999", "rme", "samples"];
function renderTableHead(tasks) {
  const benchs = tasks.map((i) => {
    var _a;
    return i.type === "benchmark" ? (_a = i.result) == null ? void 0 : _a.benchmark : void 0;
  }).filter(notNullish);
  const allItems = benchs.map(renderBenchmarkItems).concat([tableHead]);
  return `${" ".repeat(3)}${tableHead.map((i, idx) => {
    const width = Math.max(...allItems.map((i2) => i2[idx].length));
    return idx ? i.padStart(width, " ") : i.padEnd(width, " ");
  }).map(c.bold).join("  ")}`;
}
function renderBenchmarkItems(result) {
  return [
    result.name,
    formatNumber(result.hz || 0),
    formatNumber(result.min || 0),
    formatNumber(result.max || 0),
    formatNumber(result.mean || 0),
    formatNumber(result.p75 || 0),
    formatNumber(result.p99 || 0),
    formatNumber(result.p995 || 0),
    formatNumber(result.p999 || 0),
    `\xB1${(result.rme || 0).toFixed(2)}%`,
    result.samples.length.toString()
  ];
}
function renderBenchmark(task, tasks) {
  var _a;
  const result = (_a = task.result) == null ? void 0 : _a.benchmark;
  if (!result)
    return task.name;
  const benchs = tasks.map((i) => {
    var _a2;
    return i.type === "benchmark" ? (_a2 = i.result) == null ? void 0 : _a2.benchmark : void 0;
  }).filter(notNullish);
  const allItems = benchs.map(renderBenchmarkItems).concat([tableHead]);
  const items = renderBenchmarkItems(result);
  const padded = items.map((i, idx) => {
    const width = Math.max(...allItems.map((i2) => i2[idx].length));
    return idx ? i.padStart(width, " ") : i.padEnd(width, " ");
  });
  return [
    padded[0],
    c.blue(padded[1]),
    c.cyan(padded[2]),
    c.cyan(padded[3]),
    c.cyan(padded[4]),
    c.cyan(padded[5]),
    c.cyan(padded[6]),
    c.cyan(padded[7]),
    c.cyan(padded[8]),
    c.dim(padded[9]),
    c.dim(padded[10]),
    result.rank === 1 ? c.bold(c.green(" fastest")) : result.rank === benchs.length && benchs.length > 2 ? c.bold(c.gray(" slowest")) : ""
  ].join("  ");
}
function renderTree(tasks, options, level = 0) {
  var _a, _b, _c, _d;
  let output = [];
  let idx = 0;
  for (const task of tasks) {
    const padding = "  ".repeat(level ? 1 : 0);
    let prefix = "";
    if (idx === 0 && task.type === "benchmark")
      prefix += `${renderTableHead(tasks)}
${padding}`;
    prefix += ` ${getStateSymbol(task)} `;
    let suffix = "";
    if (task.type === "suite")
      suffix += c.dim(` (${getTests(task).length})`);
    if (task.mode === "skip" || task.mode === "todo")
      suffix += ` ${c.dim(c.gray("[skipped]"))}`;
    if (((_a = task.result) == null ? void 0 : _a.duration) != null) {
      if (task.result.duration > DURATION_LONG)
        suffix += c.yellow(` ${Math.round(task.result.duration)}${c.dim("ms")}`);
    }
    if (options.showHeap && ((_b = task.result) == null ? void 0 : _b.heap) != null)
      suffix += c.magenta(` ${Math.floor(task.result.heap / 1024 / 1024)} MB heap used`);
    let name = task.name;
    if (level === 0)
      name = formatFilepath(name);
    const body = task.type === "benchmark" ? renderBenchmark(task, tasks) : name;
    output.push(padding + prefix + body + suffix);
    if (((_c = task.result) == null ? void 0 : _c.state) !== "pass" && outputMap.get(task) != null) {
      let data = outputMap.get(task);
      if (typeof data === "string") {
        data = stripAnsi(data.trim().split("\n").filter(Boolean).pop());
        if (data === "")
          data = void 0;
      }
      if (data != null) {
        const out = `${"  ".repeat(level)}${F_RIGHT} ${data}`;
        output.push(`   ${c.gray(cliTruncate(out, getCols(-3)))}`);
      }
    }
    if (task.type === "suite" && task.tasks.length > 0) {
      if ((_d = task.result) == null ? void 0 : _d.state)
        output = output.concat(renderTree(task.tasks, options, level + 1));
    }
    idx++;
  }
  return output.filter(Boolean).join("\n");
}
const createTableRenderer = (_tasks, options) => {
  let tasks = _tasks;
  let timer;
  const log = options.logger.logUpdate;
  function update() {
    log(renderTree(tasks, options));
  }
  return {
    start() {
      if (timer)
        return this;
      timer = safeSetInterval(update, 200);
      return this;
    },
    update(_tasks2) {
      tasks = _tasks2;
      update();
      return this;
    },
    async stop() {
      if (timer) {
        safeClearInterval(timer);
        timer = void 0;
      }
      log.clear();
      options.logger.log(renderTree(tasks, options));
      return this;
    },
    clear() {
      log.clear();
    }
  };
};

class TableReporter extends BaseReporter {
  constructor() {
    super(...arguments);
    this.rendererOptions = {};
  }
  async onTestRemoved(trigger) {
    await this.stopListRender();
    this.ctx.logger.clearScreen(c.yellow("Test removed...") + (trigger ? c.dim(` [ ${this.relative(trigger)} ]
`) : ""), true);
    const files = this.ctx.state.getFiles(this.watchFilters);
    createTableRenderer(files, this.rendererOptions).stop();
    this.ctx.logger.log();
    await super.reportSummary(files);
    super.onWatcherStart();
  }
  onCollected() {
    if (this.isTTY) {
      this.rendererOptions.logger = this.ctx.logger;
      this.rendererOptions.showHeap = this.ctx.config.logHeapUsage;
      const files = this.ctx.state.getFiles(this.watchFilters);
      if (!this.renderer)
        this.renderer = createTableRenderer(files, this.rendererOptions).start();
      else
        this.renderer.update(files);
    }
  }
  async onFinished(files = this.ctx.state.getFiles(), errors = this.ctx.state.getUnhandledErrors()) {
    await this.stopListRender();
    this.ctx.logger.log();
    await super.onFinished(files, errors);
  }
  async onWatcherStart() {
    await this.stopListRender();
    await super.onWatcherStart();
  }
  async stopListRender() {
    var _a;
    await ((_a = this.renderer) == null ? void 0 : _a.stop());
    this.renderer = void 0;
  }
  async onWatcherRerun(files, trigger) {
    await this.stopListRender();
    await super.onWatcherRerun(files, trigger);
  }
  onUserConsoleLog(log) {
    var _a;
    if (!this.shouldLog(log))
      return;
    (_a = this.renderer) == null ? void 0 : _a.clear();
    super.onUserConsoleLog(log);
  }
}

const BenchmarkReportsMap = {
  default: TableReporter,
  verbose: VerboseReporter,
  json: JsonReporter
};

const ReportersMap = {
  "default": DefaultReporter,
  "basic": BasicReporter,
  "verbose": VerboseReporter,
  "dot": DotReporter,
  "json": JsonReporter$1,
  "tap": TapReporter,
  "tap-flat": TapFlatReporter,
  "junit": JUnitReporter,
  "hanging-process": HangingProcessReporter
};

async function loadCustomReporterModule(path, runner) {
  let customReporterModule;
  try {
    customReporterModule = await runner.executeId(path);
  } catch (customReporterModuleError) {
    throw new Error(`Failed to load custom Reporter from ${path}`, { cause: customReporterModuleError });
  }
  if (customReporterModule.default === null || customReporterModule.default === void 0)
    throw new Error(`Custom reporter loaded from ${path} was not the default export`);
  return customReporterModule.default;
}
function createReporters(reporterReferences, runner) {
  const promisedReporters = reporterReferences.map(async (referenceOrInstance) => {
    if (typeof referenceOrInstance === "string") {
      if (referenceOrInstance === "html") {
        await ensurePackageInstalled("@vitest/ui", runner.root);
        const CustomReporter = await loadCustomReporterModule("@vitest/ui/reporter", runner);
        return new CustomReporter();
      } else if (referenceOrInstance in ReportersMap) {
        const BuiltinReporter = ReportersMap[referenceOrInstance];
        return new BuiltinReporter();
      } else {
        const CustomReporter = await loadCustomReporterModule(referenceOrInstance, runner);
        return new CustomReporter();
      }
    }
    return referenceOrInstance;
  });
  return Promise.all(promisedReporters);
}
function createBenchmarkReporters(reporterReferences, runner) {
  const promisedReporters = reporterReferences.map(async (referenceOrInstance) => {
    if (typeof referenceOrInstance === "string") {
      if (referenceOrInstance in BenchmarkReportsMap) {
        const BuiltinReporter = BenchmarkReportsMap[referenceOrInstance];
        return new BuiltinReporter();
      } else {
        const CustomReporter = await loadCustomReporterModule(referenceOrInstance, runner);
        return new CustomReporter();
      }
    }
    return referenceOrInstance;
  });
  return Promise.all(promisedReporters);
}

const isAggregateError = (err) => {
  if (typeof AggregateError !== "undefined" && err instanceof AggregateError)
    return true;
  return err instanceof Error && "errors" in err;
};
class StateManager {
  constructor() {
    this.filesMap = /* @__PURE__ */ new Map();
    this.pathsSet = /* @__PURE__ */ new Set();
    this.collectingPromise = void 0;
    this.idMap = /* @__PURE__ */ new Map();
    this.taskFileMap = /* @__PURE__ */ new WeakMap();
    this.errorsSet = /* @__PURE__ */ new Set();
  }
  catchError(err, type) {
    if (isAggregateError(err))
      return err.errors.forEach((error) => this.catchError(error, type));
    err.type = type;
    this.errorsSet.add(err);
  }
  clearErrors() {
    this.errorsSet.clear();
  }
  getUnhandledErrors() {
    return Array.from(this.errorsSet.values());
  }
  startCollectingPaths() {
    let _resolve;
    const promise = new Promise((resolve) => {
      _resolve = resolve;
    });
    this.collectingPromise = { promise, resolve: _resolve };
  }
  finishCollectingPaths() {
    var _a;
    (_a = this.collectingPromise) == null ? void 0 : _a.resolve();
    this.collectingPromise = void 0;
  }
  async getPaths() {
    var _a;
    await ((_a = this.collectingPromise) == null ? void 0 : _a.promise);
    return Array.from(this.pathsSet);
  }
  getFiles(keys) {
    if (keys)
      return keys.map((key) => this.filesMap.get(key)).filter(Boolean);
    return Array.from(this.filesMap.values());
  }
  getFilepaths() {
    return Array.from(this.filesMap.keys());
  }
  getFailedFilepaths() {
    return this.getFiles().filter((i) => {
      var _a;
      return ((_a = i.result) == null ? void 0 : _a.state) === "fail";
    }).map((i) => i.filepath);
  }
  collectPaths(paths = []) {
    paths.forEach((path) => {
      this.pathsSet.add(path);
    });
  }
  collectFiles(files = []) {
    files.forEach((file) => {
      this.filesMap.set(file.filepath, file);
      this.updateId(file);
    });
  }
  clearFiles(paths = []) {
    paths.forEach((path) => {
      this.filesMap.delete(path);
    });
  }
  updateId(task) {
    if (this.idMap.get(task.id) === task)
      return;
    this.idMap.set(task.id, task);
    if (task.type === "suite") {
      task.tasks.forEach((task2) => {
        this.updateId(task2);
      });
    }
  }
  updateTasks(packs) {
    for (const [id, result] of packs) {
      if (this.idMap.has(id))
        this.idMap.get(id).result = result;
    }
  }
  updateUserLog(log) {
    const task = log.taskId && this.idMap.get(log.taskId);
    if (task) {
      if (!task.logs)
        task.logs = [];
      task.logs.push(log);
    }
  }
}

const defaultInclude = ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"];
const defaultExclude = ["**/node_modules/**", "**/dist/**", "**/cypress/**", "**/.{idea,git,cache,output,temp}/**", "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*"];
const benchmarkConfigDefaults = {
  include: ["**/*.{bench,benchmark}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  exclude: defaultExclude,
  includeSource: [],
  reporters: ["default"]
};
const defaultCoverageExcludes = [
  "coverage/**",
  "dist/**",
  "packages/*/test{,s}/**",
  "**/*.d.ts",
  "cypress/**",
  "test{,s}/**",
  "test{,-*}.{js,cjs,mjs,ts,tsx,jsx}",
  "**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}",
  "**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}",
  "**/__tests__/**",
  "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
  "**/.{eslint,mocha,prettier}rc.{js,cjs,yml}"
];
const coverageConfigDefaults = {
  provider: "c8",
  enabled: false,
  clean: true,
  cleanOnRerun: true,
  reportsDirectory: "./coverage",
  exclude: defaultCoverageExcludes,
  reporter: ["text", "html", "clover", "json"],
  extension: [".js", ".cjs", ".mjs", ".ts", ".mts", ".cts", ".tsx", ".jsx", ".vue", ".svelte"]
};
const fakeTimersDefaults = {
  loopLimit: 1e4,
  shouldClearNativeTimers: true,
  toFake: [
    "setTimeout",
    "clearTimeout",
    "setInterval",
    "clearInterval",
    "setImmediate",
    "clearImmediate",
    "Date"
  ]
};
const config = {
  allowOnly: !isCI,
  watch: !isCI,
  globals: false,
  environment: "node",
  threads: true,
  clearMocks: false,
  restoreMocks: false,
  mockReset: false,
  include: defaultInclude,
  exclude: defaultExclude,
  testTimeout: 5e3,
  hookTimeout: 1e4,
  teardownTimeout: 1e4,
  isolate: true,
  watchExclude: ["**/node_modules/**", "**/dist/**"],
  forceRerunTriggers: [
    "**/package.json/**",
    "**/{vitest,vite}.config.*/**"
  ],
  update: false,
  reporters: [],
  silent: false,
  api: false,
  ui: false,
  uiBase: "/__vitest__/",
  open: true,
  css: {
    include: []
  },
  coverage: coverageConfigDefaults,
  fakeTimers: fakeTimersDefaults,
  maxConcurrency: 5,
  dangerouslyIgnoreUnhandledErrors: false,
  typecheck: {
    checker: "tsc",
    include: ["**/*.{test,spec}-d.{ts,js}"],
    exclude: defaultExclude
  },
  slowTestThreshold: 300
};
const configDefaults = Object.freeze(config);

class FilesStatsCache {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  getStats(fsPath) {
    return this.cache.get(fsPath);
  }
  async updateStats(fsPath) {
    if (!fs$8.existsSync(fsPath))
      return;
    const stats = await fs$8.promises.stat(fsPath);
    this.cache.set(fsPath, { size: stats.size });
  }
  removeStats(fsPath) {
    this.cache.delete(fsPath);
  }
}

class ResultsCache {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.cachePath = null;
    this.version = version$1;
    this.root = "/";
  }
  getCachePath() {
    return this.cachePath;
  }
  setConfig(root, config) {
    this.root = root;
    if (config)
      this.cachePath = resolve(config.dir, "results.json");
  }
  getResults(fsPath) {
    return this.cache.get(fsPath == null ? void 0 : fsPath.slice(this.root.length));
  }
  async readFromCache() {
    if (!this.cachePath)
      return;
    if (fs$8.existsSync(this.cachePath)) {
      const resultsCache = await fs$8.promises.readFile(this.cachePath, "utf8");
      const { results, version: version2 } = JSON.parse(resultsCache);
      this.cache = new Map(results);
      this.version = version2;
    }
  }
  updateResults(files) {
    files.forEach((file) => {
      var _a;
      const result = file.result;
      if (!result)
        return;
      const duration = result.duration || 0;
      const relativePath = (_a = file.filepath) == null ? void 0 : _a.slice(this.root.length);
      this.cache.set(relativePath, {
        duration: duration >= 0 ? duration : 0,
        failed: result.state === "fail"
      });
    });
  }
  removeFromCache(filepath) {
    this.cache.delete(filepath);
  }
  async writeToCache() {
    if (!this.cachePath)
      return;
    const results = Array.from(this.cache.entries());
    const cacheDirname = dirname(this.cachePath);
    if (!fs$8.existsSync(cacheDirname))
      await fs$8.promises.mkdir(cacheDirname, { recursive: true });
    const cache = JSON.stringify({
      version: this.version,
      results
    });
    await fs$8.promises.writeFile(this.cachePath, cache);
  }
}

class VitestCache {
  constructor() {
    this.results = new ResultsCache();
    this.stats = new FilesStatsCache();
  }
  getFileTestResults(id) {
    return this.results.getResults(id);
  }
  getFileStats(id) {
    return this.stats.getStats(id);
  }
  static resolveCacheDir(root, dir) {
    return resolve(root, slash$1(dir || "node_modules/.vitest"));
  }
  static async clearCache(options) {
    var _a;
    const root = resolve(options.root || process.cwd());
    const configPath = options.config ? resolve(root, options.config) : await findUp(configFiles, { cwd: root });
    const config = await loadConfigFromFile({ command: "serve", mode: "test" }, configPath);
    const cache = (_a = config == null ? void 0 : config.config.test) == null ? void 0 : _a.cache;
    if (cache === false)
      throw new Error("Cache is disabled");
    const cachePath = VitestCache.resolveCacheDir(root, cache == null ? void 0 : cache.dir);
    let cleared = false;
    if (fs$8.existsSync(cachePath)) {
      fs$8.rmSync(cachePath, { recursive: true, force: true });
      cleared = true;
    }
    return { dir: cachePath, cleared };
  }
}

class BaseSequencer {
  constructor(ctx) {
    this.ctx = ctx;
  }
  async shard(files) {
    const { config } = this.ctx;
    const { index, count } = config.shard;
    const shardSize = Math.ceil(files.length / count);
    const shardStart = shardSize * (index - 1);
    const shardEnd = shardSize * index;
    return [...files].map((file) => {
      const fullPath = resolve(slash$2(config.root), slash$2(file));
      const specPath = fullPath == null ? void 0 : fullPath.slice(config.root.length);
      return {
        file,
        hash: createHash("sha1").update(specPath).digest("hex")
      };
    }).sort((a, b) => a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0).slice(shardStart, shardEnd).map(({ file }) => file);
  }
  async sort(files) {
    const cache = this.ctx.cache;
    return [...files].sort((a, b) => {
      const aState = cache.getFileTestResults(a);
      const bState = cache.getFileTestResults(b);
      if (!aState || !bState) {
        const statsA = cache.getFileStats(a);
        const statsB = cache.getFileStats(b);
        if (!statsA || !statsB)
          return !statsA && statsB ? -1 : !statsB && statsA ? 1 : 0;
        return statsB.size - statsA.size;
      }
      if (aState.failed && !bState.failed)
        return -1;
      if (!aState.failed && bState.failed)
        return 1;
      return bState.duration - aState.duration;
    });
  }
}

class RandomSequencer extends BaseSequencer {
  async sort(files) {
    const { sequence } = this.ctx.config;
    const seed = (sequence == null ? void 0 : sequence.seed) ?? Date.now();
    return shuffle(files, seed);
  }
}

const extraInlineDeps = [
  /^(?!.*(?:node_modules)).*\.mjs$/,
  /^(?!.*(?:node_modules)).*\.cjs\.js$/,
  /vite\w*\/dist\/client\/env.mjs/,
  /\/vitest\/dist\//,
  /vitest-virtual-\w+\/dist/,
  /@vitest\/dist/,
  "@nuxt/test-utils"
];
function resolveApiConfig(options) {
  let api;
  if ((options.ui || options.browser) && !options.api)
    api = { port: defaultPort };
  else if (options.api === true)
    api = { port: defaultPort };
  else if (typeof options.api === "number")
    api = { port: options.api };
  if (typeof options.api === "object") {
    if (api) {
      if (options.api.port)
        api.port = options.api.port;
      if (options.api.strictPort)
        api.strictPort = options.api.strictPort;
      if (options.api.host)
        api.host = options.api.host;
    } else {
      api = { ...options.api };
    }
  }
  if (api) {
    if (!api.port)
      api.port = defaultPort;
  }
  return api;
}
function resolveConfig(mode, options, viteConfig) {
  var _a, _b, _c, _d, _e, _f, _g;
  if (options.dom) {
    if (((_a = viteConfig.test) == null ? void 0 : _a.environment) != null && viteConfig.test.environment !== "happy-dom") {
      console.warn(
        c.yellow(
          `${c.inverse(c.yellow(" Vitest "))} Your config.test.environment ("${viteConfig.test.environment}") conflicts with --dom flag ("happy-dom"), ignoring "${viteConfig.test.environment}"`
        )
      );
    }
    options.environment = "happy-dom";
  }
  const resolved = {
    ...configDefaults,
    ...options,
    root: viteConfig.root,
    mode
  };
  if (viteConfig.base !== "/")
    resolved.base = viteConfig.base;
  if (options.shard) {
    if (resolved.watch)
      throw new Error("You cannot use --shard option with enabled watch");
    const [indexString, countString] = options.shard.split("/");
    const index = Math.abs(parseInt(indexString, 10));
    const count = Math.abs(parseInt(countString, 10));
    if (isNaN(count) || count <= 0)
      throw new Error("--shard <count> must be a positive number");
    if (isNaN(index) || index <= 0 || index > count)
      throw new Error("--shard <index> must be a positive number less then <count>");
    resolved.shard = { index, count };
  }
  resolved.deps = resolved.deps || {};
  if (resolved.deps.inline !== true) {
    const ssrOptions = viteConfig.ssr;
    if ((ssrOptions == null ? void 0 : ssrOptions.noExternal) === true && resolved.deps.inline == null) {
      resolved.deps.inline = true;
    } else {
      (_b = resolved.deps).inline ?? (_b.inline = []);
      resolved.deps.inline.push(...extraInlineDeps);
    }
  }
  (_c = resolved.deps).registerNodeLoader ?? (_c.registerNodeLoader = false);
  resolved.testNamePattern = resolved.testNamePattern ? resolved.testNamePattern instanceof RegExp ? resolved.testNamePattern : new RegExp(resolved.testNamePattern) : void 0;
  const UPDATE_SNAPSHOT = resolved.update || process.env.UPDATE_SNAPSHOT;
  resolved.snapshotOptions = {
    snapshotFormat: resolved.snapshotFormat || {},
    updateSnapshot: isCI && !UPDATE_SNAPSHOT ? "none" : UPDATE_SNAPSHOT ? "all" : "new",
    resolveSnapshotPath: options.resolveSnapshotPath
  };
  if (options.resolveSnapshotPath)
    delete resolved.resolveSnapshotPath;
  if (process.env.VITEST_MAX_THREADS)
    resolved.maxThreads = parseInt(process.env.VITEST_MAX_THREADS);
  if (process.env.VITEST_MIN_THREADS)
    resolved.minThreads = parseInt(process.env.VITEST_MIN_THREADS);
  if (mode === "benchmark") {
    resolved.benchmark = {
      ...benchmarkConfigDefaults,
      ...resolved.benchmark
    };
    resolved.coverage.enabled = false;
    resolved.include = resolved.benchmark.include;
    resolved.exclude = resolved.benchmark.exclude;
    resolved.includeSource = resolved.benchmark.includeSource;
    const reporters = Array.from(/* @__PURE__ */ new Set([
      ...toArray(resolved.benchmark.reporters),
      ...toArray(options.reporter)
    ])).filter(Boolean);
    if (reporters.length)
      resolved.benchmark.reporters = reporters;
    else
      resolved.benchmark.reporters = ["default"];
    if (options.outputFile)
      resolved.benchmark.outputFile = options.outputFile;
  }
  resolved.setupFiles = toArray(resolved.setupFiles || []).map(
    (file) => normalize(
      resolveModule(file, { paths: [resolved.root] }) ?? resolve(resolved.root, file)
    )
  );
  resolved.coverage.exclude.push(...resolved.setupFiles.map((file) => relative(resolved.root, file)));
  resolved.forceRerunTriggers = [
    ...resolved.forceRerunTriggers,
    ...resolved.setupFiles
  ];
  resolved.api = resolveApiConfig(options);
  if (options.related)
    resolved.related = toArray(options.related).map((file) => resolve(resolved.root, file));
  if (mode !== "benchmark") {
    const reporters = resolved.reporter ?? resolved.reporters;
    resolved.reporters = Array.from(new Set(toArray(reporters))).filter(Boolean);
  }
  if (!resolved.reporters.length)
    resolved.reporters.push("default");
  if (resolved.changed)
    resolved.passWithNoTests ?? (resolved.passWithNoTests = true);
  resolved.css ?? (resolved.css = {});
  if (typeof resolved.css === "object") {
    (_d = resolved.css).modules ?? (_d.modules = {});
    (_e = resolved.css.modules).classNameStrategy ?? (_e.classNameStrategy = "stable");
  }
  resolved.cache ?? (resolved.cache = { dir: "" });
  if (resolved.cache)
    resolved.cache.dir = VitestCache.resolveCacheDir(resolved.root, resolved.cache.dir);
  resolved.sequence ?? (resolved.sequence = {});
  if (!((_f = resolved.sequence) == null ? void 0 : _f.sequencer)) {
    resolved.sequence.sequencer = resolved.sequence.shuffle ? RandomSequencer : BaseSequencer;
  }
  (_g = resolved.sequence).hooks ?? (_g.hooks = "parallel");
  resolved.typecheck = {
    ...configDefaults.typecheck,
    ...resolved.typecheck
  };
  resolved.environmentMatchGlobs = (resolved.environmentMatchGlobs || []).map((i) => [resolve(resolved.root, i[0]), i[1]]);
  if (mode === "typecheck") {
    resolved.include = resolved.typecheck.include;
    resolved.exclude = resolved.typecheck.exclude;
  }
  return resolved;
}

const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';
const isTerminalApp = process.env.TERM_PROGRAM === 'Apple_Terminal';

const ansiEscapes = {};

ansiEscapes.cursorTo = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	if (typeof y !== 'number') {
		return ESC + (x + 1) + 'G';
	}

	return ESC + (y + 1) + ';' + (x + 1) + 'H';
};

ansiEscapes.cursorMove = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	let returnValue = '';

	if (x < 0) {
		returnValue += ESC + (-x) + 'D';
	} else if (x > 0) {
		returnValue += ESC + x + 'C';
	}

	if (y < 0) {
		returnValue += ESC + (-y) + 'A';
	} else if (y > 0) {
		returnValue += ESC + y + 'B';
	}

	return returnValue;
};

ansiEscapes.cursorUp = (count = 1) => ESC + count + 'A';
ansiEscapes.cursorDown = (count = 1) => ESC + count + 'B';
ansiEscapes.cursorForward = (count = 1) => ESC + count + 'C';
ansiEscapes.cursorBackward = (count = 1) => ESC + count + 'D';

ansiEscapes.cursorLeft = ESC + 'G';
ansiEscapes.cursorSavePosition = isTerminalApp ? '\u001B7' : ESC + 's';
ansiEscapes.cursorRestorePosition = isTerminalApp ? '\u001B8' : ESC + 'u';
ansiEscapes.cursorGetPosition = ESC + '6n';
ansiEscapes.cursorNextLine = ESC + 'E';
ansiEscapes.cursorPrevLine = ESC + 'F';
ansiEscapes.cursorHide = ESC + '?25l';
ansiEscapes.cursorShow = ESC + '?25h';

ansiEscapes.eraseLines = count => {
	let clear = '';

	for (let i = 0; i < count; i++) {
		clear += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : '');
	}

	if (count) {
		clear += ansiEscapes.cursorLeft;
	}

	return clear;
};

ansiEscapes.eraseEndLine = ESC + 'K';
ansiEscapes.eraseStartLine = ESC + '1K';
ansiEscapes.eraseLine = ESC + '2K';
ansiEscapes.eraseDown = ESC + 'J';
ansiEscapes.eraseUp = ESC + '1J';
ansiEscapes.eraseScreen = ESC + '2J';
ansiEscapes.scrollUp = ESC + 'S';
ansiEscapes.scrollDown = ESC + 'T';

ansiEscapes.clearScreen = '\u001Bc';

ansiEscapes.clearTerminal = process.platform === 'win32' ?
	`${ansiEscapes.eraseScreen}${ESC}0f` :
	// 1. Erases the screen (Only done in case `2` is not supported)
	// 2. Erases the whole screen including scrollback buffer
	// 3. Moves cursor to the top-left position
	// More info: https://www.real-world-systems.com/docs/ANSIcode.html
	`${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`;

ansiEscapes.beep = BEL;

ansiEscapes.link = (text, url) => {
	return [
		OSC,
		'8',
		SEP,
		SEP,
		url,
		BEL,
		text,
		OSC,
		'8',
		SEP,
		SEP,
		BEL
	].join('');
};

ansiEscapes.image = (buffer, options = {}) => {
	let returnValue = `${OSC}1337;File=inline=1`;

	if (options.width) {
		returnValue += `;width=${options.width}`;
	}

	if (options.height) {
		returnValue += `;height=${options.height}`;
	}

	if (options.preserveAspectRatio === false) {
		returnValue += ';preserveAspectRatio=0';
	}

	return returnValue + ':' + buffer.toString('base64') + BEL;
};

ansiEscapes.iTerm = {
	setCwd: (cwd = process.cwd()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,

	annotation: (message, options = {}) => {
		let returnValue = `${OSC}1337;`;

		const hasX = typeof options.x !== 'undefined';
		const hasY = typeof options.y !== 'undefined';
		if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== 'undefined')) {
			throw new Error('`x`, `y` and `length` must be defined when `x` or `y` is defined');
		}

		message = message.replace(/\|/g, '');

		returnValue += options.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation=';

		if (options.length > 0) {
			returnValue +=
					(hasX ?
						[message, options.length, options.x, options.y] :
						[options.length, message]).join('|');
		} else {
			returnValue += message;
		}

		return returnValue + BEL;
	}
};

const restoreCursor = onetime.exports(() => {
	signalExit.exports(() => {
		process$1.stderr.write('\u001B[?25h');
	}, {alwaysLast: true});
});

let isHidden = false;

const cliCursor = {};

cliCursor.show = (writableStream = process$1.stderr) => {
	if (!writableStream.isTTY) {
		return;
	}

	isHidden = false;
	writableStream.write('\u001B[?25h');
};

cliCursor.hide = (writableStream = process$1.stderr) => {
	if (!writableStream.isTTY) {
		return;
	}

	restoreCursor();
	isHidden = true;
	writableStream.write('\u001B[?25l');
};

cliCursor.toggle = (force, writableStream) => {
	if (force !== undefined) {
		isHidden = force;
	}

	if (isHidden) {
		cliCursor.show(writableStream);
	} else {
		cliCursor.hide(writableStream);
	}
};

const ESCAPES = new Set([
	'\u001B',
	'\u009B',
]);

const END_CODE = 39;
const ANSI_ESCAPE_BELL = '\u0007';
const ANSI_CSI = '[';
const ANSI_OSC = ']';
const ANSI_SGR_TERMINATOR = 'm';
const ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;

const wrapAnsiCode = code => `${ESCAPES.values().next().value}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
const wrapAnsiHyperlink = uri => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${uri}${ANSI_ESCAPE_BELL}`;

// Calculate the length of words split on ' ', ignoring
// the extra characters added by ansi escape codes
const wordLengths = string => string.split(' ').map(character => stringWidth(character));

// Wrap a long word across multiple rows
// Ansi escape codes do not count towards length
const wrapWord = (rows, word, columns) => {
	const characters = [...word];

	let isInsideEscape = false;
	let isInsideLinkEscape = false;
	let visible = stringWidth(stripAnsi(rows[rows.length - 1]));

	for (const [index, character] of characters.entries()) {
		const characterLength = stringWidth(character);

		if (visible + characterLength <= columns) {
			rows[rows.length - 1] += character;
		} else {
			rows.push(character);
			visible = 0;
		}

		if (ESCAPES.has(character)) {
			isInsideEscape = true;
			isInsideLinkEscape = characters.slice(index + 1).join('').startsWith(ANSI_ESCAPE_LINK);
		}

		if (isInsideEscape) {
			if (isInsideLinkEscape) {
				if (character === ANSI_ESCAPE_BELL) {
					isInsideEscape = false;
					isInsideLinkEscape = false;
				}
			} else if (character === ANSI_SGR_TERMINATOR) {
				isInsideEscape = false;
			}

			continue;
		}

		visible += characterLength;

		if (visible === columns && index < characters.length - 1) {
			rows.push('');
			visible = 0;
		}
	}

	// It's possible that the last row we copy over is only
	// ansi escape characters, handle this edge-case
	if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
		rows[rows.length - 2] += rows.pop();
	}
};

// Trims spaces from a string ignoring invisible sequences
const stringVisibleTrimSpacesRight = string => {
	const words = string.split(' ');
	let last = words.length;

	while (last > 0) {
		if (stringWidth(words[last - 1]) > 0) {
			break;
		}

		last--;
	}

	if (last === words.length) {
		return string;
	}

	return words.slice(0, last).join(' ') + words.slice(last).join('');
};

// The wrap-ansi module can be invoked in either 'hard' or 'soft' wrap mode
//
// 'hard' will never allow a string to take up more than columns characters
//
// 'soft' allows long words to expand past the column length
const exec = (string, columns, options = {}) => {
	if (options.trim !== false && string.trim() === '') {
		return '';
	}

	let returnValue = '';
	let escapeCode;
	let escapeUrl;

	const lengths = wordLengths(string);
	let rows = [''];

	for (const [index, word] of string.split(' ').entries()) {
		if (options.trim !== false) {
			rows[rows.length - 1] = rows[rows.length - 1].trimStart();
		}

		let rowLength = stringWidth(rows[rows.length - 1]);

		if (index !== 0) {
			if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
				// If we start with a new word but the current row length equals the length of the columns, add a new row
				rows.push('');
				rowLength = 0;
			}

			if (rowLength > 0 || options.trim === false) {
				rows[rows.length - 1] += ' ';
				rowLength++;
			}
		}

		// In 'hard' wrap mode, the length of a line is never allowed to extend past 'columns'
		if (options.hard && lengths[index] > columns) {
			const remainingColumns = (columns - rowLength);
			const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
			const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
			if (breaksStartingNextLine < breaksStartingThisLine) {
				rows.push('');
			}

			wrapWord(rows, word, columns);
			continue;
		}

		if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
			if (options.wordWrap === false && rowLength < columns) {
				wrapWord(rows, word, columns);
				continue;
			}

			rows.push('');
		}

		if (rowLength + lengths[index] > columns && options.wordWrap === false) {
			wrapWord(rows, word, columns);
			continue;
		}

		rows[rows.length - 1] += word;
	}

	if (options.trim !== false) {
		rows = rows.map(row => stringVisibleTrimSpacesRight(row));
	}

	const pre = [...rows.join('\n')];

	for (const [index, character] of pre.entries()) {
		returnValue += character;

		if (ESCAPES.has(character)) {
			const {groups} = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`).exec(pre.slice(index).join('')) || {groups: {}};
			if (groups.code !== undefined) {
				const code = Number.parseFloat(groups.code);
				escapeCode = code === END_CODE ? undefined : code;
			} else if (groups.uri !== undefined) {
				escapeUrl = groups.uri.length === 0 ? undefined : groups.uri;
			}
		}

		const code = ansiStyles.codes.get(Number(escapeCode));

		if (pre[index + 1] === '\n') {
			if (escapeUrl) {
				returnValue += wrapAnsiHyperlink('');
			}

			if (escapeCode && code) {
				returnValue += wrapAnsiCode(code);
			}
		} else if (character === '\n') {
			if (escapeCode && code) {
				returnValue += wrapAnsiCode(escapeCode);
			}

			if (escapeUrl) {
				returnValue += wrapAnsiHyperlink(escapeUrl);
			}
		}
	}

	return returnValue;
};

// For each newline, invoke the method separately
function wrapAnsi(string, columns, options) {
	return String(string)
		.normalize()
		.replace(/\r\n/g, '\n')
		.split('\n')
		.map(line => exec(line, columns, options))
		.join('\n');
}

const defaultTerminalHeight = 24;

const getWidth = stream => {
	const {columns} = stream;

	if (!columns) {
		return 80;
	}

	return columns;
};

const fitToTerminalHeight = (stream, text) => {
	const terminalHeight = stream.rows || defaultTerminalHeight;
	const lines = text.split('\n');

	const toRemove = lines.length - terminalHeight;
	if (toRemove <= 0) {
		return text;
	}

	return sliceAnsi(
		text,
		stripAnsi(lines.slice(0, toRemove).join('\n')).length + 1,
	);
};

function createLogUpdate(stream, {showCursor = false} = {}) {
	let previousLineCount = 0;
	let previousWidth = getWidth(stream);
	let previousOutput = '';

	const render = (...arguments_) => {
		if (!showCursor) {
			cliCursor.hide();
		}

		let output = arguments_.join(' ') + '\n';
		output = fitToTerminalHeight(stream, output);
		const width = getWidth(stream);
		if (output === previousOutput && previousWidth === width) {
			return;
		}

		previousOutput = output;
		previousWidth = width;
		output = wrapAnsi(output, width, {
			trim: false,
			hard: true,
			wordWrap: false,
		});
		stream.write(ansiEscapes.eraseLines(previousLineCount) + output);
		previousLineCount = output.split('\n').length;
	};

	render.clear = () => {
		stream.write(ansiEscapes.eraseLines(previousLineCount));
		previousOutput = '';
		previousWidth = getWidth(stream);
		previousLineCount = 0;
	};

	render.done = () => {
		previousOutput = '';
		previousWidth = getWidth(stream);
		previousLineCount = 0;

		if (!showCursor) {
			cliCursor.show();
		}
	};

	return render;
}

createLogUpdate(process$1.stdout);

createLogUpdate(process$1.stderr);

var version = "0.27.3";

function formatLine(line, outputTruncateLength) {
  var _a;
  return cliTruncate(line, (outputTruncateLength ?? (((_a = process.stdout) == null ? void 0 : _a.columns) || 80)) - 4);
}
function unifiedDiff(actual, expected, options = {}) {
  if (actual === expected)
    return "";
  const { outputTruncateLength, outputDiffLines, outputDiffMaxLines, noColor, showLegend = true } = options;
  const indent = "  ";
  const diffLimit = outputDiffLines || 15;
  const diffMaxLines = outputDiffMaxLines || 50;
  const counts = {
    "+": 0,
    "-": 0
  };
  let previousState = null;
  let previousCount = 0;
  const str = (str2) => str2;
  const dim = noColor ? str : c.dim;
  const green = noColor ? str : c.green;
  const red = noColor ? str : c.red;
  function preprocess(line) {
    if (!line || line.match(/\\ No newline/))
      return;
    const char = line[0];
    if ("-+".includes(char)) {
      if (previousState !== char) {
        previousState = char;
        previousCount = 0;
      }
      previousCount++;
      counts[char]++;
      if (previousCount === diffLimit)
        return dim(`${char} ...`);
      else if (previousCount > diffLimit)
        return;
    }
    return line;
  }
  const msg = createPatch("string", expected, actual);
  let lines = msg.split("\n").slice(5).map(preprocess).filter(Boolean);
  let moreLines = 0;
  const isCompact = counts["+"] === 1 && counts["-"] === 1 && lines.length === 2;
  if (lines.length > diffMaxLines) {
    const firstDiff = lines.findIndex((line) => line[0] === "-" || line[0] === "+");
    const displayLines = lines.slice(firstDiff - 2, diffMaxLines);
    const lastDisplayedIndex = firstDiff - 2 + diffMaxLines;
    if (lastDisplayedIndex < lines.length)
      moreLines = lines.length - lastDisplayedIndex;
    lines = displayLines;
  }
  let formatted = lines.map((line) => {
    line = line.replace(/\\"/g, '"');
    if (line[0] === "-") {
      line = formatLine(line.slice(1), outputTruncateLength);
      if (isCompact)
        return green(line);
      return green(`- ${formatLine(line, outputTruncateLength)}`);
    }
    if (line[0] === "+") {
      line = formatLine(line.slice(1), outputTruncateLength);
      if (isCompact)
        return red(line);
      return red(`+ ${formatLine(line, outputTruncateLength)}`);
    }
    if (line.match(/@@/))
      return "--";
    return ` ${line}`;
  });
  if (moreLines)
    formatted.push(dim(`... ${moreLines} more lines`));
  if (showLegend) {
    if (isCompact) {
      formatted = [
        `${green("- Expected")}   ${formatted[0]}`,
        `${red("+ Received")}   ${formatted[1]}`
      ];
    } else {
      if (formatted[0].includes('"'))
        formatted[0] = formatted[0].replace('"', "");
      const last = formatted.length - 1;
      if (formatted[last].endsWith('"'))
        formatted[last] = formatted[last].slice(0, formatted[last].length - 1);
      formatted.unshift(
        green(`- Expected  - ${counts["-"]}`),
        red(`+ Received  + ${counts["+"]}`),
        ""
      );
    }
  }
  return formatted.map((i) => i ? indent + i : i).join("\n");
}

async function printError(error, ctx, options = {}) {
  const { showCodeFrame = true, fullStack = false, type } = options;
  let e = error;
  if (typeof error === "string") {
    e = {
      message: error.split(/\n/g)[0],
      stack: error
    };
  }
  if (!e) {
    const error2 = new Error("unknown error");
    e = {
      message: e ?? error2.message,
      stack: error2.stack
    };
  }
  const stacks = parseStacktrace(e, fullStack);
  const nearest = error instanceof TypeCheckError ? error.stacks[0] : stacks.find(
    (stack) => ctx.server.moduleGraph.getModuleById(stack.file) && existsSync$1(stack.file)
  );
  const errorProperties = getErrorProperties(e);
  if (type)
    printErrorType(type, ctx);
  printErrorMessage(e, ctx.logger);
  if (e.frame) {
    ctx.logger.error(c.yellow(e.frame));
  } else {
    printStack(ctx, stacks, nearest, errorProperties, (s) => {
      if (showCodeFrame && s === nearest && nearest) {
        const sourceCode = readFileSync(nearest.file, "utf-8");
        ctx.logger.error(c.yellow(generateCodeFrame(sourceCode, 4, s.line, s.column)));
      }
    });
  }
  const testPath = e.VITEST_TEST_PATH;
  const testName = e.VITEST_TEST_NAME;
  if (testPath)
    ctx.logger.error(c.red(`This error originated in "${c.bold(testPath)}" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.`));
  if (testName) {
    ctx.logger.error(c.red(`The latest test that might've caused the error is "${c.bold(testName)}". It might mean one of the following:
- The error was thrown, while Vitest was running this test.
- This was the last recorded test before the error was thrown, if error originated after test finished its execution.`));
  }
  if (typeof e.cause === "object" && e.cause && "name" in e.cause) {
    e.cause.name = `Caused by: ${e.cause.name}`;
    await printError(e.cause, ctx, { fullStack, showCodeFrame: false });
  }
  handleImportOutsideModuleError(e.stack || e.stackStr || "", ctx);
  if (e.showDiff || e.showDiff === void 0 && e.actual && e.expected) {
    displayDiff(stringify(e.actual), stringify(e.expected), ctx.logger.console, {
      outputTruncateLength: ctx.config.outputTruncateLength,
      outputDiffLines: ctx.config.outputDiffLines,
      outputDiffMaxLines: ctx.config.outputDiffMaxLines
    });
  }
}
function printErrorType(type, ctx) {
  ctx.logger.error(`
${c.red(divider(c.bold(c.inverse(` ${type} `))))}`);
}
const skipErrorProperties = /* @__PURE__ */ new Set([
  "nameStr",
  "stack",
  "cause",
  "stacks",
  "stackStr",
  "type",
  "showDiff",
  "actual",
  "expected",
  "VITEST_TEST_NAME",
  "VITEST_TEST_PATH",
  ...Object.getOwnPropertyNames(Error.prototype),
  ...Object.getOwnPropertyNames(Object.prototype)
]);
function getErrorProperties(e) {
  const errorObject = /* @__PURE__ */ Object.create(null);
  if (e.name === "AssertionError")
    return errorObject;
  for (const key of Object.getOwnPropertyNames(e)) {
    if (!skipErrorProperties.has(key))
      errorObject[key] = e[key];
  }
  return errorObject;
}
const esmErrors = [
  "Cannot use import statement outside a module",
  "Unexpected token 'export'"
];
function handleImportOutsideModuleError(stack, ctx) {
  if (!esmErrors.some((e) => stack.includes(e)))
    return;
  const path = normalize(stack.split("\n")[0].trim());
  let name = path.split("/node_modules/").pop() || "";
  if (name == null ? void 0 : name.startsWith("@"))
    name = name.split("/").slice(0, 2).join("/");
  else
    name = name.split("/")[0];
  ctx.logger.error(c.yellow(
    `Module ${path} seems to be an ES Module but shipped in a CommonJS package. You might want to create an issue to the package ${c.bold(`"${name}"`)} asking them to ship the file in .mjs extension or add "type": "module" in their package.json.

As a temporary workaround you can try to inline the package by updating your config:

` + c.gray(c.dim("// vitest.config.js")) + "\n" + c.green(`export default {
  test: {
    deps: {
      inline: [
        ${c.yellow(c.bold(`"${name}"`))}
      ]
    }
  }
}
`)
  ));
}
function displayDiff(actual, expected, console, options = {}) {
  const diff = unifiedDiff(actual, expected, options);
  const dim = options.noColor ? (s) => s : c.dim;
  const black = options.noColor ? (s) => s : c.black;
  if (diff)
    console.error(diff + "\n");
  else if (actual && expected && actual !== '"undefined"' && expected !== '"undefined"')
    console.error(dim("Could not display diff. It's possible objects are too large to compare.\nTry increasing ") + black("--outputDiffMaxSize") + dim(" option.\n"));
}
function printErrorMessage(error, logger) {
  const errorName = error.name || error.nameStr || "Unknown Error";
  logger.error(c.red(`${c.bold(errorName)}: ${error.message}`));
}
function printStack(ctx, stack, highlight, errorProperties, onStack) {
  if (!stack.length)
    return;
  const logger = ctx.logger;
  for (const frame of stack) {
    const color = frame === highlight ? c.yellow : c.gray;
    const path = relative(ctx.config.root, frame.file);
    logger.error(color(` ${c.dim(F_POINTER)} ${[frame.method, c.dim(`${path}:${frame.line}:${frame.column}`)].filter(Boolean).join(" ")}`));
    onStack == null ? void 0 : onStack(frame);
  }
  logger.error();
  const hasProperties = Object.keys(errorProperties).length > 0;
  if (hasProperties) {
    logger.error(c.red(c.dim(divider())));
    const propertiesString = stringify(errorProperties, 10, { printBasicPrototype: false });
    logger.error(c.red(c.bold("Serialized Error:")), c.gray(propertiesString));
  }
}
function generateCodeFrame(source, indent = 0, lineNumber, columnNumber, range = 2) {
  var _a;
  const start = positionToOffset(source, lineNumber, columnNumber);
  const end = start;
  const lines = source.split(lineSplitRE);
  let count = 0;
  let res = [];
  const columns = ((_a = process.stdout) == null ? void 0 : _a.columns) || 80;
  function lineNo(no = "") {
    return c.gray(`${String(no).padStart(3, " ")}| `);
  }
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const lineLength = lines[j].length;
        if (lineLength > 200)
          return "";
        res.push(lineNo(j + 1) + cliTruncate(lines[j].replace(/\t/g, " "), columns - 5 - indent));
        if (j === i) {
          const pad = start - (count - lineLength);
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(lineNo() + " ".repeat(pad) + c.red("^".repeat(length)));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(1, Math.min(end - count, lineLength));
            res.push(lineNo() + c.red("^".repeat(length)));
          }
          count += lineLength + 1;
        }
      }
      break;
    }
  }
  if (indent)
    res = res.map((line) => " ".repeat(indent) + line);
  return res.join("\n");
}

class Logger {
  constructor(ctx, console = globalThis.console) {
    this.ctx = ctx;
    this.console = console;
    this.outputStream = process.stdout;
    this.errorStream = process.stderr;
    this.logUpdate = createLogUpdate(process.stdout);
  }
  log(...args) {
    this._clearScreen();
    this.console.log(...args);
  }
  error(...args) {
    this._clearScreen();
    this.console.error(...args);
  }
  warn(...args) {
    this._clearScreen();
    this.console.warn(...args);
  }
  clearFullScreen(message) {
    if (this.ctx.server.config.clearScreen === false) {
      this.console.log(message);
      return;
    }
    this.console.log(`\x1Bc${message}`);
  }
  clearScreen(message, force = false) {
    if (this.ctx.server.config.clearScreen === false) {
      this.console.log(message);
      return;
    }
    this._clearScreenPending = message;
    if (force)
      this._clearScreen();
  }
  _clearScreen() {
    if (this._clearScreenPending == null)
      return;
    const log = this._clearScreenPending;
    this._clearScreenPending = void 0;
    this.console.log(`\x1B[1;1H\x1B[J${log}`);
  }
  printError(err, fullStack = false, type) {
    return printError(err, this.ctx, {
      fullStack,
      type,
      showCodeFrame: true
    });
  }
  printNoTestFound(filters) {
    const config = this.ctx.config;
    const comma = c.dim(", ");
    if (filters == null ? void 0 : filters.length)
      this.console.error(c.dim("filter:  ") + c.yellow(filters.join(comma)));
    if (config.include)
      this.console.error(c.dim("include: ") + c.yellow(config.include.join(comma)));
    if (config.exclude)
      this.console.error(c.dim("exclude:  ") + c.yellow(config.exclude.join(comma)));
    if (config.watchExclude)
      this.console.error(c.dim("watch exclude:  ") + c.yellow(config.watchExclude.join(comma)));
    if (config.passWithNoTests)
      this.log(`No ${config.mode} files found, exiting with code 0
`);
    else
      this.error(c.red(`
No ${config.mode} files found, exiting with code 1`));
  }
  printBanner() {
    var _a, _b, _c;
    this.log();
    const versionTest = this.ctx.config.watch ? c.blue(`v${version}`) : c.cyan(`v${version}`);
    const mode = this.ctx.config.watch ? c.blue(" DEV ") : c.cyan(" RUN ");
    this.log(`${c.inverse(c.bold(mode))} ${versionTest} ${c.gray(this.ctx.config.root)}`);
    if (this.ctx.config.browser)
      this.log(c.dim(c.green(`      Browser runner started at http://${((_a = this.ctx.config.api) == null ? void 0 : _a.host) || "localhost"}:${c.bold(`${this.ctx.server.config.server.port}`)}`)));
    else if (this.ctx.config.ui)
      this.log(c.dim(c.green(`      UI started at http://${((_b = this.ctx.config.api) == null ? void 0 : _b.host) || "localhost"}:${c.bold(`${this.ctx.server.config.server.port}`)}${this.ctx.config.uiBase}`)));
    else if (this.ctx.config.api)
      this.log(c.dim(c.green(`      API started at http://${((_c = this.ctx.config.api) == null ? void 0 : _c.host) || "localhost"}:${c.bold(`${this.ctx.config.api.port}`)}`)));
    if (this.ctx.coverageProvider)
      this.log(c.dim("      Coverage enabled with ") + c.yellow(this.ctx.coverageProvider.name));
    this.log();
  }
  async printUnhandledErrors(errors) {
    const errorMessage = c.red(c.bold(
      `
Vitest caught ${errors.length} unhandled error${errors.length > 1 ? "s" : ""} during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.`
    ));
    this.log(c.red(divider(c.bold(c.inverse(" Unhandled Errors ")))));
    this.log(errorMessage);
    await Promise.all(errors.map(async (err) => {
      await this.printError(err, true, err.type || "Unhandled Error");
    }));
    this.log(c.red(divider()));
  }
  async printSourceTypeErrors(errors) {
    const errorMessage = c.red(c.bold(
      `
Vitest found ${errors.length} error${errors.length > 1 ? "s" : ""} not related to your test files.`
    ));
    this.log(c.red(divider(c.bold(c.inverse(" Source Errors ")))));
    this.log(errorMessage);
    await Promise.all(errors.map(async (err) => {
      await this.printError(err, true);
    }));
    this.log(c.red(divider()));
  }
}

const WATCHER_DEBOUNCE = 100;
class Vitest {
  constructor(mode) {
    this.mode = mode;
    this.config = void 0;
    this.server = void 0;
    this.state = void 0;
    this.snapshot = void 0;
    this.cache = void 0;
    this.reporters = void 0;
    this.vitenode = void 0;
    this.invalidates = /* @__PURE__ */ new Set();
    this.changedTests = /* @__PURE__ */ new Set();
    this.isFirstRun = true;
    this.restartsCount = 0;
    this.runner = void 0;
    this._onRestartListeners = [];
    this._onSetServer = [];
    this.unregisterWatcher = noop$1;
    this.logger = new Logger(this);
  }
  async setServer(options, server) {
    var _a, _b, _c;
    (_a = this.unregisterWatcher) == null ? void 0 : _a.call(this);
    safeClearTimeout(this._rerunTimer);
    this.restartsCount += 1;
    (_b = this.pool) == null ? void 0 : _b.close();
    this.pool = void 0;
    const resolved = resolveConfig(this.mode, options, server.config);
    this.server = server;
    this.config = resolved;
    this.state = new StateManager();
    this.cache = new VitestCache();
    this.snapshot = new SnapshotManager({ ...resolved.snapshotOptions });
    if (this.config.watch && this.mode !== "typecheck")
      this.registerWatcher();
    this.vitenode = new ViteNodeServer(server, this.config);
    const node = this.vitenode;
    this.runner = new ViteNodeRunner({
      root: server.config.root,
      base: server.config.base,
      fetchModule(id) {
        return node.fetchModule(id);
      },
      resolveId(id, importer) {
        return node.resolveId(id, importer);
      }
    });
    if (this.config.watch) {
      const serverRestart = server.restart;
      server.restart = async (...args) => {
        await Promise.all(this._onRestartListeners.map((fn) => fn()));
        return await serverRestart(...args);
      };
      server.watcher.on("change", async (file) => {
        file = normalizePath(file);
        const isConfig = file === server.config.configFile;
        if (isConfig) {
          await Promise.all(this._onRestartListeners.map((fn) => fn("config")));
          await serverRestart();
        }
      });
    }
    this.reporters = resolved.mode === "benchmark" ? await createBenchmarkReporters(toArray((_c = resolved.benchmark) == null ? void 0 : _c.reporters), this.runner) : await createReporters(resolved.reporters, this.runner);
    this.runningPromise = void 0;
    this.cache.results.setConfig(resolved.root, resolved.cache);
    try {
      await this.cache.results.readFromCache();
    } catch {
    }
    await Promise.all(this._onSetServer.map((fn) => fn()));
  }
  async initCoverageProvider() {
    if (this.coverageProvider !== void 0)
      return;
    this.coverageProvider = await getCoverageProvider(this.config.coverage);
    if (this.coverageProvider) {
      await this.coverageProvider.initialize(this);
      this.config.coverage = this.coverageProvider.resolveOptions();
    }
    return this.coverageProvider;
  }
  getSerializableConfig() {
    return deepMerge(
      {
        ...this.config,
        reporters: [],
        snapshotOptions: {
          ...this.config.snapshotOptions,
          resolveSnapshotPath: void 0
        },
        onConsoleLog: void 0,
        sequence: {
          ...this.config.sequence,
          sequencer: void 0
        },
        benchmark: {
          ...this.config.benchmark,
          reporters: []
        }
      },
      this.configOverride || {}
    );
  }
  async typecheck(filters = []) {
    const { include, exclude } = this.config.typecheck;
    const testsFilesList = await this.globFiles(filters, include, exclude);
    const checker = new Typechecker(this, testsFilesList);
    this.typechecker = checker;
    checker.onParseEnd(async ({ files, sourceErrors }) => {
      this.state.collectFiles(checker.getTestFiles());
      await this.report("onTaskUpdate", checker.getTestPacks());
      await this.report("onCollected");
      if (!files.length) {
        this.logger.printNoTestFound();
      } else {
        if (hasFailed(files))
          process.exitCode = 1;
        await this.report("onFinished", files);
      }
      if (sourceErrors.length && !this.config.typecheck.ignoreSourceErrors) {
        process.exitCode = 1;
        await this.logger.printSourceTypeErrors(sourceErrors);
      }
      if (!files.length) {
        const exitCode = this.config.passWithNoTests ? process.exitCode ?? 0 : 1;
        process.exit(exitCode);
      }
      if (this.config.watch) {
        await this.report("onWatcherStart", files, [
          ...sourceErrors,
          ...this.state.getUnhandledErrors()
        ]);
      }
    });
    checker.onParseStart(async () => {
      await this.report("onInit", this);
      this.state.collectFiles(checker.getTestFiles());
      await this.report("onCollected");
    });
    checker.onWatcherRerun(async () => {
      await this.report("onWatcherRerun", testsFilesList, "File change detected. Triggering rerun.");
      await checker.collectTests();
      this.state.collectFiles(checker.getTestFiles());
      await this.report("onTaskUpdate", checker.getTestPacks());
      await this.report("onCollected");
    });
    await checker.prepare();
    await checker.collectTests();
    await checker.start();
  }
  async start(filters) {
    var _a;
    if (this.mode === "typecheck") {
      await this.typecheck(filters);
      return;
    }
    try {
      await this.initCoverageProvider();
      await ((_a = this.coverageProvider) == null ? void 0 : _a.clean(this.config.coverage.clean));
    } catch (e) {
      this.logger.error(e);
      process.exit(1);
    }
    await this.report("onInit", this);
    const files = await this.filterTestsBySource(
      await this.globTestFiles(filters)
    );
    if (!files.length) {
      const exitCode = this.config.passWithNoTests ? 0 : 1;
      this.logger.printNoTestFound(filters);
      process.exit(exitCode);
    }
    await Promise.all(files.map((file) => this.cache.stats.updateStats(file)));
    await this.runFiles(files);
    await this.reportCoverage(true);
    if (this.config.watch && !this.config.browser)
      await this.report("onWatcherStart");
  }
  async getTestDependencies(filepath) {
    const deps = /* @__PURE__ */ new Set();
    const addImports = async (filepath2) => {
      const transformed = await this.vitenode.transformRequest(filepath2);
      if (!transformed)
        return;
      const dependencies = [...transformed.deps || [], ...transformed.dynamicDeps || []];
      for (const dep of dependencies) {
        const path = await this.server.pluginContainer.resolveId(dep, filepath2, { ssr: true });
        const fsPath = path && !path.external && path.id.split("?")[0];
        if (fsPath && !fsPath.includes("node_modules") && !deps.has(fsPath) && existsSync(fsPath)) {
          deps.add(fsPath);
          await addImports(fsPath);
        }
      }
    };
    await addImports(filepath);
    return deps;
  }
  async filterTestsBySource(tests) {
    if (this.config.changed && !this.config.related) {
      const { VitestGit } = await import('./chunk-node-git.59caac18.js');
      const vitestGit = new VitestGit(this.config.root);
      const related2 = await vitestGit.findChangedFiles({
        changedSince: this.config.changed
      });
      if (!related2) {
        this.logger.error(c.red("Could not find Git root. Have you initialized git with `git init`?\n"));
        process.exit(1);
      }
      this.config.related = Array.from(new Set(related2));
    }
    const related = this.config.related;
    if (!related)
      return tests;
    const forceRerunTriggers = this.config.forceRerunTriggers;
    if (forceRerunTriggers.length && micromatch_1(related, forceRerunTriggers).length)
      return tests;
    if (!related.length)
      return [];
    const testGraphs = await Promise.all(
      tests.map(async (filepath) => {
        const deps = await this.getTestDependencies(filepath);
        return [filepath, deps];
      })
    );
    const runningTests = [];
    for (const [filepath, deps] of testGraphs) {
      if (related.some((path) => path === filepath || deps.has(path)))
        runningTests.push(filepath);
    }
    return runningTests;
  }
  async runFiles(paths) {
    paths = Array.from(new Set(paths));
    await this.runningPromise;
    this.state.startCollectingPaths();
    this.runningPromise = (async () => {
      if (!this.pool)
        this.pool = createPool(this);
      const invalidates = Array.from(this.invalidates);
      this.invalidates.clear();
      this.snapshot.clear();
      this.state.clearErrors();
      try {
        await this.pool.runTests(paths, invalidates);
      } catch (err) {
        this.state.catchError(err, "Unhandled Error");
      }
      const files = this.state.getFiles();
      if (hasFailed(files))
        process.exitCode = 1;
      this.cache.results.updateResults(files);
      await this.cache.results.writeToCache();
    })().finally(async () => {
      this.state.finishCollectingPaths();
      if (!this.config.browser)
        await this.report("onFinished", this.state.getFiles(paths), this.state.getUnhandledErrors());
      this.runningPromise = void 0;
    });
    return await this.runningPromise;
  }
  async rerunFiles(files = this.state.getFilepaths(), trigger) {
    if (this.coverageProvider && this.config.coverage.cleanOnRerun)
      await this.coverageProvider.clean();
    await this.report("onWatcherRerun", files, trigger);
    await this.runFiles(files);
    await this.reportCoverage(!trigger);
    if (!this.config.browser)
      await this.report("onWatcherStart");
  }
  async changeNamePattern(pattern, files = this.state.getFilepaths(), trigger) {
    this.config.testNamePattern = pattern ? new RegExp(pattern) : void 0;
    await this.rerunFiles(files, trigger);
  }
  async changeFilenamePattern(pattern) {
    const files = this.state.getFilepaths();
    if (!pattern)
      return await this.rerunFiles(files, "reset filename pattern");
    const filteredFiles = await this.globTestFiles([pattern]);
    await this.rerunFiles(filteredFiles, "change filename pattern");
  }
  async rerunFailed() {
    await this.rerunFiles(this.state.getFailedFilepaths(), "rerun failed");
  }
  async updateSnapshot(files) {
    files = files || [
      ...this.state.getFailedFilepaths(),
      ...this.snapshot.summary.uncheckedKeysByFile.map((s) => s.filePath)
    ];
    this.configOverride = {
      snapshotOptions: {
        updateSnapshot: "all"
      }
    };
    try {
      await this.rerunFiles(files, "update snapshot");
    } finally {
      this.configOverride = void 0;
    }
  }
  async scheduleRerun(triggerId) {
    const currentCount = this.restartsCount;
    safeClearTimeout(this._rerunTimer);
    await this.runningPromise;
    safeClearTimeout(this._rerunTimer);
    if (this.restartsCount !== currentCount)
      return;
    this._rerunTimer = safeSetTimeout(async () => {
      if (this.changedTests.size === 0) {
        this.invalidates.clear();
        return;
      }
      if (this.restartsCount !== currentCount)
        return;
      this.isFirstRun = false;
      this.snapshot.clear();
      const files = Array.from(this.changedTests);
      this.changedTests.clear();
      if (this.coverageProvider && this.config.coverage.cleanOnRerun)
        await this.coverageProvider.clean();
      await this.report("onWatcherRerun", files, triggerId);
      await this.runFiles(files);
      await this.reportCoverage(false);
      if (!this.config.browser)
        await this.report("onWatcherStart");
    }, WATCHER_DEBOUNCE);
  }
  registerWatcher() {
    const updateLastChanged = (id) => {
      const mod = this.server.moduleGraph.getModuleById(id);
      if (mod)
        mod.lastHMRTimestamp = Date.now();
    };
    const onChange = (id) => {
      id = slash$1(id);
      updateLastChanged(id);
      const needsRerun = this.handleFileChanged(id);
      if (needsRerun)
        this.scheduleRerun(id);
    };
    const onUnlink = (id) => {
      id = slash$1(id);
      this.invalidates.add(id);
      if (this.state.filesMap.has(id)) {
        this.state.filesMap.delete(id);
        this.cache.results.removeFromCache(id);
        this.cache.stats.removeStats(id);
        this.changedTests.delete(id);
        this.report("onTestRemoved", id);
      }
    };
    const onAdd = async (id) => {
      id = slash$1(id);
      updateLastChanged(id);
      if (await this.isTargetFile(id)) {
        this.changedTests.add(id);
        await this.cache.stats.updateStats(id);
        this.scheduleRerun(id);
      }
    };
    const watcher = this.server.watcher;
    if (this.config.forceRerunTriggers.length)
      watcher.add(this.config.forceRerunTriggers);
    watcher.unwatch(this.config.watchExclude);
    watcher.on("change", onChange);
    watcher.on("unlink", onUnlink);
    watcher.on("add", onAdd);
    this.unregisterWatcher = () => {
      watcher.off("change", onChange);
      watcher.off("unlink", onUnlink);
      watcher.off("add", onAdd);
      this.unregisterWatcher = noop$1;
    };
  }
  handleFileChanged(id) {
    if (this.changedTests.has(id) || this.invalidates.has(id))
      return false;
    if (micromatch_1.isMatch(id, this.config.forceRerunTriggers)) {
      this.state.getFilepaths().forEach((file) => this.changedTests.add(file));
      return true;
    }
    const mod = this.server.moduleGraph.getModuleById(id);
    if (!mod)
      return false;
    this.invalidates.add(id);
    if (this.state.filesMap.has(id)) {
      this.changedTests.add(id);
      return true;
    }
    let rerun = false;
    mod.importers.forEach((i) => {
      if (!i.id)
        return;
      const heedsRerun = this.handleFileChanged(i.id);
      if (heedsRerun)
        rerun = true;
    });
    return rerun;
  }
  async reportCoverage(allTestsRun) {
    if (this.coverageProvider) {
      this.logger.log(c.blue(" % ") + c.dim("Coverage report from ") + c.yellow(this.coverageProvider.name));
      await this.coverageProvider.reportCoverage({ allTestsRun });
    }
  }
  async close() {
    var _a, _b;
    if (!this.closingPromise) {
      this.closingPromise = Promise.allSettled([
        (_a = this.pool) == null ? void 0 : _a.close(),
        this.server.close(),
        (_b = this.typechecker) == null ? void 0 : _b.stop()
      ].filter(Boolean)).then((results) => {
        results.filter((r) => r.status === "rejected").forEach((err) => {
          this.logger.error("error during close", err.reason);
        });
      });
    }
    return this.closingPromise;
  }
  async exit(force = false) {
    safeSetTimeout(() => {
      this.report("onProcessTimeout").then(() => {
        console.warn(`close timed out after ${this.config.teardownTimeout}ms`);
        process.exit();
      });
    }, this.config.teardownTimeout).unref();
    await this.close();
    if (force)
      process.exit();
  }
  async report(name, ...args) {
    await Promise.all(this.reporters.map((r) => {
      var _a;
      return (_a = r[name]) == null ? void 0 : _a.call(
        r,
        ...args
      );
    }));
  }
  async globFiles(filters, include, exclude) {
    const globOptions = {
      absolute: true,
      dot: true,
      cwd: this.config.dir || this.config.root,
      ignore: exclude
    };
    let testFiles = await out(include, globOptions);
    if (filters.length && process.platform === "win32")
      filters = filters.map((f) => toNamespacedPath(f));
    if (filters.length)
      testFiles = testFiles.filter((i) => filters.some((f) => i.includes(f)));
    return testFiles;
  }
  async globTestFiles(filters = []) {
    const { include, exclude, includeSource } = this.config;
    const testFiles = await this.globFiles(filters, include, exclude);
    if (includeSource) {
      const files = await this.globFiles(filters, includeSource, exclude);
      await Promise.all(files.map(async (file) => {
        try {
          const code = await promises.readFile(file, "utf-8");
          if (this.isInSourceTestFile(code))
            testFiles.push(file);
        } catch {
          return null;
        }
      }));
    }
    return testFiles;
  }
  async isTargetFile(id, source) {
    var _a;
    const relativeId = relative(this.config.dir || this.config.root, id);
    if (micromatch_1.isMatch(relativeId, this.config.exclude))
      return false;
    if (micromatch_1.isMatch(relativeId, this.config.include))
      return true;
    if (((_a = this.config.includeSource) == null ? void 0 : _a.length) && micromatch_1.isMatch(relativeId, this.config.includeSource)) {
      source = source || await promises.readFile(id, "utf-8");
      return this.isInSourceTestFile(source);
    }
    return false;
  }
  isInSourceTestFile(code) {
    return code.includes("import.meta.vitest");
  }
  onServerRestart(fn) {
    this._onRestartListeners.push(fn);
  }
  onAfterSetServer(fn) {
    this._onSetServer.push(fn);
  }
}

function generateCssFilenameHash(filepath) {
  return createHash$1("md5").update(filepath).digest("hex").slice(0, 6);
}
function generateScopedClassName(strategy, name, filename) {
  if (strategy === "scoped")
    return null;
  if (strategy === "non-scoped")
    return name;
  const hash = generateCssFilenameHash(filename);
  return `_${name}_${hash}`;
}

const EnvReplacerPlugin = () => {
  return {
    name: "vitest:env-replacer",
    enforce: "pre",
    transform(code, id) {
      if (!/\bimport\.meta\.env\b/g.test(code))
        return null;
      let s = null;
      const envs = stripLiteral(code).matchAll(/\bimport\.meta\.env\b/g);
      for (const env of envs) {
        s || (s = new MagicString(code));
        const startIndex = env.index;
        const endIndex = startIndex + env[0].length;
        s.overwrite(startIndex, endIndex, "process.env");
      }
      if (s) {
        return {
          code: s.toString(),
          map: s.generateMap({
            hires: true,
            source: cleanUrl(id)
          })
        };
      }
    }
  };
};

async function loadGlobalSetupFiles(ctx) {
  var _a;
  const server = ctx.server;
  const runner = ctx.runner;
  const globalSetupFiles = toArray((_a = server.config.test) == null ? void 0 : _a.globalSetup);
  return Promise.all(globalSetupFiles.map((file) => loadGlobalSetupFile(file, runner)));
}
async function loadGlobalSetupFile(file, runner) {
  const m = await runner.executeFile(file);
  for (const exp of ["default", "setup", "teardown"]) {
    if (m[exp] != null && typeof m[exp] !== "function")
      throw new Error(`invalid export in globalSetup file ${file}: ${exp} must be a function`);
  }
  if (m.default) {
    return {
      file,
      setup: m.default
    };
  } else if (m.setup || m.teardown) {
    return {
      file,
      setup: m.setup,
      teardown: m.teardown
    };
  } else {
    throw new Error(`invalid globalSetup file ${file}. Must export setup, teardown or have a default export`);
  }
}
const GlobalSetupPlugin = (ctx) => {
  let globalSetupFiles;
  return {
    name: "vitest:global-setup-plugin",
    enforce: "pre",
    async buildStart() {
      var _a, _b;
      if (!((_a = ctx.server.config.test) == null ? void 0 : _a.globalSetup))
        return;
      globalSetupFiles = await loadGlobalSetupFiles(ctx);
      try {
        for (const globalSetupFile of globalSetupFiles) {
          const teardown = await ((_b = globalSetupFile.setup) == null ? void 0 : _b.call(globalSetupFile));
          if (teardown == null || !!globalSetupFile.teardown)
            continue;
          if (typeof teardown !== "function")
            throw new Error(`invalid return value in globalSetup file ${globalSetupFile.file}. Must return a function`);
          globalSetupFile.teardown = teardown;
        }
      } catch (e) {
        ctx.logger.error(`
${c.red(divider(c.bold(c.inverse(" Error during global setup "))))}`);
        await ctx.logger.printError(e);
        process.exit(1);
      }
    },
    async buildEnd() {
      var _a;
      if (globalSetupFiles == null ? void 0 : globalSetupFiles.length) {
        for (const globalSetupFile of globalSetupFiles.reverse()) {
          try {
            await ((_a = globalSetupFile.teardown) == null ? void 0 : _a.call(globalSetupFile));
          } catch (error) {
            ctx.logger.error(`error during global teardown of ${globalSetupFile.file}`, error);
          }
        }
      }
    }
  };
};

const hoistRegexp = /^[ \t]*\b((?:vitest|vi)\s*.\s*(mock|unmock)\(["`'\s]+(.*[@\w_-]+)["`'\s]+)[),]{1};?/gm;
const vitestRegexp = /import {[^}]*}.*(?=["'`]vitest["`']).*/gm;
function hoistMocks(code) {
  let m;
  const mocks = code.matchAll(hoistRegexp);
  for (const mockResult of mocks) {
    const lastIndex = getMockLastIndex(code.slice(mockResult.index));
    if (lastIndex === null)
      continue;
    const startIndex = mockResult.index;
    const { insideComment, insideString } = getIndexStatus(code, startIndex);
    if (insideComment || insideString)
      continue;
    const endIndex = startIndex + lastIndex;
    m ?? (m = new MagicString(code));
    m.prepend(`${m.slice(startIndex, endIndex)}
`);
    m.remove(startIndex, endIndex);
  }
  return m;
}
const API_NOT_FOUND_ERROR = `There are some problems in resolving the mocks API.
You may encounter this issue when importing the mocks API from another module other than 'vitest'.

To fix this issue you can either:
- import the mocks API directly from 'vitest'
- enable the 'globals' options`;
const MocksPlugin = () => {
  return {
    name: "vitest:mock-plugin",
    enforce: "post",
    async transform(code) {
      const m = hoistMocks(code);
      if (m) {
        const vitestImports = code.matchAll(vitestRegexp);
        let found = false;
        for (const match of vitestImports) {
          const indexStart = match.index;
          const indexEnd = match[0].length + indexStart;
          m.remove(indexStart, indexEnd);
          m.prepend(`${match[0]}
`);
          found = true;
        }
        if (!found) {
          m.prepend(`try { vi } catch (_) { try { vitest } catch (__){ throw new Error(${JSON.stringify(API_NOT_FOUND_ERROR)}) } }
`);
        }
        return {
          code: m.toString(),
          map: m.generateMap({ hires: true })
        };
      }
    }
  };
};
function getMockLastIndex(code) {
  const index = getCallLastIndex(code);
  if (index === null)
    return null;
  return code[index + 1] === ";" ? index + 2 : index + 1;
}
function getIndexStatus(code, from) {
  let index = 0;
  let commentStarted = false;
  let commentEnded = true;
  let multilineCommentStarted = false;
  let multilineCommentEnded = true;
  let inString = null;
  let beforeChar = null;
  while (index <= from) {
    const char = code[index];
    const sub = code[index] + code[index + 1];
    if (!inString) {
      if (sub === "/*") {
        multilineCommentStarted = true;
        multilineCommentEnded = false;
      }
      if (sub === "*/" && multilineCommentStarted) {
        multilineCommentStarted = false;
        multilineCommentEnded = true;
      }
      if (sub === "//") {
        commentStarted = true;
        commentEnded = false;
      }
      if ((char === "\n" || sub === "\r\n") && commentStarted) {
        commentStarted = false;
        commentEnded = true;
      }
    }
    if (!multilineCommentStarted && !commentStarted) {
      const isCharString = char === '"' || char === "'" || char === "`";
      if (isCharString && beforeChar !== "\\") {
        if (inString === char)
          inString = null;
        else if (!inString)
          inString = char;
      }
    }
    beforeChar = char;
    index++;
  }
  return {
    insideComment: !multilineCommentEnded || !commentEnded,
    insideString: inString !== null
  };
}

const cssLangs = "\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)";
const cssLangRE = new RegExp(cssLangs);
const cssModuleRE = new RegExp(`\\.module${cssLangs}`);
const isCSS = (id) => {
  return cssLangRE.test(id);
};
const isCSSModule = (id) => {
  return cssModuleRE.test(id);
};
const getCSSModuleProxyReturn = (strategy, filename) => {
  if (strategy === "non-scoped")
    return "style";
  const hash = generateCssFilenameHash(filename);
  return `\`_\${style}_${hash}\``;
};
function CSSEnablerPlugin(ctx) {
  const shouldProcessCSS = (id) => {
    const { css } = ctx.config;
    if (typeof css === "boolean")
      return css;
    if (toArray(css.exclude).some((re) => re.test(id)))
      return false;
    if (toArray(css.include).some((re) => re.test(id)))
      return true;
    return false;
  };
  return [
    {
      name: "vitest:css-disable",
      enforce: "pre",
      transform(code, id) {
        if (!isCSS(id))
          return;
        if (!shouldProcessCSS(id))
          return { code: "" };
      }
    },
    {
      name: "vitest:css-empty-post",
      enforce: "post",
      transform(_, id) {
        var _a;
        if (!isCSS(id) || shouldProcessCSS(id))
          return;
        if (isCSSModule(id)) {
          const scopeStrategy = typeof ctx.config.css !== "boolean" && ((_a = ctx.config.css.modules) == null ? void 0 : _a.classNameStrategy) || "stable";
          const proxyReturn = getCSSModuleProxyReturn(scopeStrategy, relative(ctx.config.root, id));
          const code = `export default new Proxy(Object.create(null), {
            get(_, style) {
              return ${proxyReturn};
            },
          })`;
          return { code };
        }
        return { code: 'export default ""' };
      }
    }
  ];
}

function CoverageTransform(ctx) {
  return {
    name: "vitest:coverage-transform",
    transform(srcCode, id) {
      var _a, _b;
      return (_b = (_a = ctx.coverageProvider) == null ? void 0 : _a.onFileTransform) == null ? void 0 : _b.call(_a, srcCode, id, this);
    }
  };
}

async function VitestPlugin(options = {}, ctx = new Vitest("test")) {
  const getRoot = () => {
    var _a;
    return ((_a = ctx.config) == null ? void 0 : _a.root) || options.root || process.cwd();
  };
  async function UIPlugin() {
    await ensurePackageInstalled("@vitest/ui", getRoot());
    return (await import('@vitest/ui')).default(options.uiBase);
  }
  async function BrowserPlugin() {
    await ensurePackageInstalled("@vitest/browser", getRoot());
    return (await import('@vitest/browser')).default("/");
  }
  return [
    {
      name: "vitest",
      enforce: "pre",
      options() {
        this.meta.watchMode = false;
      },
      config(viteConfig) {
        var _a, _b, _c, _d;
        const preOptions = deepMerge(
          {},
          configDefaults,
          options,
          removeUndefinedValues(viteConfig.test ?? {})
        );
        preOptions.api = resolveApiConfig(preOptions);
        if (viteConfig.define) {
          delete viteConfig.define["import.meta.vitest"];
          delete viteConfig.define["process.env"];
        }
        const defines = {};
        for (const key in viteConfig.define) {
          const val = viteConfig.define[key];
          let replacement;
          try {
            replacement = typeof val === "string" ? JSON.parse(val) : val;
          } catch {
            continue;
          }
          if (key.startsWith("import.meta.env.")) {
            const envKey = key.slice("import.meta.env.".length);
            process.env[envKey] = replacement;
            delete viteConfig.define[key];
          } else if (key.startsWith("process.env.")) {
            const envKey = key.slice("process.env.".length);
            process.env[envKey] = replacement;
            delete viteConfig.define[key];
          } else if (!key.includes(".")) {
            defines[key] = replacement;
            delete viteConfig.define[key];
          }
        }
        options.defines = defines;
        let open;
        if (preOptions.ui && preOptions.open)
          open = preOptions.uiBase ?? "/__vitest__/";
        else if (preOptions.browser)
          open = "/";
        const config = {
          root: ((_a = viteConfig.test) == null ? void 0 : _a.root) || options.root,
          esbuild: {
            sourcemap: "external",
            legalComments: "inline"
          },
          resolve: {
            mainFields: [],
            alias: preOptions.alias,
            conditions: ["node"],
            browserField: false
          },
          server: {
            ...preOptions.api,
            watch: {
              ignored: preOptions.watchExclude
            },
            open,
            hmr: false,
            preTransformRequests: false
          }
        };
        const classNameStrategy = preOptions.css && ((_c = (_b = preOptions.css) == null ? void 0 : _b.modules) == null ? void 0 : _c.classNameStrategy);
        if (classNameStrategy !== "scoped") {
          config.css ?? (config.css = {});
          (_d = config.css).modules ?? (_d.modules = {});
          config.css.modules.generateScopedName = (name, filename) => {
            const root = getRoot();
            return generateScopedClassName(classNameStrategy, name, relative(root, filename));
          };
        }
        if (!options.browser) {
          Object.assign(config, {
            cacheDir: void 0,
            optimizeDeps: {
              disabled: true,
              entries: []
            }
          });
        }
        return config;
      },
      async configResolved(viteConfig) {
        var _a, _b, _c, _d;
        const viteConfigTest = viteConfig.test || {};
        if (viteConfigTest.watch === false)
          viteConfigTest.run = true;
        if ("alias" in viteConfigTest)
          delete viteConfigTest.alias;
        options = deepMerge(
          {},
          configDefaults,
          viteConfigTest,
          options
        );
        options.api = resolveApiConfig(options);
        const { PROD, DEV, ...envs } = viteConfig.env;
        (_a = process.env).PROD ?? (_a.PROD = PROD ? "1" : "");
        (_b = process.env).DEV ?? (_b.DEV = DEV ? "1" : "");
        (_c = process.env).SSR ?? (_c.SSR = "1");
        for (const name in envs)
          (_d = process.env)[name] ?? (_d[name] = envs[name]);
        if (!options.watch) {
          viteConfig.server.watch = {
            persistent: false,
            depth: 0,
            ignored: ["**/*"]
          };
        }
      },
      async configureServer(server) {
        try {
          await ctx.setServer(options, server);
          if (options.api && options.watch)
            (await import('./chunk-api-setup.0a2398d8.js')).setup(ctx);
        } catch (err) {
          ctx.logger.printError(err, true);
          process.exit(1);
        }
        if (!options.watch)
          await server.watcher.close();
      }
    },
    EnvReplacerPlugin(),
    MocksPlugin(),
    GlobalSetupPlugin(ctx),
    ...options.browser ? await BrowserPlugin() : [],
    ...CSSEnablerPlugin(ctx),
    CoverageTransform(ctx),
    options.ui ? await UIPlugin() : null
  ].filter(notNullish);
}

async function createVitest(mode, options, viteOverrides = {}) {
  var _a;
  const ctx = new Vitest(mode);
  const root = resolve(options.root || process.cwd());
  const configPath = options.config ? resolve(root, options.config) : await findUp(configFiles, { cwd: root });
  const config = {
    logLevel: "error",
    configFile: configPath,
    mode: options.mode || process.env.NODE_ENV || mode,
    plugins: await VitestPlugin(options, ctx)
  };
  const server = await createServer(mergeConfig(config, mergeConfig(viteOverrides, { root: options.root })));
  if ((_a = ctx.config.api) == null ? void 0 : _a.port)
    await server.listen();
  else
    await server.pluginContainer.buildStart({});
  return ctx;
}

const keys = [
  ["a", "rerun all tests"],
  ["f", "rerun only failed tests"],
  ["u", "update snapshot"],
  ["p", "filter by a filename"],
  ["t", "filter by a test name regex pattern"],
  ["q", "quit"]
];
function printShortcutsHelp() {
  stdout().write(
    `
${c.bold("  Watch Usage")}
${keys.map((i) => c.dim("  press ") + c.reset(c.bold(i[0])) + c.dim(` to ${i[1]}`)).join("\n")}
`
  );
}
function registerConsoleShortcuts(ctx) {
  let latestFilename = "";
  async function _keypressHandler(str, key) {
    if (str === "" || str === "\x1B" || key && key.ctrl && key.name === "c")
      return ctx.exit(true);
    if (!isWindows && key && key.ctrl && key.name === "z") {
      process.kill(process.ppid, "SIGTSTP");
      process.kill(process.pid, "SIGTSTP");
      return;
    }
    if (ctx.runningPromise)
      return;
    const name = key == null ? void 0 : key.name;
    if (name === "q")
      return ctx.exit(true);
    if (ctx.mode === "typecheck")
      return;
    if (name === "h")
      return printShortcutsHelp();
    if (name === "u")
      return ctx.updateSnapshot();
    if (name === "a" || name === "return")
      return ctx.changeNamePattern("");
    if (name === "f")
      return ctx.rerunFailed();
    if (name === "t")
      return inputNamePattern();
    if (name === "p")
      return inputFilePattern();
  }
  async function keypressHandler(str, key) {
    await _keypressHandler(str, key);
  }
  async function inputNamePattern() {
    var _a;
    off();
    const { filter = "" } = await prompts([{
      name: "filter",
      type: "text",
      message: "Input test name pattern (RegExp)",
      initial: ((_a = ctx.config.testNamePattern) == null ? void 0 : _a.source) || ""
    }]);
    await ctx.changeNamePattern(filter.trim(), void 0, "change pattern");
    on();
  }
  async function inputFilePattern() {
    off();
    const { filter = "" } = await prompts([{
      name: "filter",
      type: "text",
      message: "Input filename pattern",
      initial: latestFilename
    }]);
    latestFilename = filter.trim();
    await ctx.changeFilenamePattern(filter.trim());
    on();
  }
  let rl;
  function on() {
    off();
    rl = require$$0$3.createInterface({ input: process.stdin, escapeCodeTimeout: 50 });
    require$$0$3.emitKeypressEvents(process.stdin, rl);
    if (process.stdin.isTTY)
      process.stdin.setRawMode(true);
    process.stdin.on("keypress", keypressHandler);
  }
  function off() {
    rl == null ? void 0 : rl.close();
    rl = void 0;
    process.stdin.removeListener("keypress", keypressHandler);
    if (process.stdin.isTTY)
      process.stdin.setRawMode(false);
  }
  on();
}

async function startVitest(mode, cliFilters, options, viteOverrides) {
  var _a;
  process.env.TEST = "true";
  process.env.VITEST = "true";
  (_a = process.env).NODE_ENV ?? (_a.NODE_ENV = options.mode || "test");
  if (options.run)
    options.watch = false;
  if (options.browser)
    options.threads = false;
  const root = resolve(options.root || process.cwd());
  if (!await ensurePackageInstalled("vite", root)) {
    process.exitCode = 1;
    return;
  }
  if (typeof options.coverage === "boolean")
    options.coverage = { enabled: options.coverage };
  const ctx = await createVitest(mode, options, viteOverrides);
  if (mode === "test" && ctx.config.coverage.enabled) {
    const provider = ctx.config.coverage.provider || "c8";
    if (typeof provider === "string") {
      const requiredPackages = CoverageProviderMap[provider];
      if (!await ensurePackageInstalled(requiredPackages, root)) {
        process.exitCode = 1;
        return ctx;
      }
    }
  }
  const environmentPackage = getEnvPackageName(ctx.config.environment);
  if (environmentPackage && !await ensurePackageInstalled(environmentPackage, root)) {
    process.exitCode = 1;
    return ctx;
  }
  if (process.stdin.isTTY && ctx.config.watch)
    registerConsoleShortcuts(ctx);
  ctx.onServerRestart((reason) => {
    ctx.report("onServerRestart", reason);
    if (process.env.VITEST_CLI_WRAPPER)
      process.exit(EXIT_CODE_RESTART);
  });
  ctx.onAfterSetServer(() => {
    ctx.start(cliFilters);
  });
  try {
    await ctx.start(cliFilters);
  } catch (e) {
    process.exitCode = 1;
    await ctx.logger.printError(e, true, "Unhandled Error");
    ctx.logger.error("\n\n");
    return ctx;
  }
  if (ctx.config.watch)
    return ctx;
  await ctx.close();
  return ctx;
}

export { BaseSequencer as B, VitestPlugin as V, createVitest as c, divider as d, startVitest as s, version$1 as v };
