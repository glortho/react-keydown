/* eslint-disable no-use-before-define */
/**
 * @module eventHandlers
 *
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports._onClick = _onClick;
exports._onKeyDown = _onKeyDown;
exports._shouldConsider = _shouldConsider;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _libDom_helpers = require('./lib/dom_helpers');

var _libDom_helpers2 = _interopRequireDefault(_libDom_helpers);

var _libListeners = require('./lib/listeners');

var _libListeners2 = _interopRequireDefault(_libListeners);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

/**
 * private
 *
 */

/**
 * _onClick
 *
 * @access private
 * @param {object} event The click event object
 * @param {object} event.target The DOM node from the click event
 */

function _onClick(_ref) {
  var target = _ref.target;

  _store2['default'].activate([].concat(_toConsumableArray(_store2['default'].getInstances())).reduce(_libDom_helpers2['default'].findContainerNodes(target), []).sort(_libDom_helpers2['default'].sortByDOMPosition).map(function (item) {
    return item.instance;
  }));
}

/**
 * _onKeyDown: The keydown event callback
 *
 * @access private
 * @param {object} event The keydown event object
 * @param {number} event.which The key code (which) received from the keydown event
 */

function _onKeyDown(event) {
  var forceConsider = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  if (forceConsider || _shouldConsider(event)) {
    var _ref2 = _store2['default'].findBindingForEvent(event) || {};

    var fn = _ref2.fn;
    var instance = _ref2.instance;

    if (fn) {
      fn.call(instance, event);
      return true;
    }
  }
  return false;
}

/**
 * _shouldConsider: Conditions for proceeding with key event handling
 *
 * @access private
 * @param {object} event The keydown event object
 * @param {object} event.target The node origin of the event
 * @param {string} event.target.tagName The name of the element tag
 * @param {number} event.target.which The key pressed
 * @return {boolean} Whether to continue procesing the keydown event
 */

function _shouldConsider(_ref3) {
  var ctrlKey = _ref3.ctrlKey;
  var tagName = _ref3.target.tagName;

  return ! ~['INPUT', 'SELECT', 'TEXTAREA'].indexOf(tagName) || ctrlKey;
}

/**
 * public
 *
 */

/**
 * onMount
 *
 * @access public
 */
function onMount(instance) {
  // have to bump this to next event loop because component mounting routinely
  // preceeds the dom click event that triggered the mount (wtf?)
  setTimeout(function () {
    return _store2['default'].activate(instance);
  }, 0);
  _libListeners2['default'].bindKeys(_onKeyDown);
  _libListeners2['default'].bindClicks(_onClick);
  _libDom_helpers2['default'].bindFocusables(instance, _store2['default'].activate);
}

/**
 * onUnmount
 *
 * @access public
 */
function onUnmount(instance) {
  _store2['default'].deleteInstance(instance);
  if (_store2['default'].isEmpty()) {
    _libListeners2['default'].unbindClicks(_onClick);
    _libListeners2['default'].unbindKeys(_onKeyDown);
  }
}

exports.onMount = onMount;
exports.onUnmount = onUnmount;