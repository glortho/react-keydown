import test from 'tape';

import domHelpers from '../src/lib/dom_helpers';

let msg;

test( 'domHelpers - findContainerNodes', t => {
  const target = { nodeType: 1 };

  // instance whose node contains the click target
  const containerInstance = {
    nodeType: 1,
    contains: node => node === target
  };

  // instance whose node neither is nor contains the click target
  const unrelatedInstance = {
    nodeType: 1,
    contains: () => false
  };

  msg = 'includes instance when its node is exactly the target';
  let result = [ target ].reduce( domHelpers.findContainerNodes( target ), [] );
  t.equal( result.length, 1, msg );
  t.equal( result[ 0 ].instance, target, msg );

  msg = 'includes instance when its node contains the target';
  result = [ containerInstance ].reduce( domHelpers.findContainerNodes( target ), [] );
  t.equal( result.length, 1, msg );
  t.equal( result[ 0 ].instance, containerInstance, msg );

  msg = 'excludes instance when its node neither is nor contains the target';
  result = [ unrelatedInstance ].reduce( domHelpers.findContainerNodes( target ), [] );
  t.equal( result.length, 0, msg );

  msg = 'accumulates multiple matching instances';
  result = [ containerInstance, unrelatedInstance, target ].reduce(
    domHelpers.findContainerNodes( target ), []
  );
  t.equal( result.length, 2, msg );

  msg = 'does not throw and skips instances that are neither components nor DOM nodes';
  t.doesNotThrow( () => {
    result = [ {}, 'not-a-node', null ].reduce( domHelpers.findContainerNodes( target ), [] );
  }, msg );
  t.equal( result.length, 0, msg );

  t.end();
});

test( 'domHelpers - sortByDOMPosition', t => {
  const a = { node: { compareDocumentPosition: () => 10 } };
  const b = { node: { compareDocumentPosition: () => 10 } };

  msg = 'returns 1 when a.node.compareDocumentPosition(b.node) === 10';
  t.equal( domHelpers.sortByDOMPosition( a, b ), 1, msg );

  const c = { node: { compareDocumentPosition: () => 20 } };
  const d = { node: { compareDocumentPosition: () => 20 } };

  msg = 'returns -1 when a.node.compareDocumentPosition(b.node) !== 10';
  t.equal( domHelpers.sortByDOMPosition( c, d ), -1, msg );

  t.end();
});

test( 'domHelpers - bindFocusables', t => {
  const originalDocument = global.document;
  global.document = { querySelectorAll: () => {} };

  const focusableElement = { onfocus: null };
  const node = {
    nodeType: 1,
    querySelectorAll: () => [ focusableElement ]
  };

  let activatedWith = null;
  const activateOnFocus = instance => { activatedWith = instance; };

  domHelpers.bindFocusables( node, activateOnFocus );

  msg = 'attaches an onfocus handler to focusable descendants';
  t.equal( typeof focusableElement.onfocus, 'function', msg );

  msg = 'onfocus handler calls activateOnFocus with the bound instance';
  focusableElement.onfocus( {} );
  t.equal( activatedWith, node, msg );

  msg = 'chains to any pre-existing onfocus handler';
  let prevCalled = false;
  const elementWithPrevHandler = { onfocus: () => { prevCalled = true; } };
  const nodeWithPrev = {
    nodeType: 1,
    querySelectorAll: () => [ elementWithPrevHandler ]
  };
  domHelpers.bindFocusables( nodeWithPrev, () => {} );
  elementWithPrevHandler.onfocus( {} );
  t.ok( prevCalled, msg );

  msg = 'does not throw when instance cannot be resolved to a DOM node';
  t.doesNotThrow( () => domHelpers.bindFocusables( {}, () => {} ), msg );

  msg = 'does not throw when document.querySelectorAll is unavailable';
  global.document = {};
  t.doesNotThrow( () => domHelpers.bindFocusables( node, () => {} ), msg );

  global.document = originalDocument;
  t.end();
});
