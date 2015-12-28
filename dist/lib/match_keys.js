'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _keys = require('./keys');

var modKeys = Object.keys(_keys.modifiers);

function matchKeys(_ref) {
  var _ref$keySet = _ref.keySet;
  var key = _ref$keySet.key;
  var _ref$keySet$modifiers = _ref$keySet.modifiers;
  var modifiers = _ref$keySet$modifiers === undefined ? [] : _ref$keySet$modifiers;
  var event = _ref.event;

  var keysMatch = false;
  if (key === event.which) {
    (function () {
      var evtModKeys = modKeys.filter(function (modKey) {
        return event[modKey + 'Key'];
      }).sort();
      keysMatch = modifiers.length === evtModKeys.length && modifiers.every(function (modKey, index) {
        return evtModKeys[index] === modKey;
      });
    })();
  }
  return keysMatch;
}

exports['default'] = matchKeys;
module.exports = exports['default'];