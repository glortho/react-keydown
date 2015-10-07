import React from 'react';

const handlers = new Map();

function handleClick( node, event ) {
  this._keyDownHasFocus = event.target === node || node.contains( event.target );
}

function handleKeyDown( { which } ) {
  if ( this._keyDownHasFocus ) {
    const bindings = handlers.get( this ).bindings;
    bindings.forEach( ( fn, keys ) => ( !keys || ~keys.indexOf( which ) ) && fn.call( this, event ) );
  }
}

export const onMount = function onMount( { keys, fn } ) {
  const handlerDict = handlers.get( this );
  if ( !handlerDict ) {
    const node = React.findDOMNode( this );
    const onClickBound = handleClick.bind( this, node );
    const onKeyDownBound = handleKeyDown.bind( this );

    handlers.set( this, { 
      bindings: new Map( [ [ keys, fn ] ] ),
      onClick: onClickBound,
      onKeyDown: onKeyDownBound
    });

    document.addEventListener( 'keydown', onKeyDownBound );
    document.addEventListener( 'click', onClickBound );
    this._keyDownHasFocus = true;
  } else {
    handlerDict.bindings.set( keys, fn );
  }
};

export const onUnmount = function onUnmount() {
  const handler = handlers.get( this );
  if ( handler ) {
    document.removeEventListener( 'keydown', handler.onKeyDown );
    document.removeEventListener( 'click', handler.onClick );
  }
  this._keyDownHasFocus = false;
};

