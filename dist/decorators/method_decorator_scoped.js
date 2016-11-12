/**
 * @module methodWrapperScoped
 *
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libMatch_keys = require('../lib/match_keys');

var _libMatch_keys2 = _interopRequireDefault(_libMatch_keys);

var _libParse_keys = require('../lib/parse_keys');

var _libParse_keys2 = _interopRequireDefault(_libParse_keys);

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
  if (!keys) {
    console.warn(fn + ': keydownScoped requires one or more keys');
  } else {
    (function () {
      var keySets = (0, _libParse_keys2['default'])(keys);

      // wrap the component's lifecycle method to intercept key codes coming down
      // from the wrapped/scoped component up the view hierarchy. if new keydown
      // event has arrived and the key codes match what was specified in the
      // decorator, call the wrapped method.
      target.componentWillReceiveProps = function (nextProps) {
        var keydown = nextProps.keydown;

        if (_shouldTrigger(this.props, keydown)) {
          if (keySets.some(function (keySet) {
            return (0, _libMatch_keys2['default'])({ keySet: keySet, event: keydown.event });
          })) {
            return fn.call(this, keydown.event);
          }
        }

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (componentWillReceiveProps) return componentWillReceiveProps.call.apply(componentWillReceiveProps, [this, nextProps].concat(args));
      };
    })();
  }

  return descriptor;
}

exports['default'] = methodWrapperScoped;
module.exports = exports['default'];