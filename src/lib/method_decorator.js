/**
 * @module methodWrapper
 *
 */
import { getBinding, setBinding, onMount, onUnmount } from './listeners';

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

  // if we haven't already created a binding for this class (via another
  // decorated method), wrap these lifecycle methods.
  if ( !getBinding( target ) ) {

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
  setBinding( { keys, target, fn: descriptor.value } );

  return descriptor;
}

export default methodWrapper;
