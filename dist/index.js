// polyfill array.from (mainly for IE)
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

require('./lib/array.from');

// @keydown and @keydownScoped

var _decorators = require('./decorators');

exports['default'] = _interopRequire(_decorators);
Object.defineProperty(exports, 'keydownScoped', {
  enumerable: true,
  get: function get() {
    return _decorators.keydownScoped;
  }
});

// setBinding - only useful if you're not going to use decorators

var _store = require('./store');

Object.defineProperty(exports, 'setBinding', {
  enumerable: true,
  get: function get() {
    return _store.setBinding;
  }
});

// Keys - use this to find key codes for strings. for example: Keys.j, Keys.enter

var _libKeys = require('./lib/keys');

exports.Keys = _interopRequire(_libKeys);