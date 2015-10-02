import React from 'react';

function componentWrapper( WrappedComponent, KEYS = null ) {

  return class KeyBoardHelper extends React.Component {

    constructor( props ) {
      super( props );
      this.state = {
        event: null
      };
      this.handleClick   = this.handleClick.bind( this );
      this.handleKeyDown = this.handleKeyDown.bind( this );
    }

    componentDidMount() {
      document.addEventListener( 'keydown', this.handleKeyDown );
      document.addEventListener( 'click', this.handleClick );
      this._node = React.findDOMNode( this );
      this._hasFocus = true;
    }

    componentWillUnmount() {
      document.removeEventListener( 'keydown', this.handleKeyDown );
      document.removeEventListener( 'click', this.handleClick );
      this._node = null;
      this._hasFocus = false;
    }

    handleClick( { target } ) {
      this._hasFocus = target === this._node || this._node.contains( target );
    }

    handleKeyDown( event ) {
      if ( this._hasFocus && ( !KEYS || ~KEYS.indexOf( event.which ) ) ) {
        this.setState( { event }, () => this.setState( { event: null } ) );
      }
    }

    render() {
      return (
        <WrappedComponent 
          {...this.props} 
          keydown = {this.state}
        />
      );
    }
  };
}

function keyboardDecorator( ...args ) {
  const testArg = args[0];
  const isArray = Array.isArray( testArg );
  if ( isArray || parseInt( testArg, 10 ) ) {
    const keysArg = isArray ? testArg : args;
    return component => componentWrapper( component, keysArg );
  } else {
    return componentWrapper( ...args );
  }
}

export default keyboardDecorator;
