import { getBinding, setBinding, onMount, onUnmount } from './listeners';

function methodWrapper( { target, descriptor, keys } ) {
  const { componentDidMount, componentWillUnmount } = target;
  const fn = descriptor.value;
  
  if ( !getBinding( target ) ) {
    target.componentDidMount = function() {
      onMount.call( this );
      if ( componentDidMount ) return componentDidMount.call( this );
    };
    target.componentWillUnmount = function() {
      onUnmount.call( this );
      if ( componentWillUnmount ) return componentWillUnmount.call( this );
    };
  }

  setBinding( { keys, fn, target } );

  return descriptor;
}

export default methodWrapper;
