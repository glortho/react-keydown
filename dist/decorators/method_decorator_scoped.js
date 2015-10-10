(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../lib/match_keys', '../lib/parse_keys'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../lib/match_keys'), require('../lib/parse_keys'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.matchKeys, global.parseKeys);
    global.method_decorator_scoped = mod.exports;
  }
})(this, function (exports, module, _libMatch_keys, _libParse_keys) {
  /**
   * @module methodWrapperScoped
   *
   */
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _matchKeys = _interopRequireDefault(_libMatch_keys);

  var _parseKeys = _interopRequireDefault(_libParse_keys);

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
  function _shouldTrigger(_ref, keydownNext) {
    var keydownThis = _ref.keydown;

    return keydownNext && keydownNext.event && !keydownThis.event;
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
  function methodWrapperScoped(_ref2) {
    var target = _ref2.target;
    var descriptor = _ref2.descriptor;
    var keys = _ref2.keys;
    var componentWillReceiveProps = target.componentWillReceiveProps;

    var fn = descriptor.value;
    var keySets = (0, _parseKeys['default'])(keys);

    // wrap the component's lifecycle method to intercept key codes coming down
    // from the wrapped/scoped component up the view hierarchy. if new keydown
    // event has arrived and the key codes match what was specified in the
    // decorator, call the wrapped method.
    target.componentWillReceiveProps = function (nextProps) {
      var keydown = nextProps.keydown;

      if (_shouldTrigger(this.props, keydown)) {
        if (keySets.some(function (keySet) {
          return (0, _matchKeys['default'])({ keySet: keySet, event: keydown.event });
        })) {
          fn.call(this, keydown.event);
        }
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