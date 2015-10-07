(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './listeners'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./listeners'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.listeners);
    global.method_decorator = mod.exports;
  }
})(this, function (exports, module, _listeners) {
  'use strict';

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

  module.exports = methodWrapper;
});