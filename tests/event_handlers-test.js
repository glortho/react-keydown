import test from 'tape';

import * as Store from '../src/store';

let msg;

function withFakeDocument( fn ) {
  const originalDocument = global.document;
  global.document = {
    listeners: {},
    addEventListener( type, callback ) {
      this.listeners[ type ] = this.listeners[ type ] || [];
      this.listeners[ type ].push( callback );
    },
    removeEventListener( type, callback ) {
      if ( this.listeners[ type ] ) {
        this.listeners[ type ] = this.listeners[ type ].filter( cb => cb !== callback );
      }
    },
    querySelectorAll: () => []
  };
  try {
    fn( global.document );
  } finally {
    global.document = originalDocument;
  }
}

test( 'eventHandlers - shouldConsider', t => {
  const { _shouldConsider } = require( '../src/event_handlers' );

  msg = 'considers event if ctrlKey is truthy';
  t.ok( _shouldConsider({ ctrlKey: true }), msg );

  msg = 'ignores event if target is input';
  t.notOk( _shouldConsider({ target: { tagName: 'INPUT' } }), msg );

  msg = 'ignores event if target is select box';
  t.notOk( _shouldConsider({ target: { tagName: 'SELECT' } }), msg );

  msg = 'ignores event if target is textarea';
  t.notOk( _shouldConsider({ target: { tagName: 'TEXTAREA' } }), msg );

  msg = 'ignores event if target has textbox role';
  t.notOk( _shouldConsider({ target: { getAttribute: attr => attr === 'role' ? 'textbox' : null } }), msg );

  msg = 'considers event if ctrlKey is truthy, even if other ignored keys are present';
  t.ok( _shouldConsider({ ctrlKey: true, target: { tagName: 'INPUT' } }), msg );

  t.end();
});

test( 'eventHandlers - _onKeyDown', t => {
  const { _onKeyDown } = require( '../src/event_handlers' );

  Store._resetStore();

  const fixtureClass = class Foo { bar() {} };
  const fixtureInstance = new fixtureClass();
  const fn = fixtureClass.prototype.bar;
  let calledWith = null;
  fixtureClass.prototype.bar = function( event ) { calledWith = event; };

  Store.setBinding( { keys: [ 1 ], fn: fixtureClass.prototype.bar, target: fixtureClass.prototype } );
  Store.activate( fixtureInstance );

  const matchingEvent = { which: 1, target: {} };

  msg = 'invokes the bound fn and returns true when a binding matches';
  const handled = _onKeyDown( matchingEvent );
  t.equal( handled, true, msg );
  t.equal( calledWith, matchingEvent, msg );

  msg = 'returns false and does not invoke fn when shouldConsider is false and forceConsider is not set';
  calledWith = null;
  const ignoredEvent = { which: 1, target: { tagName: 'INPUT' } };
  const result = _onKeyDown( ignoredEvent );
  t.equal( result, false, msg );
  t.equal( calledWith, null, msg );

  msg = 'invokes fn despite shouldConsider being false when forceConsider is true';
  const forcedEvent = { which: 1, target: { tagName: 'INPUT' } };
  const forcedResult = _onKeyDown( forcedEvent, true );
  t.equal( forcedResult, true, msg );
  t.equal( calledWith, forcedEvent, msg );

  msg = 'returns false when no binding matches the event';
  Store._resetStore();
  const noMatchResult = _onKeyDown( { which: 999, ctrlKey: true } );
  t.equal( noMatchResult, false, msg );

  Store._resetStore();
  t.end();
});

test( 'eventHandlers - _onClick', t => {
  withFakeDocument( () => {
    const { _onClick } = require( '../src/event_handlers' );

    Store._resetStore();

    const target = { nodeType: 1 };
    const containingInstance = { nodeType: 1, contains: node => node === target };
    const unrelatedInstance = { nodeType: 1, contains: () => false };

    Store.activate( [ containingInstance, unrelatedInstance ] );

    msg = 'reactivates (moves to most-recent) only the instance whose DOM node contains the click target';
    _onClick( { target } );
    const instances = [ ...Store.getInstances() ];
    t.equal( instances[ instances.length - 1 ], containingInstance, msg );
    t.notEqual( instances[ instances.length - 1 ], unrelatedInstance, msg );

    msg = 'caps the store with null when no instance node contains the click target';
    Store._resetStore();
    Store.activate( [ unrelatedInstance ] );
    _onClick( { target } );
    t.ok( Store.getInstances().has( null ), msg );

    Store._resetStore();
  } );

  t.end();
});

test( 'eventHandlers - onMount/onUnmount', t => {
  withFakeDocument( doc => {
    const { onMount, onUnmount } = require( '../src/event_handlers' );

    Store._resetStore();

    const instance = { nodeType: 1 };

    msg = 'onMount activates the instance';
    onMount( instance );
    t.ok( Store.getInstances().has( instance ), msg );

    msg = 'onMount binds keydown and click listeners to the document';
    t.equal( ( doc.listeners.keydown || [] ).length, 1, msg );
    t.equal( ( doc.listeners.click || [] ).length, 1, msg );

    msg = 'onUnmount removes the instance from the store';
    onUnmount( instance );
    t.notOk( Store.getInstances().has( instance ), msg );

    msg = 'onUnmount unbinds listeners once store is empty';
    t.equal( ( doc.listeners.keydown || [] ).length, 0, msg );
    t.equal( ( doc.listeners.click || [] ).length, 0, msg );

    Store._resetStore();
  } );

  t.end();
});
