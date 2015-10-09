const Keys = {
  TAB:   9,
  ENTER: 13,
  LEFT:  37,
  UP:    38,
  RIGHT: 39,
  DOWN:  40,
  SLASH: 191
};

'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split( '' ).forEach( ( letter, index ) => Keys[letter] = index + 65 );

export default Keys;
