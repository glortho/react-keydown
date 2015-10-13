/**
 * @module domHelpers
 *
 */
import React from 'react';

const focusableSelector = 'a[href], button, input, object, select, textarea, [tabindex]';

/**
 * bindFocusables: Find any focusable child elements of the component instance and
 * add an onFocus handler to focus our keydown handlers on the parent component
 * when user keys applies focus to the element.
 *
 * NOTE: One limitation of this right now is that if you tab out of the
 * component, _focusedInstance will still be set until next click or mount or
 * controlled focus.
 *
 * @access public
 * @param {object} instance The key-bound component instance
 * @param {callback} activateOnFocus The fn to fire when element is focused
 */
function bindFocusables( instance, activateOnFocus ) {
  if ( document.querySelectorAll ) {
    const node = React.findDOMNode( instance );
    if ( node ) {
      const focusables = node.querySelectorAll( focusableSelector );
      if ( focusables.length ) {
        const onFocus = element => {
          const onFocusPrev = element.onfocus;
          return function( event ) {
            activateOnFocus( instance );
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

function findContainerNodes( target ) {
  return ( memo, instance ) => {
    const node = React.findDOMNode( instance );
    if ( node === target || node.contains( target ) ) {
      memo.push( { instance, node } );
    }
    return memo;
  };
}


function sortByDOMPosition( a, b ) {
  return a.node.compareDocumentPosition( b.node ) === 10 ? 1 : -1;
}

export default { bindFocusables, findContainerNodes, sortByDOMPosition };
