import React from 'react';
import keydown from '../../../../src/';

@keydown
class MyComponent extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      key: 'n/a'
    };
  }

  componentWillReceiveProps( { keydown: { event } } ) {
    if ( event ) {
      this.setState( { key: event.which } );
    }
  }

  render() {
    return (
      <div style={{verticalAlign: 'top', margin: '1em 3em 0em 0em', textAlign: 'left', display: 'inline-block',  padding: '2em', backgroundColor: 'rgba(0, 132, 255, 0.32)'}}>
        <div style={{margin: '0em', paddingBottom: '0.4em', fontSize: '1.4em'}}>Class Decorator Example</div>
        <div style={{padding: '8px 5px', border: 'rgba(0, 146, 255, 0.54) solid', borderLeftStyle: 'none', borderRightStyle: 'none'}}>Last key code pressed: <strong>{this.state.key}</strong></div>
        <ol>
          <li>Push one or more keys on the keyboard.</li>
          <li>Click outside the box and push a key.</li>
          <li>Click back inside it and push a key.</li>
        </ol>
      </div>
    );
  }
}

export default MyComponent;

