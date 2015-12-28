import test from 'tape';

import Keys, { modifiers } from '../src/lib/keys';
import parseKeys from '../src/lib/parse_keys';

test( 'parseKeys', t => {
  let msg      = null;
  let actual   = null;
  let expected = null;
  
  msg = 'parses single key string';
  expected = [ { key: Keys.a } ];
  actual = parseKeys( [ 'a' ] );
  t.deepEqual( actual, expected, msg );

  msg = 'parses single key integer';
  expected = [ { key: 13 } ];
  actual = parseKeys( [ 13 ] );
  t.deepEqual( actual, expected, msg );

  msg = 'parses multiple key strings';
  expected = [ { key: Keys.a }, { key: Keys.b } ];
  actual = parseKeys( [ 'a', 'b' ] );
  t.deepEqual( actual, expected, msg );

  msg = 'parses key string with modifiers';
  expected = [ { key: Keys.ENTER, modifiers: [ 'ctrl', 'shift' ] } ];
  actual = parseKeys( [ 'shift+ctrl+enter' ] );
  t.deepEqual( actual, expected, msg );

  msg = 'parses key string with modifiers and spaces';
  expected = [ { key: Keys.ENTER, modifiers: [ 'ctrl', 'shift' ] } ];
  actual = parseKeys( [ 'shift +ctrl+ enter' ] );
  t.deepEqual( actual, expected, msg );

  t.end();
});
