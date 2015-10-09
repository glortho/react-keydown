import React from 'react';

import { setBinding, onMount, onUnmount } from './listeners';

function componentWrapper( WrappedComponent, keys = null ) {

  class KeyBoardHelper extends React.Component {

    constructor( props ) {
      super( props );
      this.state = {
        event: null
      };
    }

    componentDidMount() {
      onMount.call( this );
    }

    componentWillUnmount() {
      onUnmount.call( this );
    }

    handleKeyDown( event ) {
      this.setState( { event }, () => this.setState( { event: null } ) );
    }

    render() {
      return <WrappedComponent {...this.props} keydown={this.state} />;
    }
  }

  setBinding( { keys, fn: KeyBoardHelper.prototype.handleKeyDown, target: KeyBoardHelper.prototype } );

  return KeyBoardHelper;
}

export default componentWrapper;
