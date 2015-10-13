(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', './decorators', './store', './lib/keys'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('./decorators'), require('./store'), require('./lib/keys'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.decorators, global.store, global.keys);
    global.index = mod.exports;
  }
})(this, function (exports, _decorators, _store, _libKeys) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  exports['default'] = _interopRequire(_decorators);
  Object.defineProperty(exports, 'keydownScoped', {
    enumerable: true,
    get: function get() {
      return _decorators.keydownScoped;
    }
  });
  Object.defineProperty(exports, 'setBinding', {
    enumerable: true,
    get: function get() {
      return _store.setBinding;
    }
  });
  exports.Keys = _interopRequire(_libKeys);
});