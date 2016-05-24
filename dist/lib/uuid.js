(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "module"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
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

  // Counter being incremented. JS is single-threaded, so it'll Just Work™.
  "use strict";

  module.exports = uuid;
  var __counter = 1;

  /**
   * Returns a process-wide unique identifier.
   */

  function uuid() {
    return "uid-" + __counter++;
  }
});