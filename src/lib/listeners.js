import React from 'react';

const handlers = new Map();
let isBound    = false;

function addBinding( { keys, fn, target } ) {
  let handler = handlers.get( target );
  if ( !handler ) {
    handler = handlers.set( target, { bindings: new Map(), instances: new Map() } ).get( target );
  }
  handler.bindings.set( keys, fn );
}

function getFocusedInstance() {
  let instanceMap = null;
  const classMap = [ ...handlers ].find( ( [, { instances } ] ) => {
    instanceMap = [ ...instances ].find( ( [, data ] ) => data.hasFocus );
    return instanceMap;
  });
  return { classMap, instanceMap };
}

function handleClick( node, { target } ) {
  handlers.get( this.constructor.prototype ).instances.get( this ).hasFocus = target === node || node.contains( target );
}

function handleKeyDown( { which } ) {
  const { classMap, instanceMap } = getFocusedInstance();
  if ( classMap && instanceMap ) {
    const [, { bindings } ] = classMap;
    const [ instance ] = instanceMap;
    bindings.forEach( ( fn, keys ) => (
      ( !keys || ~keys.indexOf( which ) ) && fn.call( instance, event )
    ));
  }
}

function bindListeners() {
  document.addEventListener( 'keydown', handleKeyDown );
  isBound = true;
}

function unbindListeners() {
  document.removeEventListener( 'keydown', handleKeyDown );
  isBound = false;
}

function onMount() {
  if ( !isBound ) bindListeners();

  const handler      = handlers.get( this.constructor.prototype );
  const node         = React.findDOMNode( this );
  const onClickBound = handleClick.bind( this, node );

  handler.instances.set( this, {
    hasFocus: true,
    onClick: onClickBound
  });

  document.addEventListener( 'click', onClickBound );
}

function onUnmount() {
  const allInstances = handlers.get( this.constructor.prototype ).instances;
  const instance = allInstances.get( this );
  if ( instance ) {
    document.removeEventListener( 'click', instance.onClick );
    allInstances.delete( this );
  }
  if ( ![ ...handlers ].some( ( [, { instances } ] ) => instances.size ) ) {
    unbindListeners();
  }
}

export { addBinding, onMount, onUnmount };
