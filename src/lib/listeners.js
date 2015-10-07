import React from 'react';

const handlers = new Map();

function handleClick( node, event ) {
  this._keyDownHasFocus = event.target === node || node.contains( event.target );
}

function handleKeyDown( { which } ) {
  const focusedComponent = [ ...handlers ].find( ( [ component ] ) => component._keyDownHasFocus );
  if ( focusedComponent ) {
    const [ component, { bindings } ] = focusedComponent;
    bindings.forEach( ( fn, keys ) => ( !keys || ~keys.indexOf( which ) ) && fn.call( component, event ) );
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
    this._keyDownHasFocus = true;
  } else {
    handlerDict.bindings.set( keys, fn );
  }
}

function onUnmount() {
  const handler = handlers.get( this );
  if ( handler ) {
    document.removeEventListener( 'click', handler.onClick );
    handlers.delete( this );
  }
  if ( !handlers.size ) unbindListeners();
  this._keyDownHasFocus = false;
}

export { onMount, onUnmount };
