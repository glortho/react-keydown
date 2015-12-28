import React from 'react';

import ClassDecorator from './class_decorator/';
import ClassDecoratorCode from './class_decorator/code';
import MethodDecorator from './method_decorator/';
import MethodDecoratorCode from './method_decorator/code';

class Index extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      example: 'class'
    };
    this.getStyle = this.getStyle.bind( this );
  }

  selectExample( label ) {
    this.setState( { example: label } );
  }

  getStyle( match ) {
    const style = {
      backgroundColor: 'white',
      color:           '#0084FF',
      padding:         '0.6em',
      fontSize:        '1.1em',
      margin:          '1em'
    };
    if ( this.state.example === match ) {
      style.backgroundColor = 'rgba(0, 132, 255, 0.32)';
      style.color = 'black';
    }
    return style;
  }

  render() {
    return (
      <div>
        <div style={{textAlign: 'center', padding: '0.8em 0.4em', fontSize: '2em'}}>React Keydown Examples</div>
        <div>
          <div style={{marginTop: '0px', textAlign: 'center'}}>
            <a style={this.getStyle( 'class' )} onClick={() => this.selectExample( 'class' )}>Class Decorator</a>
            <a style={this.getStyle( 'method' )} onClick={() => this.selectExample( 'method' )}>Method Decorator</a>
          </div>
          <div style={{marginTop: '1.7em', textAlign: 'center'}}>
            { this.state.example === 'class' && [
              <ClassDecorator key="class-decorator" />,
              <div key="class-decorator-code" style={{display: 'inline-block'}}><ClassDecoratorCode /></div>
            ]}
            { this.state.example === 'method' && [
              <MethodDecorator key="method-decorator" />,
              <div key="method-decorator-code" style={{display: 'inline-block'}}><MethodDecoratorCode /></div>
            ]}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
