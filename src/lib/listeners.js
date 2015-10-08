import React from 'react';

const handlers = new Map();

function handleClick( node, { target } ) {
  handlers.get( this ).hasFocus = target === node || node.contains( target );
}

function handleKeyDown( { which } ) {
  const focusedComponent = [ ...handlers ].find( ( [, data ] ) => data.hasFocus );
  if ( focusedComponent ) {
    const [ componentInstance, { bindings } ] = focusedComponent;
    bindings.forEach( ( fn, keys ) => ( !keys || ~keys.indexOf( which ) ) && fn.call( componentInstance, event ) );
  }
}

function bindListeners() {
  document.addEventListener( 'keydown', handleKeyDown );
}

function unbindListeners() {
  document.removeEventListener( 'keydown', handleKeyDown );
}

function onMount( { keys, fn } ) {
  const handlerDict = handlers.get( this );
  if ( !handlerDict ) {
    if ( !handlers.size ) bindListeners();
    const node = React.findDOMNode( this );
    const onClickBound = handleClick.bind( this, node );

    handlers.set( this, { 
      bindings: new Map( [ [ keys, fn ] ] ),
      onClick: onClickBound
    });

    document.addEventListener( 'click', onClickBound );
  } else {
    handlerDict.bindings.set( keys, fn );
  }
  handlers.get( this ).hasFocus = true;
}

function onUnmount() {
  const handler = handlers.get( this );
  if ( handler ) {
    document.removeEventListener( 'click', handler.onClick );
    handlers.delete( this );
  }
  if ( !handlers.size ) unbindListeners();
}

export { onMount, onUnmount };
