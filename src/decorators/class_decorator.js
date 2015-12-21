/**
 * @module componentWrapper
 *
 */
import React from 'react';

import store from '../store';
import { onMount, onUnmount } from '../event_handlers';

/**
 * componentWrapper
 *
 * @access public
 * @param {object} WrappedComponent React component class to be wrapped
 * @param {array} [keys] The key(s) bound to the class
 * @return {object} The higher-order function that wraps the decorated class
 */
function componentWrapper( WrappedComponent, keys = null ) {

  class KeyBoardHelper extends React.Component {

    constructor( props ) {
      super( props );
      this.state = {
        event: null
      };
    }

    componentDidMount() {
      onMount( this );
    }

    componentWillUnmount() {
      onUnmount( this );
    }

    handleKeyDown( event ) {
      // to simulate a keypress, set the event and then clear it in the callback
      this.setState( { event }, () => this.setState( { event: null } ) );
    }

    render() {
      return <WrappedComponent {...this.props} keydown={this.state} />;
    }
  }

  store.setBinding( { keys, fn: KeyBoardHelper.prototype.handleKeyDown, target: KeyBoardHelper.prototype } );

  return KeyBoardHelper;
}

export default componentWrapper;
