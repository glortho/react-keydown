import test from 'tape';

import eventFixture from './fixtures/event';
import Keys, { allKeys } from '../src/lib/keys';
import Store, { _resetStore } from '../src/store';

const bindingFixture = { keys: [], fn: () => {}, target: {} };
let msg;

test( 'Store - activate', t => {
  _resetStore();

  const fixture = {};

  msg = 'instances initially empty';
  t.ok( Store.isEmpty(), msg );

  msg = 'instances size matches after activate';
  Store.activate( fixture );
  t.equal( Store.getInstances().size, 1, msg );

  msg = 'concats array';
  Store.activate( [ {}, {} ] );
  t.equal( Store.getInstances().size, 3, msg );

  msg = 'caps instances with null when nothing passed in';
  Store.activate( [] );
  t.ok( Store.getInstances().has( null ), msg );

  msg = 'removes null next time valid args passed in';
  Store.activate( {} );
  t.notOk( Store.getInstances().has( null ), msg );

  msg = 'moves most recently activated member to end';
  Store.activate( fixture );
  const arr = [ ...Store.getInstances() ];
  t.equal( arr.indexOf( fixture ), arr.length - 1, msg );

  t.end();
});

test( 'Store - delete', t => {
  _resetStore();

  const fixture = {};

  msg = 'instance not present after activation + delete';
  Store.activate( fixture );
  Store.deleteInstance( fixture );
  t.notOk( Store.getInstances().has( fixture ), msg );

  t.end();
});

test( 'Store - setBinding', t => {
  _resetStore();

  Store.setBinding( bindingFixture );
  const binding = Store.getBinding( bindingFixture.target );

  msg = 'binding is created with target as key';
  t.ok( binding, msg );

  msg = 'binding is a map';
  t.ok( binding instanceof Map, msg );

  _resetStore();
  Store.setBinding( { ...bindingFixture, keys: [ 'a' ] } );
  const [ key, val ] = [ ...Store.getBinding( bindingFixture.target ) ][0];

  msg = 'binding map is keyed by array of user-specified keys';
  t.deepEqual( key, [ { key: Keys.a } ], msg )

  msg = 'binding map val is target fn';
  t.equal( val, bindingFixture.fn, msg );


  msg = 'binding map key is allKeys when no keys specified';
  {
    _resetStore();
    Store.setBinding( { ...bindingFixture, keys: null } );
    const [ key ] = [ ...Store.getBinding( bindingFixture.target ) ][0];
    t.ok( allKeys( key ), msg );
  }

  t.end();
});

test( 'Store - find binding for event', t => {
  let results = null;

  function setUp( { keys } ) {
    _resetStore();
    const fixtureClass = class Foo { bar() {} };
    const fixtureInstance = new fixtureClass();
    const fn = fixtureClass.prototype.bar;
    Store.setBinding( { ...bindingFixture, target: fixtureClass.prototype, keys, fn } );
    Store.activate( fixtureInstance );
    return { instance: fixtureInstance, fn };
  }

  _resetStore();

  msg = 'returns null if instances capped with null';
  Store.activate( [] );
  t.equal( Store.findBindingForEvent( eventFixture ), null, msg );

  msg = 'returns null if no match found';
  setUp( { keys: [ 1 ] } );
  t.equal( Store.findBindingForEvent( { ...eventFixture, which: 2 } ), null, msg );

  msg = 'returns instance + fn if match found';
  results = setUp( { keys: [ 1 ] } );
  t.deepEqual( Store.findBindingForEvent( { ...eventFixture, which: 1 } ), results, msg );

  msg = 'returns instance + fn if all keys matched';
  results = setUp( { keys: null } );
  t.deepEqual( Store.findBindingForEvent( { ...eventFixture, which: 'foo' } ), results, msg );

  t.end();
});
