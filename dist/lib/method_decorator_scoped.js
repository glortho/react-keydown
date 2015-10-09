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
  /**
   * @module methodWrapperScoped
   *
   */

  /**
   * _shouldTrigger
   *
   * @access private
   * @param {object} thisProps Exsting props from the wrapped component
   * @param {object} thisProps.keydown The namespaced state from the higher-order
   * component (class_decorator)
   * @param {object} nextProps The incoming props from the wrapped component
   * @param {object} nextProps.keydown The namescaped state from the higher-order
   * component (class_decorator)
   * @param {array} keys The keys bound to the decorated method
   * @return {boolean} Whether all tests have passed
   */
  "use strict";

  function _shouldTrigger(_ref, _ref2, keys) {
    var keydownThis = _ref.keydown;
    var keydownNext = _ref2.keydown;

    return keydownNext && keydownNext.event && !keydownThis.event && ~keys.indexOf(keydownNext.event.which);
  }

  /**
   * methodWrapperScoped
   *
   * @access public
   * @param {object} args All args necessary for decorating the method
   * @param {object} args.target The decorated method's class object
   * @param {object} args.descriptor The method's descriptor object
   * @param {array} args.keys The key codes bound to the decorated method
   * @return {object} The method's descriptor object
   */
  function methodWrapperScoped(_ref3) {
    var target = _ref3.target;
    var descriptor = _ref3.descriptor;
    var keys = _ref3.keys;
    var componentWillReceiveProps = target.componentWillReceiveProps;

    var fn = descriptor.value;

    // wrap the component's lifecycle method to intercept key codes coming down
    // from the wrapped/scoped component up the view hierarchy. if new keydown
    // event has arrived and the key codes match what was specified in the
    // decorator, call the wrapped method.
    target.componentWillReceiveProps = function (nextProps) {
      if (_shouldTrigger(this.props, nextProps, keys)) {
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