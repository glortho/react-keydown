(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', './lib/array.from', './decorators', './store', './lib/keys'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('./lib/array.from'), require('./decorators'), require('./store'), require('./lib/keys'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.array, global.decorators, global.store, global.keys);
    global.index = mod.exports;
  }
})(this, function (exports, _libArrayFrom, _decorators, _store, _libKeys) {
  // polyfill array.from (mainly for IE)
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  // @keydown and @keydownScoped
  exports['default'] = _interopRequire(_decorators);
  Object.defineProperty(exports, 'keydownScoped', {
    enumerable: true,
    get: function get() {
      return _decorators.keydownScoped;
    }
  });

  // setBinding - only useful if you're not going to use decorators
  Object.defineProperty(exports, 'setBinding', {
    enumerable: true,
    get: function get() {
      return _store.setBinding;
    }
  });

  // Keys - use this to find key codes for strings. for example: Keys.j, Keys.enter
  exports.Keys = _interopRequire(_libKeys);
});