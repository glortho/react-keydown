import React from 'react';

import ClassDecorator from './class_decorator/';
import ClassDecoratorCode from './class_decorator/code';
import MethodDecorator from './method_decorator/';
import MethodDecoratorCode from './method_decorator/code';

class Index extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      showCode: false,
      example: 'class'
    };
    this.getStyle = this.getStyle.bind( this );
  }

  selectExample( label ) {
    this.setState( { example: label, showCode: false } );
  }

  showCode( label ) {
    this.setState( ( { showCode } ) => {
      let value = null;
      if ( showCode !== label ) value = label;
      return { showCode: value };
    });
  }

  getStyle( match ) {
    const style = {
      backgroundColor: 'white',
      color: '#0084FF'
    };
    if ( this.state.example === match ) {
      style.backgroundColor = 'rgba(0, 132, 255, 0.42)';
      style.color = 'black';
    }
    return style;
  }

  render() {
    return (
      <div>
        <div><h2>react-keydown Examples</h2></div>
        <div>
          <div style={{marginTop: '0px', float: 'left'}}>
            <a style={this.getStyle( 'class' )} onClick={() => this.selectExample( 'class' )}>Class Decorator</a>
            <a style={this.getStyle( 'method' )} onClick={() => this.selectExample( 'method' )}>Method Decorator</a>
          </div>
          <div style={{height: '100%', borderLeft: '1px #ccc solid', marginLeft: '150px', paddingLeft: '20px'}}>
            { this.state.example === 'class' &&
              <ClassDecorator />
            }
            { this.state.example === 'method' &&
              <MethodDecorator />
            }
            <button onClick={() => this.showCode( this.state.example )}>Toggle Code</button>
            { this.state.showCode === 'class' &&
              <ClassDecoratorCode />
            }
            { this.state.showCode === 'method' &&
              <MethodDecoratorCode />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
