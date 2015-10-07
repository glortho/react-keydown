import classWrapper        from './lib/class_decorator';
import methodWrapper       from './lib/method_decorator';
import methodWrapperScoped from './lib/method_decorator_scoped';
import Keys                from './lib/keys';

function keyboardDecorator( methodFn, ...args ) {
  const testArg = args[0];
  const isArray = Array.isArray( testArg );
  if ( isArray || parseInt( testArg, 10 ) ) {
    const keys = isArray ? testArg : args;
    return ( target, methodName, descriptor ) => {
      return methodName ?
        methodFn( { target, descriptor, keys } ) :
        classWrapper( target, keys );
    };
  } else {
    return classWrapper( ...args );
  }
}

function keydownScoped( ...args ) {
  return keyboardDecorator( methodWrapperScoped, ...args );
}

function keydown( ...args ) {
  return keyboardDecorator( methodWrapper, ...args );
}

export default keydown;

export { Keys, keydownScoped };
