import test from 'tape';

import Store from '../src/store';

let msg;

test( 'Store - activate', t => {
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
  const fixture = {};

  msg = 'instance not present after activation + delete';
  Store.activate( fixture );
  Store.deleteInstance( fixture );
  t.notOk( Store.getInstances().has( fixture ), msg );

  t.end();
});

test( 'Store - find binding for event', t => {

  msg = 'returns null if instances capped with null';
  Store.activate( [] );
  t.equal( Store.findBindingForEvent( {} ), null, msg );

  t.end();
});

