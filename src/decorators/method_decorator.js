/**
 * @module methodWrapper
 *
 */
import * as store from '../store';
import { onMount, onUnmount, _onKeyDown } from '../event_handlers';

/**
 * _isReactKeyDown
 *
 * @access private
 * @param {object} event The possibly synthetic event passed as an argument with
 * the method invocation.
 * @return {boolean}
 */
function _isReactKeyDown( event ) {
   return event &&
    typeof event === 'object' &&
    event.nativeEvent instanceof window.KeyboardEvent &&
    event.type === 'keydown';
}

/**
 * methodWrapper
 *
 * @access public
 * @param {object} args All arguments necessary for wrapping method
 * @param {object} args.target The decorated class
 * @param {object} args.descriptor Method descriptor
 * @param {array} args.keys The array of keys bound to the given method
 * @return {object} The method descriptor
 */
function methodWrapper( { target, descriptor, keys } ) {

  const fn = descriptor.value;

  // if we haven't already created a binding for this class (via another
  // decorated method), wrap these lifecycle methods.
  if ( !store.getBinding( target ) ) {

    const { componentDidMount, componentWillUnmount } = target;

    target.componentDidMount = function() {
      onMount( this );
      if ( componentDidMount ) return componentDidMount.call( this );
    };

    target.componentWillUnmount = function() {
      onUnmount( this );
      if ( componentWillUnmount ) return componentWillUnmount.call( this );
    };
  }

  // add this binding of keys and method to the target's bindings
  store.setBinding( { keys, target, fn } );

  descriptor.value = function( ...args ) {
    const [ maybeEvent ] = args;
    if ( _isReactKeyDown( maybeEvent ) ) {
      // proxy method in order to use @keydown as filter for keydown events coming
      // from an actual onKeyDown binding (as identified by react's addition of
      // 'nativeEvent' + type === 'keydown')
      if ( !maybeEvent.ctrlKey ) {
        // we already whitelist shortcuts with ctrl modifiers so if we were to
        // fire it again here the method would trigger twice. see https://github.com/glortho/react-keydown/issues/38
        return _onKeyDown( maybeEvent, true );
      }
    } else if ( !maybeEvent || !( maybeEvent instanceof window.KeyboardEvent ) || maybeEvent.type !== 'keydown' ) {
      // if our first argument is a keydown event it is being handled by our
      // binding system. if it's anything else, just pass through.
      return fn.call( this, ...args );
    }
  }

  return descriptor;
}

export default methodWrapper;
