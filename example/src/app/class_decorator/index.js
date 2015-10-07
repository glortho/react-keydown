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
      <div style={{width: '250px', padding: '20px', backgroundColor: 'rgba(0, 132, 255, 0.42)'}}>
        <h3>Class Decorator Example</h3>
        Last key code pressed: <strong>{this.state.key}</strong>
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

