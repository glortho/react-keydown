import classWrapper  from './lib/class_decorator';
import methodWrapper from './lib/method_decorator';

function keyboardDecorator( ...args ) {
  const testArg = args[0];
  const isArray = Array.isArray( testArg );
  if ( isArray || parseInt( testArg, 10 ) ) {
    const keys = isArray ? testArg : args;
    return ( target, methodName, descriptor ) => {
      return methodName ?
        methodWrapper( { target, descriptor, keys } ) :
        classWrapper( target, keys );
    };
  } else {
    return classWrapper( ...args );
  }
}

export default keyboardDecorator;
