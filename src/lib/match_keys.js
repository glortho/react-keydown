import { modifiers as modifierKeys, ALL_KEYS, ALL_PRINTABLE_KEYS } from './keys';

const PRINTABLE_CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()-_+=[]\\{}|;\':",./<>?£'

const modKeys = Object.keys( modifierKeys );

function matchKeys( { keySet, event } ) {
  const { key, modifiers = [] } = keySet;
  let keysMatch

  keysMatch = key === ALL_KEYS;

  if (key === ALL_PRINTABLE_KEYS) {
    if (event.key) {
      // Modern browsers implement `key`, so if `key` is length 1, we have a match. e.g. 'a' for the
      // a key, or '2' for the 2 key. All other non-printable characters have names, e.g. 'Enter' or 'Backspace'.
      keysMatch = event.key.length === 1
    } else {
      // For browsers that do no support `event.key`, we test against a list of characters
      const pressedChar = String.fromCharCode(event.charCode)
      keysMatch = PRINTABLE_CHARACTERS.indexOf(pressedChar) >= 0
    }
  }

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
