/**
 * @module methodWrapperScoped
 *
 */

/**
 * _shouldTrigger
 *
 * @access private
 * @param {object} thisProps Exsting props from the wrapped component
 * @param {object} thisProps.keydown The namespaced state from the higher-order
 * component (class_decorator)
 * @param {object} nextProps The incoming props from the wrapped component
 * @param {object} nextProps.keydown The namescaped state from the higher-order
 * component (class_decorator)
 * @param {array} keys The keys bound to the decorated method
 * @return {boolean} Whether all tests have passed
 */
function _shouldTrigger( { keydown: keydownThis }, { keydown: keydownNext }, keys ) {
  return keydownNext &&
         keydownNext.event && 
         !keydownThis.event &&
         ~keys.indexOf( keydownNext.event.which ) ;
}

/**
 * methodWrapperScoped
 *
 * @access public
 * @param {object} args All args necessary for decorating the method
 * @param {object} args.target The decorated method's class object
 * @param {object} args.descriptor The method's descriptor object
 * @param {array} args.keys The key codes bound to the decorated method
 * @return {object} The method's descriptor object
 */
function methodWrapperScoped( { target, descriptor, keys } ) {
  const { componentWillReceiveProps } = target;
  const fn = descriptor.value;

  // wrap the component's lifecycle method to intercept key codes coming down
  // from the wrapped/scoped component up the view hierarchy. if new keydown
  // event has arrived and the key codes match what was specified in the
  // decorator, call the wrapped method.
  target.componentWillReceiveProps = function( nextProps, ...args ) {
    if ( _shouldTrigger( this.props, nextProps, keys ) ) {
      fn.call( this, nextProps.keydown.event );
    }
    if ( componentWillReceiveProps ) return componentWillReceiveProps.call( this, nextProps, ...args );
  };

  return descriptor;
}

export default methodWrapperScoped;


