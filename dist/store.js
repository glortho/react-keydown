(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './lib/keys', './lib/match_keys', './lib/parse_keys'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./lib/keys'), require('./lib/match_keys'), require('./lib/parse_keys'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.keys, global.matchKeys, global.parseKeys);
    global.store = mod.exports;
  }
})(this, function (exports, module, _libKeys, _libMatch_keys, _libParse_keys) {
  /**
   * @module store
   *
   */
  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  var _matchKeys = _interopRequireDefault(_libMatch_keys);

  var _parseKeys = _interopRequireDefault(_libParse_keys);

  /**
   * private
   * 
   */

  // dict for class prototypes => bindings
  var _handlers = new Map();

  // all mounted instances that have keybindings
  var _instances = new Set();

  /**
   * public
   *
   */

  var Store = {

    /**
     * activate
     *
     * @access public
     * @param {object} instance Instantiated class that extended React.Component, to be focused to receive keydown events
     */
    activate: function activate(instances) {

      // deleting and then adding the instance(s) has the effect of sorting the set
      // according to instance activation (ascending)
      [].concat(instances).forEach(function (instance) {
        _instances['delete'](instance);
        _instances.add(instance);
      });
    },

    /**
     * deleteInstance
     *
     * @access public
     * @param {object} target Instantiated class that extended React.Component
     * @return {boolean} The value set.has( target ) would have returned prior to deletion
     */
    deleteInstance: function deleteInstance(target) {
      _instances['delete'](target);
      return _instances;
    },

    findBindingForEvent: function findBindingForEvent(event) {
      var keyMatchesEvent = function keyMatchesEvent(keySet) {
        return (0, _matchKeys['default'])({ keySet: keySet, event: event });
      };
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = [].concat(_toConsumableArray(_instances)).reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var instance = _step.value;

          var bindings = _handlers.get(instance.constructor.prototype);

          // loop through instances in reverse activation order so that most
          // recently activated instance gets first dibs on event
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = bindings[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _step2$value = _slicedToArray(_step2.value, 2);

              var keySets = _step2$value[0];
              var fn = _step2$value[1];

              if ((0, _libKeys.allKeys)(keySets) || keySets.some(keyMatchesEvent)) {
                // return when matching keybinding is found - i.e. only one
                // keybound component can respond to a given key code. to get around this,
                // scope a common ancestor component class with @keydown and use
                // @keydownScoped to bind the duplicate keys in your child components
                // (or just inspect nextProps.keydown.event).
                return { fn: fn, instance: instance };
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

      return null;
    },

    /**
     * getBinding
     *
     * @access public
     * @param {object} target Class used as key in dict of key bindings
     * @return {object} The object containing bindings for the given class
     */
    getBinding: function getBinding(target) {
      return _handlers.get(target);
    },

    getInstances: function getInstances() {
      return _instances;
    },

    /**
     * setBinding
     *
     * @access public
     * @param {object} args All arguments necessary to set the binding
     * @param {array} args.keys Key codes that should trigger the fn
     * @param {function} args.fn The callback to be triggered when given keys are pressed
     * @param {object} args.target The decorated class
     */
    setBinding: function setBinding(_ref) {
      var keys = _ref.keys;
      var fn = _ref.fn;
      var target = _ref.target;

      var keySets = keys ? (0, _parseKeys['default'])(keys) : (0, _libKeys.allKeys)();
      var handler = _handlers.get(target);
      if (!handler) {
        handler = _handlers.set(target, new Map()).get(target);
      }
      handler.set(keySets, fn);
    }
  };

  module.exports = Store;
});