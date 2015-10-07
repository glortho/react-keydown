!(function (e, r) {
  if ('function' == typeof define && define.amd) define(['exports', './lib/class_decorator', './lib/method_decorator', './lib/method_decorator_scoped', './lib/keys'], r);else if ('undefined' != typeof exports) r(exports, require('./lib/class_decorator'), require('./lib/method_decorator'), require('./lib/method_decorator_scoped'), require('./lib/keys'));else {
    var t = {
      exports: {}
    };
    r(t.exports, e.classWrapper, e.methodWrapper, e.methodWrapperScoped, e.Keys), e.index = t.exports;
  }
})(this, function (e, r, t, o, a) {
  'use strict';

  function n(e) {
    return e && e.__esModule ? e : {
      'default': e
    };
  }

  function d(e) {
    for (var r = arguments.length, t = Array(r > 1 ? r - 1 : 0), o = 1; r > o; o++) t[o - 1] = arguments[o];

    var a = t[0],
        n = Array.isArray(a);

    if (n || parseInt(a, 10)) {
      var d = (function () {
        var r = n ? a : t;
        return {
          v: function (t, o, a) {
            return o ? e({
              target: t,
              descriptor: a,
              keys: r
            }) : u['default'](t, r);
          }
        };
      })();

      if ('object' == typeof d) return d.v;
    } else {
      var i = t[1];
      if (!i) return u['default'].apply(undefined, t);
      console.warn(i + ': Method decorators must have keycode arguments, so the decorator for this method will not do anything');
    }
  }

  function i() {
    for (var e = arguments.length, r = Array(e), t = 0; e > t; t++) r[t] = arguments[t];

    return d.apply(undefined, [f['default']].concat(r));
  }

  function s() {
    for (var e = arguments.length, r = Array(e), t = 0; e > t; t++) r[t] = arguments[t];

    return d.apply(undefined, [c['default']].concat(r));
  }

  Object.defineProperty(e, '__esModule', {
    value: !0
  });
  var u = n(r),
      c = n(t),
      f = n(o),
      l = n(a);
  e['default'] = s, e.Keys = l['default'], e.keydownScoped = i;
});
/**
 * @module keydown
 *
 */

/**
 * _decorator
 *
 * @access private
 * @param {Function} methodFn The method wrapper to delegate to, based on whether user has specified a scoped decorator or not
 * @param {Array} ...args Remainder of arguments passed in
 * @return {Function} The decorated class or method
 */

// check the first argument to see if it's a user-supplied keycode or array
// of keycodes, or if it's the wrapped class or method

// if the test argument is an array or an integer, it is user-supplied
// keycodes. else there are no arguments and it's just the wrapped class
// (method decorators must have keycode arguments).

// return the decorator function, which on the next call will look for
// the presence of a method name to determine if this is a wrapped method
// or component

// method decorators without keycode (which) arguments are not allowed.

/**
 * keydownScoped
 *
 * Method decorator that will look for changes to its targeted component's
 * `keydown` props to decide when to trigger, rather than responding directly
 * to keydown events. This lets you specify a @keydown decorated class higher
 * up in the view hierarchy for larger scoping of keydown events, or for
 * programmatically sending keydown events as props into the components in order
 * to trigger decorated methods with matching keys.
 *
 * @access public
 * @param {Array} ...args  All (or no) arguments passed in from decoration
 * @return {Function} The decorated class or method
 */

/**
 * keydown
 *
 * The main decorator and default export, handles both classes and methods.
 *
 * @access public
 * @param {Array} ...args  All (or no) arguments passed in from decoration
 * @return {Function} The decorated class or method
 */