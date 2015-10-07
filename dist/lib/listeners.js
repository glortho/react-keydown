'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var handlers = new Map();

function handleClick(node, event) {
  this._keyDownHasFocus = event.target === node || node.contains(event.target);
}

function handleKeyDown(_ref) {
  var _this = this;

  var which = _ref.which;

  if (this._keyDownHasFocus) {
    var bindings = handlers.get(this).bindings;
    bindings.forEach(function (fn, keys) {
      return (!keys || ~keys.indexOf(which)) && fn.call(_this, event);
    });
  }
}

var onMount = function onMount(_ref2) {
  var keys = _ref2.keys;
  var fn = _ref2.fn;

  var handlerDict = handlers.get(this);
  if (!handlerDict) {
    var node = _react2['default'].findDOMNode(this);
    var onClickBound = handleClick.bind(this, node);
    var onKeyDownBound = handleKeyDown.bind(this);

    handlers.set(this, {
      bindings: new Map([[keys, fn]]),
      onClick: onClickBound,
      onKeyDown: onKeyDownBound
    });

    document.addEventListener('keydown', onKeyDownBound);
    document.addEventListener('click', onClickBound);
    this._keyDownHasFocus = true;
  } else {
    handlerDict.bindings.set(keys, fn);
  }
};

exports.onMount = onMount;
var onUnmount = function onUnmount() {
  var handler = handlers.get(this);
  if (handler) {
    document.removeEventListener('keydown', handler.onKeyDown);
    document.removeEventListener('click', handler.onClick);
  }
  this._keyDownHasFocus = false;
};
exports.onUnmount = onUnmount;