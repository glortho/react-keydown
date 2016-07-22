// Counter being incremented. JS is single-threaded, so it'll Just Work™.
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = uuid;
var __counter = 1;

/**
 * Returns a process-wide unique identifier.
 */

function uuid() {
  return "uid-" + __counter++;
}

module.exports = exports["default"];