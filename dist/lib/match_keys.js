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
    var _ref$keySet = _ref.keySet;
    var key = _ref$keySet.key;
    var modifiers = _ref$keySet.modifiers;
    var event = _ref.event;

    var keysMatch = false;
    if (key === event.which) {
      var eventModifiers = modKeys.filter(function (modKey) {
        return event[modKey + 'Key'];
      });
      keysMatch = !eventModifiers.length && !modifiers || modifiers && eventModifiers.length && eventModifiers.every(function (modKey) {
        return ~modifiers.indexOf(modKey);
      });
    }
    return keysMatch;
  }

  module.exports = matchKeys;
});