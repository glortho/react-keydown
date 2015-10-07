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
    global.method_decorator_scoped = mod.exports;
  }
})(this, function (exports, module) {
  "use strict";

  function shouldTrigger(_ref, _ref2, keys) {
    var keydownThis = _ref.keydown;
    var keydownNext = _ref2.keydown;

    return keydownNext && keydownNext.event && !keydownThis.event && ~keys.indexOf(keydownNext.event.which);
  }

  function methodWrapperScoped(_ref3) {
    var target = _ref3.target;
    var descriptor = _ref3.descriptor;
    var keys = _ref3.keys;
    var componentWillReceiveProps = target.componentWillReceiveProps;

    var fn = descriptor.value;

    target.componentWillReceiveProps = function (nextProps) {
      if (shouldTrigger(this.props, nextProps, keys)) {
        fn.call(this, nextProps.keydown.event);
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (componentWillReceiveProps) return componentWillReceiveProps.call.apply(componentWillReceiveProps, [this, nextProps].concat(args));
    };

    return descriptor;
  }

  module.exports = methodWrapperScoped;
});