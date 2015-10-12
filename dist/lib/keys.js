'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.allKeys = allKeys;
var Keys = {
  backspace: 8,
  tab: 9,
  enter: 13,
  'return': 13,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  slash: 191,
  '/': 191,
  backslash: 220,
  '\\': 220
};

'0123456789'.split('').forEach(function (num, index) {
  return Keys[num] = index + 48;
});

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