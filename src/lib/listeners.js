/**
 * @module Listeners
 *
 */

// flag for whether click listener has been bound to document
let _clicksBound = false;

// flag for whether keydown listener has been bound to document
let _keysBound = false;

const Listeners = {
  /**
   * _bindKeys
   *
   * @access public
   */
  bindKeys( callback ) {
    if ( !_keysBound ) {
      document.addEventListener( 'keydown', callback );
      _keysBound = true;
    }
  },

  /**
   * unbindKeys
   *
   * @access public
   */
  unbindKeys( callback ) {
    if ( _keysBound ) {
      document.removeEventListener( 'keydown', callback );
      _keysBound = false;
    }
  },

  /**
   * bindClicks
   *
   * @access public
   */
  bindClicks( callback ) {
    if ( !_clicksBound ) {
      document.addEventListener( 'click', callback, true );
      _clicksBound = true;
    }
  },

  /**
   * unbindClicks
   *
   * @access public
   */
  unbindClicks( callback ) {
    if ( _clicksBound ) {
      document.removeEventListener( 'click', callback, true );
      _clicksBound = false;
    }
  }
};

export default Listeners;
