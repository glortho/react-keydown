function shouldTrigger( { keydown: keydownThis }, { keydown: keydownNext }, keys ) {
  return keydownNext &&
         keydownNext.event && 
         !keydownThis.event &&
         ~keys.indexOf( keydownNext.event.which ) ;
}

function methodWrapperScoped( { target, descriptor, keys } ) {
  const { componentWillReceiveProps } = target;
  const fn = descriptor.value;

  target.componentWillReceiveProps = function( nextProps, ...args ) {
    if ( shouldTrigger( this.props, nextProps, keys ) ) {
      fn.call( this, nextProps.keydown.event );
    }
    if ( componentWillReceiveProps ) return componentWillReceiveProps.call( this, nextProps, ...args );
  };

  return descriptor;
}

export default methodWrapperScoped;


