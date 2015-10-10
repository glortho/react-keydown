(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'react', './match_keys', './parse_keys', './keys'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('react'), require('./match_keys'), require('./parse_keys'), require('./keys'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.matchKeys, global.parseKeys, global.keys);
    global.listeners = mod.exports;
  }
})(this, function (exports, _react, _match_keys, _parse_keys, _keys) {
  /* eslint-disable no-use-before-define */
  /**
   * @module listeners
   *
   */
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  var _React = _interopRequireDefault(_react);

  var _matchKeys = _interopRequireDefault(_match_keys);

  var _parseKeys = _interopRequireDefault(_parse_keys);

  /**
   * private
   * 
   */

  // dict for class prototypes => { bindings, instances }
  var _handlers = new Map();

  // the currently focused instance that should receive key presses
  var _focusedInstance = null;

  // flag for whether click listener has been bound to document
  var _clicksBound = false;

  // flag for whether keydown listener has been bound to document
  var _keysBound = false;

  /**
   * _addInstance
   *
   * @access private
   * @param {object} target Instantiated class that extended React.Component
   * @return {set} The set of instances for the passed in class
   */
  function _addInstance(target) {
    return getBinding(target.constructor.prototype).instances.add(target);
  }

  /**
   * _deleteInstance
   *
   * @access private
   * @param {object} target Instantiated class that extended React.Component
   * @return {boolean} The value set.has( target ) would have returned prior to deletion
   */
  function _deleteInstance(target) {
    return getBinding(target.constructor.prototype).instances['delete'](target);
  }

  /**
   * _findFocused
   *
   * @access private
   * @param {object} data Criteria to use for finding the focused node
   * @param {object} data.instance The instantiated React.Component that is
   * a candidate for being focuse
   * @param {object} data.target The DOM node from the click event
   * @return {boolean} Success or failure in matching the node to the event target
   */
  function _findFocused(_ref) {
    var target = _ref.target;
    var instance = _ref.instance;

    var node = _React['default'].findDOMNode(instance);
    return target === node || node.contains(target);
  }

  /**
   * _activate
   *
   * @access private
   * @param {object} instance Instantiated class that extended React.Component, to be focused to receive keydown events
   */
  function _activate(instance) {
    _focusedInstance = instance;
    return instance ? _bindKeys() : _unbindKeys();
  }

  /**
   * _handleClick
   *
   * @access private
   * @param {object} event The click event object
   * @param {object} event.target The DOM node from the click event
   */
  function _handleClick(_ref2) {
    var target = _ref2.target;

    var findFocused = function findFocused(instance) {
      return _findFocused({ target: target, instance: instance });
    };
    var focusedInstance = null;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2);

        var instances = _step$value[1].instances;

        focusedInstance = [].concat(_toConsumableArray(instances)).find(findFocused);
        if (focusedInstance) break;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    _activate(focusedInstance);
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
    var tagName = _ref3.target.tagName;

    return ! ~['INPUT', 'SELECT', 'TEXTAREA'].indexOf(tagName);
  }

  /**
   * _handleKeyDown: The keydown event callback
   *
   * @access private
   * @param {object} event The keydown event object
   * @param {number} event.which The key code (which) received from the keydown event
   */
  function _handleKeyDown(event) {
    if (_shouldConsider(event)) {
      var _getBinding = getBinding(_focusedInstance.constructor.prototype);

      var bindings = _getBinding.bindings;

      bindings.forEach(function (fn, keySets) {
        if ((0, _keys.allKeys)(keySets) || keySets.some(function (keySet) {
          return (0, _matchKeys['default'])({ keySet: keySet, event: event });
        })) {
          fn.call(_focusedInstance, event);
        }
      });
    }
  }

  /**
   * _bindInputs: Find any focusable child elements of the component instance and
   * add an onFocus handler to focus our keydown handlers on the parent component
   * when user keys applies focus to the element.
   *
   * NOTE: One limitation of this right now is that if you tab out of the
   * component, _focusedInstance will still be set until next click or mount or
   * controlled focus.
   *
   * @access private
   * @param {object} instance The key-bound component instance
   */
  function _bindInputs(instance) {
    if (document.querySelectorAll) {
      var node = _React['default'].findDOMNode(instance);
      if (node) {
        var focusables = node.querySelectorAll('a[href], button, input, object, select, textarea, [tabindex]');
        if (focusables.length) {
          var onFocus = function onFocus(element) {
            var onFocusPrev = element.onfocus;
            return function (event) {
              _activate(instance);
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

  /**
   * _bindKeys
   *
   * @access private
   */
  function _bindKeys() {
    if (!_keysBound) {
      document.addEventListener('keydown', _handleKeyDown);
      _keysBound = true;
    }
  }

  /**
   * _unbindKeys
   *
   * @access private
   */
  function _unbindKeys() {
    if (_keysBound) {
      document.removeEventListener('keydown', _handleKeyDown);
      _keysBound = false;
    }
  }

  /**
   * _bindClicks
   *
   * @access private
   */
  function _bindClicks() {
    if (!_clicksBound) {
      document.addEventListener('click', _handleClick);
      _clicksBound = true;
    }
  }

  /**
   * _unbindClicks
   *
   * @access private
   */
  function _unbindClicks() {
    if (_clicksBound && ![].concat(_toConsumableArray(_handlers)).some(function (_ref4) {
      var _ref42 = _slicedToArray(_ref4, 2);

      var instances = _ref42[1].instances;
      return instances.size;
    })) {
      document.removeEventListener('click', _handleClick);
      _clicksBound = false;
    }
  }

  /**
   * public
   *
   */

  /**
   * getBinding
   *
   * @access public
   * @param {object} target Class used as key in dict of bindings and instances
   * @return {object} The object containing bindings and instances for the given class
   */
  function getBinding(target) {
    return _handlers.get(target);
  }

  /**
   * setBinding
   *
   * @access public
   * @param {object} args All arguments necessary to set the binding
   * @param {array} args.keys Key codes that should trigger the fn
   * @param {function} args.fn The callback to be triggered when given keys are pressed
   * @param {object} args.target The decorated class
   */
  function setBinding(_ref5) {
    var keys = _ref5.keys;
    var fn = _ref5.fn;
    var target = _ref5.target;

    var keySets = keys ? (0, _parseKeys['default'])(keys) : (0, _keys.allKeys)();
    var handler = getBinding(target);
    if (!handler) {
      handler = _handlers.set(target, { bindings: new Map(), instances: new Set() }).get(target);
    }
    handler.bindings.set(keySets, fn);
  }

  /**
   * onMount
   *
   * @access public
   */
  function onMount(instance) {
    _bindClicks();
    _bindInputs(instance);
    _addInstance(instance);
    // have to bump this to next event loop because component mounting routinely
    // preceeds the dom click event that triggered the mount (wtf?)
    setTimeout(function () {
      return _activate(instance);
    }, 0);
  }

  /**
   * onUnmount
   *
   * @access public
   */
  function onUnmount(instance) {
    _deleteInstance(instance);
    _unbindClicks();
    if (_focusedInstance === instance) _activate(null);
  }

  exports.setBinding = setBinding;
  exports.getBinding = getBinding;
  exports.onMount = onMount;
  exports.onUnmount = onUnmount;
});