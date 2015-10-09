/**
 * @module listeners
 *
 */
import React from 'react';

/**
 * private
 * 
 */

// dict for class prototypes => { bindings, instances }
const _handlers = new Map();

// the currently focused instance that should receive key presses
let _focusedInstance = null;

// flag for whether click listener has been bound to document
let _clicksBound = false;

// flag for whether keydown listener has been bound to document
let _keysBound = false;

/**
 * _addInstance
 *
 * @access private
 * @param {object} target Instantiated class that extended React.Component
 * @return {set} The set of instances for the passed in class
 */
function _addInstance( target ) {
  return getBinding( target.constructor.prototype ).instances.add( target );
}

/**
 * _deleteInstance
 *
 * @access private
 * @param {object} target Instantiated class that extended React.Component
 * @return {boolean} The value set.has( target ) would have returned prior to deletion
 */
function _deleteInstance( target ) {
  return getBinding( target.constructor.prototype ).instances.delete( target );
}

/**
 * _findFocused
 *
 * @access private
 * @param {object} data Criteria to use for finding the focused node
 * @param {object} data.instance The instantiated React.Component that is
 * a candidate for being focuse
 * @param {object} data.target The DOM node from the click event
 * @return {boolean} Success or failure in matching the node to the event target
 */
function _findFocused( { target, instance } ) {
  const node = React.findDOMNode( instance );
  return target === node || node.contains( target );
}

/**
 * _focus
 *
 * @access private
 * @param {object} instance Instantiated class that extended React.Component, to be focused to receive keydown events
 */
function _focus( instance ) {
  _focusedInstance = instance;
  return instance ? _bindKeys() : _unbindKeys();
}

/**
 * _handleClick
 *
 * @access private
 * @param {object} event The click event object
 * @param {object} event.target The DOM node from the click event
 */
function _handleClick( { target } ) {
  const findFocused = instance => _findFocused( { target, instance } );
  let focusedInstance = null;
  for ( let [, { instances } ] of _handlers ) {
    focusedInstance = [ ...instances ].find( findFocused );
    if ( focusedInstance ) break;
  }
  _focus( focusedInstance );
}

/**
 * _handleKeyDown
 *
 * @access private
 * @param {object} event The keydown event object
 * @param {number} event.which The key code (which) received from the keydown event
 */
function _handleKeyDown( { which } ) {
  const { bindings } = getBinding( _focusedInstance.constructor.prototype );
  bindings.forEach( ( fn, keys ) => (
    ( !keys || ~keys.indexOf( which ) ) && fn.call( _focusedInstance, event )
  ));
}

/**
 * _bindKeys
 *
 * @access private
 */
function _bindKeys() {
  if ( !_keysBound ) {
    document.addEventListener( 'keydown', _handleKeyDown );
    _keysBound = true;
  }
}

/**
 * _unbindKeys
 *
 * @access private
 */
function _unbindKeys() {
  if ( _keysBound ) {
    document.removeEventListener( 'keydown', _handleKeyDown );
    _keysBound = false;
  }
}

/**
 * _bindClicks
 *
 * @access private
 */
function _bindClicks() {
  if ( !_clicksBound ) {
    document.addEventListener( 'click', _handleClick );
    _clicksBound = true;
  }
}

/**
 * _unbindClicks
 *
 * @access private
 */
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

/**
 * getBinding
 *
 * @access public
 * @param {object} target Class used as key in dict of bindings and instances
 * @return {object} The object containing bindings and instances for the given class
 */
function getBinding( target ) {
  return _handlers.get( target );
}

/**
 * setBinding
 *
 * @access public
 * @param {object} args All arguments necessary to set the binding
 * @param {array} args.keys Key codes that should trigger the fn
 * @param {function} args.fn The callback to be triggered when given keys are pressed
 * @param {object} args.target The decorated class
 */
function setBinding( { keys, fn, target } ) {
  let handler = getBinding( target );
  if ( !handler ) {
    handler = _handlers.set( target, { bindings: new Map(), instances: new Set() } ).get( target );
  }
  handler.bindings.set( keys, fn );
}

/**
 * onMount
 *
 * @access public
 */
function onMount( instance ) {
  _bindClicks();
  _addInstance( instance );
  // have to bump this to next event loop because component mounting routinely
  // preceeds the dom click event that triggered the mount (wtf?)
  setTimeout(() => _focus( instance ), 0);
}

/**
 * onUnmount
 *
 * @access public
 */
function onUnmount( instance ) {
  _deleteInstance( instance );
  _unbindClicks();
  if ( _focusedInstance === instance ) _focus( null );
}

export { setBinding, getBinding, onMount, onUnmount };
