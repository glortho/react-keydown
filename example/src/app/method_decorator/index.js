import React from 'react';
import keydown, { Keys } from '../../../../src/';

class MethodDecorator extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      hello: false
    };
  }

  @keydown( 'enter' )
  toggleHello() {
    this.setState( { hello: !this.state.hello } );
  }

  render() {
    return (
      <div style={{verticalAlign: 'top', margin: '1em 3em 0em 0em', textAlign: 'left', display: 'inline-block',  padding: '2em', backgroundColor: 'rgba(0, 132, 255, 0.32)'}}>
        <div style={{margin: '0em', paddingBottom: '0.4em', fontSize: '1.4em'}}>Method Decorator Example</div>
        <div>Press the <strong>enter</strong> key to toggle the message.</div>
        { this.state.hello &&
          <h1>Enter is key code {Keys.enter}!</h1>
        }
        <div>And click again inside/outside box to see scoping.</div>
      </div>
    );
  }
}

export default MethodDecorator;
