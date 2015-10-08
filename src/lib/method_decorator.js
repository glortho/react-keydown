import { addBinding, onMount, onUnmount } from './listeners';

const classes = new Map();

function methodWrapper( { target, descriptor, keys } ) {
  const { componentDidMount, componentWillUnmount } = target;
  const fn = descriptor.value;
  
  addBinding( { keys, fn, target } );

  if ( !classes.get( target ) ) {
    classes.set( target, true );
    target.componentDidMount = function() {
      onMount.call( this );
      if ( componentDidMount ) return componentDidMount.call( this );
    };
    target.componentWillUnmount = function() {
      onUnmount.call( this );
      if ( componentWillUnmount ) return componentWillUnmount.call( this );
    };
  }

  return descriptor;
}

export default methodWrapper;
