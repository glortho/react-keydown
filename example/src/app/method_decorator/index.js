import React from 'react';
import keydown, { Keys } from '../../../../src/';

const { ENTER } = Keys;

class MethodDecorator extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      hello: false
    };
  }

  @keydown( ENTER )
  toggleHello() {
    this.setState( { hello: !this.state.hello } );
  }

  render() {
    return (
      <div style={{width: '250px', padding: '20px', backgroundColor: 'rgba(0, 132, 255, 0.32)'}}>
        <h3>Method Decorator Example</h3>
        <div>Press the <strong>enter</strong> key to toggle hello.</div>
        { this.state.hello &&
          <h1>Hello!</h1>
        }
        <div>And click again inside/outside box to see scoping.</div>
      </div>
    );
  }
}

export default MethodDecorator;
