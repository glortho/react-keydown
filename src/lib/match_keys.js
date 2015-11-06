import { modifiers as modifierKeys } from './keys';

const modKeys = Object.keys( modifierKeys );

function matchKeys( { keySet: { key, modifiers = [] }, event } ) {
  let keysMatch = false;
  if ( key === event.which ) {
    const evtModKeys = modKeys.filter( modKey => event[ `${modKey}Key` ] ).sort();
    keysMatch = (
      modifiers.length === evtModKeys.length && 
      modifiers.every( ( modKey, index ) => evtModKeys[ index ] === modKey )
    );
  }
  return keysMatch;
}

export default matchKeys;
