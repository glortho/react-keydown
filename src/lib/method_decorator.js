import { onMount, onUnmount } from './listeners';

function methodWrapper( { target, descriptor, keys } ) {

  const { componentDidMount, componentWillUnmount } = target;
  const fn = descriptor.value;

  target.componentDidMount = function() {
    onMount.call( this, { keys, fn } );
    if ( componentDidMount ) return componentDidMount.call( this );
  };

  target.componentWillUnmount = function() {
    onUnmount.call( this );
    if ( componentWillUnmount ) return componentWillUnmount.call( this );
  };

  return descriptor;
}

export default methodWrapper;
