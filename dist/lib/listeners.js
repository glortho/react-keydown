(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React);
    global.listeners = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  var _React = _interopRequireDefault(_react);

  /**
   * private
   * 
   */

  var _handlers = new Map();
  var _focusedInstance = null;
  var _clicksBound = false;
  var _keysBound = false;

  function _addInstance(target) {
    return getBinding(target.constructor.prototype).instances.add(target);
  }

  function _deleteInstance(target) {
    return getBinding(target.constructor.prototype).instances['delete'](target);
  }

  function _findFocused(_ref) {
    var target = _ref.target;
    var instance = _ref.instance;

    var node = _React['default'].findDOMNode(instance);
    return target === node || node.contains(target);
  }

  function _focus(instance) {
    _focusedInstance = instance;
    return instance ? _bindKeys() : _unbindKeys();
  }

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

    _focus(focusedInstance);
  }

  function _handleKeyDown(_ref3) {
    var which = _ref3.which;

    var _getBinding = getBinding(_focusedInstance.constructor.prototype);

    var bindings = _getBinding.bindings;

    bindings.forEach(function (fn, keys) {
      return (!keys || ~keys.indexOf(which)) && fn.call(_focusedInstance, event);
    });
  }

  function _bindKeys() {
    if (!_keysBound) {
      document.addEventListener('keydown', _handleKeyDown);
      _keysBound = true;
    }
  }

  function _unbindKeys() {
    if (_keysBound) {
      document.removeEventListener('keydown', _handleKeyDown);
      _keysBound = false;
    }
  }

  function _bindClicks() {
    if (!_clicksBound) {
      document.addEventListener('click', _handleClick);
      _clicksBound = true;
    }
  }

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

  function getBinding(target) {
    return _handlers.get(target);
  }

  function setBinding(_ref5) {
    var keys = _ref5.keys;
    var fn = _ref5.fn;
    var target = _ref5.target;

    var handler = getBinding(target);
    if (!handler) {
      handler = _handlers.set(target, { bindings: new Map(), instances: new Set() }).get(target);
    }
    handler.bindings.set(keys, fn);
  }

  function onMount() {
    var _this = this;

    _bindClicks();
    _addInstance(this);
    // have to bump this to next event loop because component mounting routinely
    // preceeds the dom click event that triggered the mount (wtf?)
    setTimeout(function () {
      return _focus(_this);
    }, 0);
  }

  function onUnmount() {
    _deleteInstance(this);
    _unbindClicks();
  }

  exports.setBinding = setBinding;
  exports.getBinding = getBinding;
  exports.onMount = onMount;
  exports.onUnmount = onUnmount;
});