import { modifiers as modifierKeys } from './keys';

const modKeys = Object.keys( modifierKeys );

function matchKeys( { keySet: { key, modifiers }, event } ) {
  let keysMatch = false;
  if ( key === event.which ) {
    const eventModifiers = modKeys.filter( modKey => event[ `${modKey}Key` ] );
    keysMatch = ( !eventModifiers.length && !modifiers ) || ( 
     modifiers && eventModifiers.length && eventModifiers.every( modKey => ~modifiers.indexOf( modKey ) )
    );
  }
  return keysMatch;
}

export default matchKeys;
