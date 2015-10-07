'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libClass_decorator = require('./lib/class_decorator');

var _libClass_decorator2 = _interopRequireDefault(_libClass_decorator);

var _libMethod_decorator = require('./lib/method_decorator');

var _libMethod_decorator2 = _interopRequireDefault(_libMethod_decorator);

function keyboardDecorator() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var testArg = args[0];
  var isArray = Array.isArray(testArg);
  if (isArray || parseInt(testArg, 10)) {
    var _ret = (function () {
      var keys = isArray ? testArg : args;
      return {
        v: function (target, methodName, descriptor) {
          return methodName ? (0, _libMethod_decorator2['default'])({ target: target, descriptor: descriptor, keys: keys }) : (0, _libClass_decorator2['default'])(target, keys);
        }
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  } else {
    return _libClass_decorator2['default'].apply(undefined, args);
  }
}

exports['default'] = keyboardDecorator;
module.exports = exports['default'];