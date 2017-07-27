/**
 * @module domHelpers
 *
 */
import ReactDOM from 'react-dom';

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
    const node = ReactDOM.findDOMNode( instance );
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
        Array.prototype.slice.call( focusables ).forEach( element => (
          element.onfocus = onFocus( element )
        ) );
      }
    }
  }
}

/**
 * findContainerNodes: Called by our click handler to find instances with nodes
 * that are equal to or that contain the click target. Any that pass this test
 * will be recipients of the next keydown event.
 *
 * @access public
 * @param {object} target The click event.target DOM element
 * @return {function} Reducer function
 */
function findContainerNodes( target ) {
  return ( memo, instance ) => {
    try {
      const node = ReactDOM.findDOMNode( instance );
      if ( node && ( node === target || node.contains( target ) ) ) {
        memo.push( { instance, node } );
      }
    } finally {
      return memo;
    }
  };
}

/**
 * sortByDOMPosition: Called by our click handler to sort a list of instances
 * according to least -> most nested. This is so that if multiple keybound
 * instances have nodes that are ancestors of the click target, they will be
 * sorted to let the instance closest to the click target get first dibs on the
 * next key down event.
 */
function sortByDOMPosition( a, b ) {
  return a.node.compareDocumentPosition( b.node ) === 10 ? 1 : -1;
}

export default { bindFocusables, findContainerNodes, sortByDOMPosition };
