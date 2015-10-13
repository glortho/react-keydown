(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'react'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.React);
    global.dom_helpers = mod.exports;
  }
})(this, function (exports, module, _react) {
  /**
   * @module domHelpers
   *
   */
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  var _React = _interopRequireDefault(_react);

  var focusableSelector = 'a[href], button, input, object, select, textarea, [tabindex]';

  /**
   * bindFocusables: Find any focusable child elements of the component instance and
   * add an onFocus handler to focus our keydown handlers on the parent component
   * when user keys applies focus to the element.
   *
   * NOTE: One limitation of this right now is that if you tab out of the
   * component, _focusedInstance will still be set until next click or mount or
   * controlled focus.
   *
   * @access public
   * @param {object} instance The key-bound component instance
   * @param {callback} activateOnFocus The fn to fire when element is focused
   */
  function bindFocusables(instance, activateOnFocus) {
    if (document.querySelectorAll) {
      var node = _React['default'].findDOMNode(instance);
      if (node) {
        var focusables = node.querySelectorAll(focusableSelector);
        if (focusables.length) {
          var onFocus = function onFocus(element) {
            var onFocusPrev = element.onfocus;
            return function (event) {
              activateOnFocus(instance);
              if (onFocusPrev) onFocusPrev.call(element, event);
            };
          };

          var _arr = [].concat(_toConsumableArray(focusables));

          for (var _i = 0; _i < _arr.length; _i++) {
            var element = _arr[_i];
            element.onfocus = onFocus(element);
          }
        }
      }
    }
  }

  function findContainerNodes(target) {
    return function (memo, instance) {
      var node = _React['default'].findDOMNode(instance);
      if (node === target || node.contains(target)) {
        memo.push({ instance: instance, node: node });
      }
      return memo;
    };
  }

  function sortByDOMPosition(a, b) {
    return a.node.compareDocumentPosition(b.node) === 10 ? 1 : -1;
  }

  module.exports = { bindFocusables: bindFocusables, findContainerNodes: findContainerNodes, sortByDOMPosition: sortByDOMPosition };
});