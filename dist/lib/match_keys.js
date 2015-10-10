(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './keys'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./keys'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.keys);
    global.match_keys = mod.exports;
  }
})(this, function (exports, module, _keys) {
  'use strict';

  var modKeys = Object.keys(_keys.modifiers);

  function matchKeys(_ref) {
    var keySet = _ref.keySet;
    var event = _ref.event;

    if (keySet) {
      var _ret = (function () {
        var key = keySet.key;
        var modifiers = keySet.modifiers;

        var keysMatch = false;
        if (key === event.which) {
          var eventModifiers = modKeys.filter(function (modKey) {
            return event[modKey + 'Key'];
          });
          keysMatch = !eventModifiers.length && !modifiers || modifiers && eventModifiers.length && eventModifiers.every(function (modKey) {
            return ~modifiers.indexOf(modKey);
          });
        }
        return {
          v: keysMatch
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
    return true;
  }

  module.exports = matchKeys;
});