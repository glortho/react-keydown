/**
 * @module methodWrapper
 *
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _event_handlers = require('../event_handlers');

/**
 * _isReactKeyDown
 *
 * @access private
 * @param {object} event The possibly synthetic event passed as an argument with
 * the method invocation.
 * @return {boolean}
 */
function _isReactKeyDown(event) {
  return event && typeof event === 'object' && event.nativeEvent instanceof window.KeyboardEvent && event.type === 'keydown';
}

/**
 * methodWrapper
 *
 * @access public
 * @param {object} args All arguments necessary for wrapping method
 * @param {object} args.target The decorated class
 * @param {object} args.descriptor Method descriptor
 * @param {array} args.keys The array of keys bound to the given method
 * @return {object} The method descriptor
 */
function methodWrapper(_ref) {
  var target = _ref.target;
  var descriptor = _ref.descriptor;
  var keys = _ref.keys;

  var fn = descriptor.value;

  // if we haven't already created a binding for this class (via another
  // decorated method), wrap these lifecycle methods.
  if (!_store2['default'].getBinding(target)) {
    (function () {
      var componentDidMount = target.componentDidMount;
      var componentWillUnmount = target.componentWillUnmount;

      target.componentDidMount = function () {
        (0, _event_handlers.onMount)(this);
        if (componentDidMount) return componentDidMount.call(this);
      };

      target.componentWillUnmount = function () {
        (0, _event_handlers.onUnmount)(this);
        if (componentWillUnmount) return componentWillUnmount.call(this);
      };
    })();
  }

  // add this binding of keys and method to the target's bindings
  _store2['default'].setBinding({ keys: keys, target: target, fn: fn });

  descriptor.value = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var maybeEvent = args[0];

    if (_isReactKeyDown(maybeEvent)) {
      // proxy method in order to use @keydown as filter for keydown events coming
      // from an actual onKeyDown binding (as identified by react's addition of
      // 'nativeEvent' + type === 'keydown')
      return (0, _event_handlers._onKeyDown)(maybeEvent, true);
    } else if (!maybeEvent || !(maybeEvent instanceof window.KeyboardEvent) || maybeEvent.type !== 'keydown') {
      // if our first argument is a keydown event it is being handled by our
      // binding system. if it's anything else, just pass through.
      return fn.call.apply(fn, [this].concat(args));
    }
  };

  return descriptor;
}

exports['default'] = methodWrapper;
module.exports = exports['default'];