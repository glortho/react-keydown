(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.listeners = mod.exports;
  }
})(this, function (exports, module) {
  /**
   * @module Listeners
   *
   */

  // flag for whether click listener has been bound to document
  'use strict';

  var _clicksBound = false;

  // flag for whether keydown listener has been bound to document
  var _keysBound = false;

  var Listeners = {
    /**
     * _bindKeys
     *
     * @access public
     */
    bindKeys: function bindKeys(callback) {
      if (!_keysBound) {
        document.addEventListener('keydown', callback);
        _keysBound = true;
      }
    },

    /**
     * unbindKeys
     *
     * @access public
     */
    unbindKeys: function unbindKeys(callback) {
      if (_keysBound) {
        document.removeEventListener('keydown', callback);
        _keysBound = false;
      }
    },

    /**
     * bindClicks
     *
     * @access public
     */
    bindClicks: function bindClicks(callback) {
      if (!_clicksBound) {
        document.addEventListener('click', callback);
        _clicksBound = true;
      }
    },

    /**
     * unbindClicks
     *
     * @access public
     */
    unbindClicks: function unbindClicks(callback) {
      if (_clicksBound) {
        document.removeEventListener('click', callback);
        _clicksBound = false;
      }
    }
  };

  module.exports = Listeners;
});