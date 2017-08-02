import Keys, { modifiers, ALL_KEYS } from './keys';

function parseKeys( keysArray ) {
  if (!keysArray || ALL_KEYS === keysArray[0]) {
    return ALL_KEYS
  }

  return keysArray.map( key => {
    let keySet = { key };
    if ( typeof key === 'string' ) {
      const keyString = key.toLowerCase().trim();
      const matches = keyString.split( /\s?\+\s?/ );
      keySet = matches.length === 1 ?
        { key: Keys[ keyString ] } :
        {
          key: Keys[ matches.pop() ],
          modifiers: matches.map( modKey => modifiers[modKey] ).sort()
        };
    }
    return keySet;
  });
}

export default parseKeys;
