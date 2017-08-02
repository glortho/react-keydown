import Keys, { modifiers } from './keys';

function parseKeys( keysArray ) {
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
