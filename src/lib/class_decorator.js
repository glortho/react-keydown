import React from 'react';

import { onMount, onUnmount } from './listeners';

function componentWrapper( WrappedComponent, keys ) {
  
  return class KeyBoardHelper extends React.Component {

    constructor( props ) {
      super( props );
      this.state = {
        event: null
      };
      this.handleKeyDown = this.handleKeyDown.bind( this );
    }

    componentDidMount() {
      onMount.call( this, { keys, fn: this.handleKeyDown } );
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
  };
}

export default componentWrapper;
