import { getBinding, setBinding, onMount, onUnmount } from './listeners';

function methodWrapper( { target, descriptor, keys } ) {

  if ( !getBinding( target ) ) {

    const { componentDidMount, componentWillUnmount } = target;
    
    target.componentDidMount = function() {
      onMount.call( this );
      if ( componentDidMount ) return componentDidMount.call( this );
    };

    target.componentWillUnmount = function() {
      onUnmount.call( this );
      if ( componentWillUnmount ) return componentWillUnmount.call( this );
    };
  }

  setBinding( { keys, target, fn: descriptor.value } );

  return descriptor;
}

export default methodWrapper;
