/* eslint-disable no-use-before-define */
/**
 * @module listeners
 *
 */
import React from 'react';

import matchKeys   from './match_keys';
import parseKeys   from './parse_keys';
import { allKeys } from './keys';

/**
 * private
 * 
 */

// dict for class prototypes => bindings
const _handlers = new Map();

// all mounted instances that have keybindings
let _instances = new Set();

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
function _addInstance( instance ) {
  // have to bump this to next event loop because component mounting routinely
  // preceeds the dom click event that triggered the mount (wtf?)
  setTimeout(() => _activate( instance ), 0);
}

/**
 * _deleteInstance
 *
 * @access private
 * @param {object} target Instantiated class that extended React.Component
 * @return {boolean} The value set.has( target ) would have returned prior to deletion
 */
function _deleteInstance( target ) {
  _instances.delete( target );
  _unbindKeys();
}

/**
 * _activate
 *
 * @access private
 * @param {object} instance Instantiated class that extended React.Component, to be focused to receive keydown events
 */
function _activate( instances ) {

  // deleting and then adding the instance(s) has the effect of sorting the set
  // according to instance activation (ascending)
  [].concat( instances ).forEach( instance => {
    _instances.delete( instance );
    _instances.add( instance );
  });
  _bindKeys(); 
}

function _findContainerNodes( target ) {
  return ( memo, instance ) => {
    const node = React.findDOMNode( instance );
    if ( node === target || node.contains( target ) ) {
      memo.push( { instance, node } );
    }
    return memo;
  };
}

function _sortByDOMPosition( a, b ) {
 return a.node.compareDocumentPosition( b.node ) === 10 ? 1 : -1;
}

/**
 * _handleClick
 *
 * @access private
 * @param {object} event The click event object
 * @param {object} event.target The DOM node from the click event
 */
function _handleClick( { target } ) {
  const toActivate = 
    [ ..._instances ]
      .reduce( _findContainerNodes( target ), [] )
      .sort( _sortByDOMPosition )
      .map( item => item.instance );

  _activate( toActivate );
}


/**
 * _shouldConsider: Conditions for proceeding with key event handling
 *
 * @access private
 * @param {object} event The keydown event object
 * @param {object} event.target The node origin of the event
 * @param {string} event.target.tagName The name of the element tag
 * @param {number} event.target.which The key pressed
 * @return {boolean} Whether to continue procesing the keydown event
 */
function _shouldConsider( { target: { tagName } } ) {
  return !~[ 'INPUT', 'SELECT', 'TEXTAREA' ].indexOf( tagName );
}

/**
 * _handleKeyDown: The keydown event callback
 *
 * @access private
 * @param {object} event The keydown event object
 * @param {number} event.which The key code (which) received from the keydown event
 */
function _handleKeyDown( event ) {
  if ( _shouldConsider( event ) ) {
    const keyMatchesEvent = keySet => matchKeys( { keySet, event } );

    // loop through instances in reverse activation order so that most
    // recently activated instance gets first dibs on event
    for ( const instance of [ ..._instances ].reverse() ) {
      const bindings = getBinding( instance.constructor.prototype );
      for ( const [ keySets, fn ] of bindings ) {
        if ( allKeys( keySets ) || keySets.some( keyMatchesEvent ) ) {
          fn.call( instance, event );

          // return when matching keybinding is found and fired - i.e. only one
          // keybound component can respond to a given key code. to get around this,
          // scope a common ancestor component class with @keydown and use
          // @keydownScoped to bind the duplicate keys in your child components
          // (or just inspect nextProps.keydown.event).
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * _bindInputs: Find any focusable child elements of the component instance and
 * add an onFocus handler to focus our keydown handlers on the parent component
 * when user keys applies focus to the element.
 *
 * NOTE: One limitation of this right now is that if you tab out of the
 * component, _focusedInstance will still be set until next click or mount or
 * controlled focus.
 *
 * @access private
 * @param {object} instance The key-bound component instance
 */
function _bindInputs( instance ) {
  if ( document.querySelectorAll ) {
    const node = React.findDOMNode( instance );
    if ( node ) {
      const focusables = node.querySelectorAll( 'a[href], button, input, object, select, textarea, [tabindex]' );
      if ( focusables.length ) {
        const onFocus = element => {
          const onFocusPrev = element.onfocus;
          return function( event ) {
            _activate( instance );
            if ( onFocusPrev ) onFocusPrev.call( element, event );
          };
        };
        for ( let element of [ ...focusables ] ) {
          element.onfocus = onFocus( element );
        }
      }
    }
  }
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
  if ( _keysBound && !_instances.size ) {
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
  if ( _clicksBound && !_instances.size ) {
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
 * @param {object} target Class used as key in dict of key bindings
 * @return {object} The object containing bindings for the given class
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
  const keySets = keys ? parseKeys( keys ) : allKeys() ;
  let handler = getBinding( target );
  if ( !handler ) {
    handler = _handlers.set( target, new Map() ).get( target );
  }
  handler.set( keySets, fn );
}

/**
 * onMount
 *
 * @access public
 */
function onMount( instance ) {
  _bindClicks();
  _bindInputs( instance );
  _addInstance( instance );
}

/**
 * onUnmount
 *
 * @access public
 */
function onUnmount( instance ) {
  _deleteInstance( instance );
  _unbindClicks();
}

export { setBinding, getBinding, onMount, onUnmount };
