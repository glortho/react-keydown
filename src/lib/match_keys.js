import { modifiers as modifierKeys } from './keys';

const modKeys = Object.keys( modifierKeys );

function matchKeys( { keySet, event } ) {
  if ( keySet ) {
    const { key, modifiers } = keySet;
    let keysMatch = false;
    if ( key === event.which ) {
      const eventModifiers = modKeys.filter( modKey => event[ `${modKey}Key` ] );
      keysMatch = ( !eventModifiers.length && !modifiers ) || ( 
       modifiers && eventModifiers.length && eventModifiers.every( modKey => ~modifiers.indexOf( modKey ) )
      );
    }
    return keysMatch;
  }
  return true;
}

export default matchKeys;
