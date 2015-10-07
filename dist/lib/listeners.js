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

  var handlers = new Map();

  function handleClick(node, event) {
    this._keyDownHasFocus = event.target === node || node.contains(event.target);
  }

  function handleKeyDown(_ref) {
    var which = _ref.which;

    var handler = [].concat(_toConsumableArray(handlers)).find(function (_ref2) {
      var _ref22 = _slicedToArray(_ref2, 1);

      var componentInstance = _ref22[0];
      return componentInstance._keyDownHasFocus;
    });
    if (handler) {
      (function () {
        var _handler = _slicedToArray(handler, 2);

        var componentInstance = _handler[0];
        var bindings = _handler[1].bindings;

        bindings.forEach(function (fn, keys) {
          return (!keys || ~keys.indexOf(which)) && fn.call(componentInstance, event);
        });
      })();
    }
  }

  function bindListeners() {
    document.addEventListener('keydown', handleKeyDown);
  }

  function unbindListeners() {
    document.removeEventListener('keydown', handleKeyDown);
  }

  function onMount(_ref3) {
    var keys = _ref3.keys;
    var fn = _ref3.fn;

    var handlerDict = handlers.get(this);
    if (!handlerDict) {
      if (!handlers.size) bindListeners();
      var node = _React['default'].findDOMNode(this);
      var onClickBound = handleClick.bind(this, node);

      handlers.set(this, {
        bindings: new Map([[keys, fn]]),
        onClick: onClickBound
      });

      document.addEventListener('click', onClickBound);
      this._keyDownHasFocus = true;
    } else {
      handlerDict.bindings.set(keys, fn);
    }
  }

  function onUnmount() {
    var handler = handlers.get(this);
    if (handler) {
      document.removeEventListener('click', handler.onClick);
      handlers['delete'](this);
    }
    if (!handlers.size) unbindListeners();
    this._keyDownHasFocus = false;
  }

  exports.onMount = onMount;
  exports.onUnmount = onUnmount;
});