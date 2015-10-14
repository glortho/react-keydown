/* eslint-disable no-use-before-define */
/**
 * @module eventHandlers
 *
 */
import domHelpers      from './lib/dom_helpers';
import attachListeners from './lib/attach_listeners';
import store           from './store';

/**
 * private
 * 
 */

/**
 * onClick
 *
 * @access private
 * @param {object} event The click event object
 * @param {object} event.target The DOM node from the click event
 */
const { bindClicks, unbindClicks } = attachListeners({
  onClick( { target } ) {
    store.activate(
      [ ...store.getInstances() ]
        .reduce( domHelpers.findContainerNodes( target ), [] )
        .sort( domHelpers.sortByDOMPosition )
        .map( item => item.instance )
    );
  }
});

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
function _shouldConsider( { ctrlKey, target: { tagName } } ) {
  return !~[ 'INPUT', 'SELECT', 'TEXTAREA' ].indexOf( tagName ) || ctrlKey;
}

/**
 * onKeyDown: The keydown event callback
 *
 * @access private
 * @param {object} event The keydown event object
 * @param {number} event.which The key code (which) received from the keydown event
 */
const { bindKeys, unbindKeys } = attachListeners({
  onKeyDown( event ) {
    if ( _shouldConsider( event ) ) {
      const { fn, instance } = store.findBindingForEvent( event ) || {};
      if ( fn ) {
        fn.call( instance, event );
        return true;
      }
    }
    return false;
  }
});

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
  // have to bump this to next event loop because component mounting routinely
  // preceeds the dom click event that triggered the mount (wtf?)
  setTimeout(() => store.activate( instance ), 0);
  bindKeys();
  bindClicks();
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
    unbindClicks();
    unbindKeys();
  }
}

export { onMount, onUnmount };

