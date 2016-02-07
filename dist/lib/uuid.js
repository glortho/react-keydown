(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.uuid = mod.exports;
  }
})(this, function (exports, module) {
  /**
   * http://jsperf.com/uuid-generator-opt/4 
   *
   */

  'use strict';

  module.exports = uuid;
  var l = '0123456789abcdef';
  var m = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  function uuid() {
    var u = '';
    var i = 0;
    var rb = Math.random() * 0xffffffff | 0;
    while (i++ < 36) {
      var c = m[i - 1];
      var r = rb & 0xf;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      u += c === '-' || c === '4' ? c : l[v];
      rb = i % 8 === 0 ? Math.random() * 0xffffffff | 0 : rb >> 4;
    }
    return u;
  }
});