import React from 'react';

/**
 * private
 * 
 */

const _handlers      = new Map();
let _focusedInstance = null;
let _clicksBound     = false;
let _keysBound       = false;

function _addInstance( target ) {
  return getBinding( target.constructor.prototype ).instances.add( target );
}

function _deleteInstance( target ) {
  return getBinding( target.constructor.prototype ).instances.delete( target );
}

function _findFocused( { target, instance } ) {
  const node = React.findDOMNode( instance );
  return target === node || node.contains( target );
}

function _focus( instance ) {
  _focusedInstance = instance;
  return instance ? _bindKeys() : _unbindKeys();
}

function _handleClick( { target } ) {
  console.log(target);
  const findFocused = instance => _findFocused( { target, instance } );
  let focusedInstance = null;
  for ( let [, { instances } ] of _handlers ) {
    focusedInstance = [ ...instances ].find( findFocused );
    if ( focusedInstance ) break;
  }
  _focus( focusedInstance );
}

function _handleKeyDown( { which } ) {
  console.log(which);
  const { bindings } = getBinding( _focusedInstance.constructor.prototype );
  bindings.forEach( ( fn, keys ) => (
    ( !keys || ~keys.indexOf( which ) ) && fn.call( _focusedInstance, event )
  ));
}

function _bindKeys() {
  if ( !_keysBound ) {
    document.addEventListener( 'keydown', _handleKeyDown );
    _keysBound = true;
  }
}

function _unbindKeys() {
  if ( _keysBound ) {
    document.removeEventListener( 'keydown', _handleKeyDown );
    _keysBound = false;
  }
}

function _bindClicks() {
  if ( !_clicksBound ) {
    document.addEventListener( 'click', _handleClick );
    _clicksBound = true;
  }
}

function _unbindClicks() {
  if ( _clicksBound && ![ ..._handlers ].some( ( [, { instances } ] ) => instances.size ) ) {
    document.removeEventListener( 'click', _handleClick );
    _clicksBound = false;
  }
}


/**
 * public
 *
 */

function getBinding( target ) {
  return _handlers.get( target );
}

function setBinding( { keys, fn, target } ) {
  let handler = getBinding( target );
  if ( !handler ) {
    handler = _handlers.set( target, { bindings: new Map(), instances: new Set() } ).get( target );
  }
  handler.bindings.set( keys, fn );
}

function onMount() {
  _bindClicks();
  _addInstance( this );
  // have to bump this to next event loop because component mounting routinely
  // preceeds the dom click event that triggered the mount (wtf?)
  setTimeout(() => _focus( this ), 0);
}

function onUnmount() {
  _deleteInstance( this );
  _unbindClicks();
}

export { setBinding, getBinding, onMount, onUnmount };
