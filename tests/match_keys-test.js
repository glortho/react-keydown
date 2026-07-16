import test from 'tape';

import eventFixture from './fixtures/event';
import matchKeys    from '../src/lib/match_keys';
import { ALL_KEYS, ALL_PRINTABLE_KEYS } from '../src/lib/keys';

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

  msg = 'returns true when key is ALL_KEYS regardless of which key was pressed';
  keySet = { key: ALL_KEYS };
  event = { ...eventFixture, which: 999 };
  t.ok( matchKeys( { keySet, event } ), msg );

  msg = 'returns true for ALL_PRINTABLE_KEYS when event.key is a single printable character';
  keySet = { key: ALL_PRINTABLE_KEYS };
  event = { ...eventFixture, key: 'a' };
  t.ok( matchKeys( { keySet, event } ), msg );

  msg = 'returns false for ALL_PRINTABLE_KEYS when event.key is a named (non-printable) key';
  keySet = { key: ALL_PRINTABLE_KEYS };
  event = { ...eventFixture, key: 'Backspace' };
  t.notOk( matchKeys( { keySet, event } ), msg );

  msg = 'returns true for ALL_PRINTABLE_KEYS via charCode fallback when event.key is unsupported';
  keySet = { key: ALL_PRINTABLE_KEYS };
  event = { ...eventFixture, key: undefined, charCode: 'a'.charCodeAt( 0 ) };
  t.ok( matchKeys( { keySet, event } ), msg );

  msg = 'returns false for ALL_PRINTABLE_KEYS via charCode fallback when charCode is non-printable';
  keySet = { key: ALL_PRINTABLE_KEYS };
  event = { ...eventFixture, key: undefined, charCode: 0 };
  t.notOk( matchKeys( { keySet, event } ), msg );

  t.end();
});
