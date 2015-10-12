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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _match_keys = require('./match_keys');

var _match_keys2 = _interopRequireDefault(_match_keys);

var _parse_keys = require('./parse_keys');

var _parse_keys2 = _interopRequireDefault(_parse_keys);

var _keys = require('./keys');

/**
 * private
 * 
 */

// dict for class prototypes => bindings
var _handlers = new Map();

// all mounted instances that have keybindings
var _instances = new Set();

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
function _addInstance(instance) {
  // have to bump this to next event loop because component mounting routinely
  // preceeds the dom click event that triggered the mount (wtf?)
  setTimeout(function () {
    return _activate(instance);
  }, 0);
}

/**
 * _deleteInstance
 *
 * @access private
 * @param {object} target Instantiated class that extended React.Component
 * @return {boolean} The value set.has( target ) would have returned prior to deletion
 */
function _deleteInstance(target) {
  _instances['delete'](target);
  _unbindKeys();
}

/**
 * _activate
 *
 * @access private
 * @param {object} instance Instantiated class that extended React.Component, to be focused to receive keydown events
 */
function _activate(instances) {

  // deleting and then adding the instance(s) has the effect of sorting the set
  // according to instance activation (ascending)
  [].concat(instances).forEach(function (instance) {
    _instances['delete'](instance);
    _instances.add(instance);
  });
  _bindKeys();
}

function _findContainerNodes(target) {
  return function (memo, instance) {
    var node = _react2['default'].findDOMNode(instance);
    if (node === target || node.contains(target)) {
      memo.push({ instance: instance, node: node });
    }
    return memo;
  };
}

function _sortByDOMPosition(a, b) {
  return a.node.compareDocumentPosition(b.node) === 10 ? 1 : -1;
}

/**
 * _handleClick
 *
 * @access private
 * @param {object} event The click event object
 * @param {object} event.target The DOM node from the click event
 */
function _handleClick(_ref) {
  var target = _ref.target;

  var toActivate = [].concat(_toConsumableArray(_instances)).reduce(_findContainerNodes(target), []).sort(_sortByDOMPosition).map(function (item) {
    return item.instance;
  });

  _activate(toActivate);
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
function _shouldConsider(_ref2) {
  var tagName = _ref2.target.tagName;

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
    var keyMatchesEvent = function keyMatchesEvent(keySet) {
      return (0, _match_keys2['default'])({ keySet: keySet, event: event });
    };

    // loop through instances in reverse activation order so that most
    // recently activated instance gets first dibs on event
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = [].concat(_toConsumableArray(_instances)).reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var instance = _step.value;

        var bindings = getBinding(instance.constructor.prototype);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = bindings[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2);

            var keySets = _step2$value[0];
            var fn = _step2$value[1];

            if ((0, _keys.allKeys)(keySets) || keySets.some(keyMatchesEvent)) {
              fn.call(instance, event);

              // return when matching keybinding is found and fired - i.e. only one
              // keybound component can respond to a given key code. to get around this,
              // scope a common ancestor component class with @keydown and use
              // @keydownScoped to bind the duplicate keys in your child components
              // (or just inspect nextProps.keydown.event).
              return true;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
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
  }
  return false;
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
    var node = _react2['default'].findDOMNode(instance);
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
  if (_keysBound && !_instances.size) {
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
  if (_clicksBound && !_instances.size) {
    document.removeEventListener('click', _handleClick);
    _clicksBound = false;
  }
}

/**
 * public
 *
 */
function getAll() {
  return _handlers;
}

/**
 * getBinding
 *
 * @access public
 * @param {object} target Class used as key in dict of key bindings
 * @return {object} The object containing bindings for the given class
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
function setBinding(_ref3) {
  var keys = _ref3.keys;
  var fn = _ref3.fn;
  var target = _ref3.target;

  var keySets = keys ? (0, _parse_keys2['default'])(keys) : (0, _keys.allKeys)();
  var handler = getBinding(target);
  if (!handler) {
    handler = _handlers.set(target, new Map()).get(target);
  }
  handler.set(keySets, fn);
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
}

/**
 * onUnmount
 *
 * @access public
 */
function onUnmount(instance) {
  _deleteInstance(instance);
  _unbindClicks();
}

exports.getAll = getAll;
exports.getBinding = getBinding;
exports.onMount = onMount;
exports.onUnmount = onUnmount;
exports.setBinding = setBinding;