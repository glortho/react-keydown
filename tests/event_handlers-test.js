import test from 'tape';

let msg;

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
