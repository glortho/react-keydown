import React from 'react';
import ReactDOM from 'react-dom';

const code = 
`<code>import React from &#x27;react&#x27;;
import keydown, { Keys } from &#x27;react-keydown&#x27;;

class MethodDecoratorExample extends React.Component {
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
      &#x3C;div&#x3E;
        &#x3C;h3&#x3E;Method Decorator Example&#x3C;/h3&#x3E;
        &#x3C;div&#x3E;Press the &#x3C;strong&#x3E;enter&#x3C;/strong&#x3E; key to toggle hello.&#x3C;/div&#x3E;
        { this.state.hello &#x26;&#x26;
          &#x3C;h1&#x3E;Enter is key code {Keys.enter}!&#x3C;/h1&#x3E;
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
    const node = ReactDOM.findDOMNode( this );
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

