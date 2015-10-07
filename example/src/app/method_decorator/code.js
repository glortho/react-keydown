import React from 'react';

const code = 
`<code>import React from &#x27;react&#x27;;
import keydown, { Keys } from &#x27;keydown&#x27;;

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
      &#x3C;div&#x3E;
        &#x3C;h3&#x3E;Method Decorator Example&#x3C;/h3&#x3E;
        &#x3C;div&#x3E;Press the &#x3C;strong&#x3E;enter&#x3C;/strong&#x3E; key to toggle hello.&#x3C;/div&#x3E;
        { this.state.hello &#x26;&#x26;
          &#x3C;h1&#x3E;Hello!&#x3C;/h1&#x3E;
        }
        &#x3C;div&#x3E;And click again outside box to see scoping.&#x3C;/div&#x3E;
      &#x3C;/div&#x3E;
    );
  }
}</code>`;

class Code extends React.Component {
  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    const node = React.findDOMNode( this );
    node.innerHTML = code;
    Prism.highlightElement( node );
  }

  render() {
    return (
      <pre style={{width: '468px'}} className="language-jsx"></pre>
    );
  }
}

export default Code;

