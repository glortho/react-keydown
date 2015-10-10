const Keys = {
  tab:   9,
  enter: 13,
  left:  37,
  up:    38,
  right: 39,
  down:  40,
  slash: 191
};

const modifiers = {
  control: 'ctrl',
  ctrl:    'ctrl',
  shift:   'shift',
  meta:    'meta',
  cmd:     'meta',
  command: 'meta',
  option:  'alt',
  alt:     'alt'
};

'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split( '' ).forEach( ( letter, index ) => {
  Keys[letter] = index + 65;
  Keys[letter.toLowerCase()] = index + 65;
});

export default Keys;

export { modifiers };
