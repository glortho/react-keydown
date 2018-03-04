/* eslint-disable no-use-before-define */
/**
 * @module eventHandlers
 *
 */
import domHelpers from './lib/dom_helpers';
import listeners  from './lib/listeners';
import * as store from './store';

/**
 * private
 *
 */

/**
 * _onClick
 *
 * @access private
 * @param {object} event The click event object
 * @param {object} event.target The DOM node from the click event
 */
export function _onClick( { target } ) {
  store.activate(
    [ ...store.getInstances() ]
      .reduce( domHelpers.findContainerNodes( target ), [] )
      .sort( domHelpers.sortByDOMPosition )
      .map( item => item.instance )
  );
}

/**
 * _onKeyDown: The keydown event callback
 *
 * @access private
 * @param {object} event The keydown event object
 * @param {number} event.which The key code (which) received from the keydown event
 */
export function _onKeyDown( event, forceConsider = false ) {
  if ( forceConsider || _shouldConsider( event ) ) {
    const { fn, instance } = store.findBindingForEvent( event ) || {};
    if ( fn ) {
      fn.call( instance, event );
      return true;
    }
  }
  return false;
}

/**
 * _shouldConsider: Conditions for proceeding with key event handling
 *
 * @access private
 * @param {object} event The keydown event object
 * @param {object} event.target The node origin of the event
 * @return {boolean} Whether to continue procesing the keydown event
 */
export function _shouldConsider( { ctrlKey, target } ) {
  return (
    ctrlKey || (
      !~[ 'INPUT', 'SELECT', 'TEXTAREA' ].indexOf( target.tagName ) && (
        !target.getAttribute ||
        target.getAttribute( 'role' ) !== 'textbox'
      )
    )
  );
}

/**
 * public
 *
 */

/**
 * onMount
 *
 * @access public
 */
function onMount( instance ) {
  store.activate( instance );
  listeners.bindKeys( _onKeyDown );
  listeners.bindClicks( _onClick );
  domHelpers.bindFocusables( instance, store.activate );
}

/**
 * onUnmount
 *
 * @access public
 */
function onUnmount( instance ) {
  store.deleteInstance( instance );
  if ( store.isEmpty() ) {
    listeners.unbindClicks( _onClick );
    listeners.unbindKeys( _onKeyDown );
  }
}

export { onMount, onUnmount };
