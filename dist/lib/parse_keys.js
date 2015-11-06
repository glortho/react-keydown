(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './keys'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./keys'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Keys);
    global.parse_keys = mod.exports;
  }
})(this, function (exports, module, _keys) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Keys = _interopRequireDefault(_keys);

  function parseKeys(keysArray) {
    return keysArray.map(function (key) {
      var keySet = { key: key };
      if (typeof key === 'string') {
        var keyString = key.toLowerCase().trim();
        var matches = keyString.split(/\s?\+\s?/);
        keySet = matches.length === 1 ? { key: _Keys['default'][keyString] } : {
          key: _Keys['default'][matches.pop()],
          modifiers: matches.map(function (modKey) {
            return _keys.modifiers[modKey];
          }).sort()
        };
      }
      return keySet;
    });
  }

  module.exports = parseKeys;
});