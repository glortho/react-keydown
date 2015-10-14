/* eslint-disable no-use-before-define */
/**
 * @module eventHandlers
 *
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _libDom_helpers = require('./lib/dom_helpers');

var _libDom_helpers2 = _interopRequireDefault(_libDom_helpers);

var _libAttach_listeners = require('./lib/attach_listeners');

var _libAttach_listeners2 = _interopRequireDefault(_libAttach_listeners);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

/**
 * private
 * 
 */

/**
 * onClick
 *
 * @access private
 * @param {object} event The click event object
 * @param {object} event.target The DOM node from the click event
 */

var _attachListeners = (0, _libAttach_listeners2['default'])({
  onClick: function onClick(_ref2) {
    var target = _ref2.target;

    _store2['default'].activate([].concat(_toConsumableArray(_store2['default'].getInstances())).reduce(_libDom_helpers2['default'].findContainerNodes(target), []).sort(_libDom_helpers2['default'].sortByDOMPosition).map(function (item) {
      return item.instance;
    }));
  }
});

var bindClicks = _attachListeners.bindClicks;
var unbindClicks = _attachListeners.unbindClicks;

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
function _shouldConsider(_ref) {
  var ctrlKey = _ref.ctrlKey;
  var tagName = _ref.target.tagName;

  return ! ~['INPUT', 'SELECT', 'TEXTAREA'].indexOf(tagName) || ctrlKey;
}

/**
 * onKeyDown: The keydown event callback
 *
 * @access private
 * @param {object} event The keydown event object
 * @param {number} event.which The key code (which) received from the keydown event
 */

var _attachListeners2 = (0, _libAttach_listeners2['default'])({
  onKeyDown: function onKeyDown(event) {
    if (_shouldConsider(event)) {
      var _ref3 = _store2['default'].findBindingForEvent(event) || {};

      var fn = _ref3.fn;
      var instance = _ref3.instance;

      if (fn) {
        fn.call(instance, event);
        return true;
      }
    }
    return false;
  }
});

var bindKeys = _attachListeners2.bindKeys;
var unbindKeys = _attachListeners2.unbindKeys;

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
  bindKeys();
  bindClicks();
  setTimeout(function () {
    return _store2['default'].activate(instance);
  }, 0);
  _libDom_helpers2['default'].bindFocusables(instance, _store2['default'].activate);
}

/**
 * onUnmount
 *
 * @access public
 */
function onUnmount(instance) {
  _store2['default'].deleteInstance(instance);
  if (!_store2['default'].getInstances().size) {
    unbindClicks();
    unbindKeys();
  }
}

exports.onMount = onMount;
exports.onUnmount = onUnmount;