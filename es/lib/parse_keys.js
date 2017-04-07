import Keys, { modifiers } from './keys';

function parseKeys(keysArray) {
  return keysArray.map(function (key) {
    var keySet = { key: key };
    if (typeof key === 'string') {
      var keyString = key.toLowerCase().trim();
      var matches = keyString.split(/\s?\+\s?/);
      keySet = matches.length === 1 ? { key: Keys[keyString] } : {
        key: Keys[matches.pop()],
        modifiers: matches.map(function (modKey) {
          return modifiers[modKey];
        }).sort()
      };
    }
    return keySet;
  });
}

export default parseKeys;