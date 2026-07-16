import test from 'tape';

import Listeners from '../src/lib/listeners';

let msg;

function fakeDocument() {
  const calls = { add: [], remove: [] };
  return {
    calls,
    addEventListener( type, callback, capture ) {
      calls.add.push( { type, callback, capture } );
    },
    removeEventListener( type, callback, capture ) {
      calls.remove.push( { type, callback, capture } );
    }
  };
}

test( 'listeners - bindKeys/unbindKeys', t => {
  const originalDocument = global.document;
  const doc = fakeDocument();
  global.document = doc;

  const callback = () => {};

  msg = 'binds a keydown listener to the document';
  Listeners.bindKeys( callback );
  t.equal( doc.calls.add.length, 1, msg );
  t.equal( doc.calls.add[ 0 ].type, 'keydown', msg );
  t.equal( doc.calls.add[ 0 ].callback, callback, msg );

  msg = 'does not bind a second keydown listener while already bound';
  Listeners.bindKeys( () => {} );
  t.equal( doc.calls.add.length, 1, msg );

  msg = 'unbinds the keydown listener from the document';
  Listeners.unbindKeys( callback );
  t.equal( doc.calls.remove.length, 1, msg );
  t.equal( doc.calls.remove[ 0 ].type, 'keydown', msg );

  msg = 'does not unbind again once already unbound';
  Listeners.unbindKeys( callback );
  t.equal( doc.calls.remove.length, 1, msg );

  msg = 'can bind again after unbinding';
  Listeners.bindKeys( callback );
  t.equal( doc.calls.add.length, 2, msg );

  Listeners.unbindKeys( callback );
  global.document = originalDocument;
  t.end();
});

test( 'listeners - bindClicks/unbindClicks', t => {
  const originalDocument = global.document;
  const doc = fakeDocument();
  global.document = doc;

  const callback = () => {};

  msg = 'binds a capturing click listener to the document';
  Listeners.bindClicks( callback );
  t.equal( doc.calls.add.length, 1, msg );
  t.equal( doc.calls.add[ 0 ].type, 'click', msg );
  t.equal( doc.calls.add[ 0 ].capture, true, msg );

  msg = 'does not bind a second click listener while already bound';
  Listeners.bindClicks( () => {} );
  t.equal( doc.calls.add.length, 1, msg );

  msg = 'unbinds the click listener from the document';
  Listeners.unbindClicks( callback );
  t.equal( doc.calls.remove.length, 1, msg );
  t.equal( doc.calls.remove[ 0 ].type, 'click', msg );
  t.equal( doc.calls.remove[ 0 ].capture, true, msg );

  msg = 'does not unbind again once already unbound';
  Listeners.unbindClicks( callback );
  t.equal( doc.calls.remove.length, 1, msg );

  global.document = originalDocument;
  t.end();
});
