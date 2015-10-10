(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.keys = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.allKeys = allKeys;
  var Keys = {
    tab: 9,
    enter: 13,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    slash: 191
  };

  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (letter, index) {
    Keys[letter] = index + 65;
    Keys[letter.toLowerCase()] = index + 65;
  });

  var modifiers = {
    control: 'ctrl',
    ctrl: 'ctrl',
    shift: 'shift',
    meta: 'meta',
    cmd: 'meta',
    command: 'meta',
    option: 'alt',
    alt: 'alt'
  };

  exports.modifiers = modifiers;

  function allKeys(arg) {
    return arg ? typeof arg === 'symbol' : Symbol('allKeys');
  }

  exports['default'] = Keys;
});