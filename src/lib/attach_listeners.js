/**
 * @module attachListeners
 *
 */

// flag for whether click listener has been bound to document
let _clicksBound = false;

// flag for whether keydown listener has been bound to document
let _keysBound = false;

/**
 * _bindKeys
 *
 * @access private
 */
function _bindKeys( callback ) {
  if ( !_keysBound ) {
    document.addEventListener( 'keydown', callback );
    _keysBound = true;
  }
}

/**
 * _unbindKeys
 *
 * @access private
 */
function _unbindKeys( callback ) {
  if ( _keysBound ) {
    document.removeEventListener( 'keydown', callback );
    _keysBound = false;
  }
}

/**
 * _bindClicks
 *
 * @access private
 */
function _bindClicks( callback ) {
  if ( !_clicksBound ) {
    document.addEventListener( 'click', callback );
    _clicksBound = true;
  }
}

/**
 * _unbindClicks
 *
 * @access private
 */
function _unbindClicks( callback ) {
  if ( _clicksBound ) {
    document.removeEventListener( 'click', callback );
    _clicksBound = false;
  }
}


export default function attachListeners( { onClick, onKeyDown } ) {
  const result = {};
  if ( onClick ) {
    result.bindClicks = () => _bindClicks( onClick );
    result.unbindClicks = () => _unbindClicks( onClick );
  }
  if ( onKeyDown ) {
    result.bindKeys = () => _bindKeys( onKeyDown );
    result.unbindKeys = () => _unbindKeys( onKeyDown );
  }
  return result;
}
