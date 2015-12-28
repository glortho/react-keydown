import React from 'react';
import ReactDOM from 'react-dom';

const code = 
`<code>
import React from &#x27;react&#x27;;
import keydown from &#x27;react-keydown&#x27;;

@keydown
class MyComponent extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      key: &#x27;n/a&#x27;
    };
  }

  componentWillReceiveProps( nextProps ) {
    const { keydown: { event } } = nextProps;
    if ( event ) {
      this.setState( { key: event.which } );
    }
  }

  render() {
    return (
      &#x3C;div&#x3E;
        &#x3C;h3&#x3E;Class Decorator Example&#x3C;/h3&#x3E;
        Last key code pressed: &#x3C;strong&#x3E;{this.state.key}&#x3C;/strong&#x3E;
        &#x3C;ol&#x3E;
          &#x3C;li&#x3E;Push one or more keys on the keyboard.&#x3C;/li&#x3E;
          &#x3C;li&#x3E;Click outside the box and push a key.&#x3C;/li&#x3E;
          &#x3C;li&#x3E;Click back inside it and push a key.&#x3C;/li&#x3E;
        &#x3C;/ol&#x3E;
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
