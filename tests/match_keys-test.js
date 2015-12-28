import test from 'tape';

import eventFixture from './fixtures/event';
import matchKeys    from '../src/lib/match_keys';

const keySetFixture = { key: null }; // modifiers: null
let event, keySet, msg;

test( 'matchKeys', t => {

  msg = 'returns false when primary key does not match event key';
  keySet = { ...keySetFixture, key: 1 };
  event = { ...eventFixture, which: 2 };
  t.notOk( matchKeys( { keySet, event } ), msg );

  msg = 'returns false when event has modifier keys not in binding';
  keySet = { ...keySetFixture, key: 1 };
  event = { ...eventFixture, which: 1, ctrlKey: true };
  t.notOk( matchKeys( { keySet, event } ), msg );

  msg = 'returns false when binding has modifier keys not in event';
  keySet = { ...keySetFixture, key: 1, modifiers: [ 'ctrl' ] };
  event = { ...eventFixture, which: 1, shiftKey: true };
  t.notOk( matchKeys( { keySet, event } ), msg );

  msg = 'returns true when event modifiers match key modifiers';
  keySet = { ...keySetFixture, key: 5, modifiers: [ 'ctrl', 'shift' ] };
  event = { ...eventFixture, which: 5, shiftKey: true, ctrlKey: true };
  t.ok( matchKeys( { keySet, event } ), msg );

  t.end();
});
