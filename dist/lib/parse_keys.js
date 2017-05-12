'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseKeys(keysArray) {
  return keysArray.map(function (key) {
    var keySet = { key: key };
    if (typeof key === 'string') {
      var keyString = key.toLowerCase().trim();
      var matches = keyString.split(/\s?\+\s?/);
      keySet = matches.length === 1 ? { key: _keys2.default[keyString] } : {
        key: _keys2.default[matches.pop()],
        modifiers: matches.map(function (modKey) {
          return _keys.modifiers[modKey];
        }).sort()
      };
    }
    return keySet;
  });
}

exports.default = parseKeys;