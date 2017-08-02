import { modifiers as modifierKeys, ALL_KEYS } from './keys';

const modKeys = Object.keys( modifierKeys );

function matchKeys( { keySet, event } ) {
  const { key, modifiers = [] } = keySet;
  let keysMatch = key === ALL_KEYS;
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
