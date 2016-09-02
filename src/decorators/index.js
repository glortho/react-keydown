/**
 * @module decorators
 *
 */
import classWrapper        from './class_decorator';
import methodWrapper       from './method_decorator';
import methodWrapperScoped from './method_decorator_scoped';

/**
 * _decorator
 *
 * @access private
 * @param {Function} methodFn The method wrapper to delegate to, based on whether user has specified a scoped decorator or not
 * @param {Array} ...args Remainder of arguments passed in
 * @return {Function} The decorated class or method
 */
function _decorator( methodFn, ...args ) {

  // check the first argument to see if it's a user-supplied keycode or array
  // of keycodes, or if it's the wrapped class or method
  const testArg = args[0];
  const isArray = Array.isArray( testArg );

  // check for any options passed in (currently internal use only)
  const lastArg = args[args.length - 1];
  const options = (
    lastArg && typeof lastArg === 'object' && !Array.isArray( lastArg )
      ? args.pop()
      : {}
  );

  // if the test argument is not an object or function, it is user-supplied
  // keycodes. else there are no arguments and it's just the wrapped class
  // (method decorators must have keycode arguments).
  if ( isArray || ~[ 'string', 'number' ].indexOf( typeof testArg ) ) {
    const keys = isArray ? testArg : args;

    // return the decorator function, which on the next call will look for
    // the presence of a method name to determine if this is a wrapped method
    // or component
    return ( target, methodName, descriptor ) => {
      return methodName
        ? methodFn( { target, descriptor, keys }, options )
        : classWrapper( target, keys, options );
    };
  } else {
    const methodName = args[1];

    // method decorators without keycode (which) arguments are not allowed.
    if ( !methodName ) {
      return classWrapper( ...args, options );
    } else {
      console.warn( `${methodName}: Method decorators must have keycode arguments, so the decorator for this method will not do anything` );
    }
  }
}

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
function keydownScoped( ...args ) {
  return _decorator( methodWrapperScoped, ...args );
}

/**
 * keydown
 *
 * The main decorator and default export, handles both classes and methods.
 *
 * @access public
 * @param {Array} ...args  All (or no) arguments passed in from decoration
 * @return {Function} The decorated class or method
 */
function keydown( ...args ) {
  return _decorator( methodWrapper, ...args );
}

/**
  * keyup
  *
  * Same as keydown but triggered on keyup instead of keydown
  * @access public
  * @param {Array} ...args All (or no) arguments passed in from decoration
  * @return {Function} The decorated class or method
  */
function keyup( ...args ) {
  return _decorator( methodWrapper, ...args, { event: 'keyup' } );
}

export default keydown;

export { keydownScoped, keyup };
