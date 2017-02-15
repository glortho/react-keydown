// TODO: Need better, more complete, and more methodical key definitions

const Keys = {
  backspace: 8,
  del:       46,
  delete:    46,
  tab:       9,
  enter:     13,
  'return':  13,
  esc:       27,
  space:     32,
  left:      37,
  up:        38,
  right:     39,
  down:      40,
  ';':       186,
  '=':       187,
  ',':       188,
  '-':       189,
  '.':       190,
  '/':       191,
  '`':       192,
  '[':       219,
  '\\':      220,
  ']':       221
};

// Add uppercase versions of keys above for backwards compatibility
Object.keys( Keys ).forEach( key => Keys[ key.toUpperCase() ] = Keys[ key ] );

'0123456789'.split( '' ).forEach( ( num, index ) => Keys[ num ] = index + 48 );

'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split( '' ).forEach( ( letter, index ) => {
  Keys[letter] = index + 65;
  Keys[letter.toLowerCase()] = index + 65;
});

// fn keys
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach( ( item, index ) => Keys[ `f${ index }` ] = 111 + index );

export const modifiers = {
  control: 'ctrl',
  ctrl:    'ctrl',
  shift:   'shift',
  meta:    'meta',
  cmd:     'meta',
  command: 'meta',
  option:  'alt',
  alt:     'alt'
};

export function allKeys( arg ) {
  return arg ? (arg.constructor === Symbol || typeof arg === 'symbol') : Symbol( 'allKeys' );
}

export default Keys;
