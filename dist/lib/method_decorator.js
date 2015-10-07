'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _listeners = require('./listeners');

function methodWrapper(_ref) {
  var target = _ref.target;
  var descriptor = _ref.descriptor;
  var keys = _ref.keys;
  var componentDidMount = target.componentDidMount;
  var componentWillUnmount = target.componentWillUnmount;

  var fn = descriptor.value;

  target.componentDidMount = function () {
    _listeners.onMount.call(this, { keys: keys, fn: fn });
    if (componentDidMount) return componentDidMount.call(this);
  };

  target.componentWillUnmount = function () {
    _listeners.onUnmount.call(this);
    if (componentWillUnmount) return componentWillUnmount.call(this);
  };

  return descriptor;
}

exports['default'] = methodWrapper;
module.exports = exports['default'];