/**
 * @module attachListeners
 *
 */

// flag for whether click listener has been bound to document
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = attachListeners;
var _clicksBound = false;

// flag for whether keydown listener has been bound to document
var _keysBound = false;

/**
 * _bindKeys
 *
 * @access private
 */
function _bindKeys(callback) {
  if (!_keysBound) {
    document.addEventListener('keydown', callback);
    _keysBound = true;
  }
}

/**
 * _unbindKeys
 *
 * @access private
 */
function _unbindKeys(callback) {
  if (_keysBound) {
    document.removeEventListener('keydown', callback);
    _keysBound = false;
  }
}

/**
 * _bindClicks
 *
 * @access private
 */
function _bindClicks(callback) {
  if (!_clicksBound) {
    document.addEventListener('click', callback);
    _clicksBound = true;
  }
}

/**
 * _unbindClicks
 *
 * @access private
 */
function _unbindClicks(callback) {
  if (_clicksBound) {
    document.removeEventListener('click', callback);
    _clicksBound = false;
  }
}

function attachListeners(_ref) {
  var onClick = _ref.onClick;
  var onKeyDown = _ref.onKeyDown;

  var result = {};
  if (onClick) {
    result.bindClicks = function () {
      return _bindClicks(onClick);
    };
    result.unbindClicks = function () {
      return _unbindClicks(onClick);
    };
  }
  if (onKeyDown) {
    result.bindKeys = function () {
      return _bindKeys(onKeyDown);
    };
    result.unbindKeys = function () {
      return _unbindKeys(onKeyDown);
    };
  }
  return result;
}

module.exports = exports['default'];