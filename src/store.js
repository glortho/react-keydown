/**
 * @module store
 *
 */
import matchKeys   from './lib/match_keys';
import parseKeys   from './lib/parse_keys';
import uuid        from './lib/uuid';

/**
 * private
 *
 */

// dict for class prototypes => bindings
const _handlers = new Map();

// all mounted instances that have keybindings
const _instances = new Set();

// for testing
export function _resetStore() {
  _handlers.clear();
  _instances.clear();
}


/**
 * public
 *
 */

const Store = {

  /**
   * activate
   *
   * @access public
   * @param {object} instance Instantiated class that extended React.Component, to be focused to receive keydown events
   */
  activate( instances ) {
    const instancesArray = [].concat( instances );

    // if no components were found as ancestors of the event target,
    // effectively deactivate keydown handling by capping the set of instances
    // with `null`.
    if ( !instancesArray.length ) {
      _instances.add( null );
    } else {
      _instances.delete( null );

      // deleting and then adding the instance(s) has the effect of sorting the set
      // according to instance activation (ascending)
      instancesArray.forEach( instance => {
        _instances.delete( instance );
        _instances.add( instance );
      });
    }
  },

  /**
   * deleteInstance
   *
   * @access public
   * @param {object} target Instantiated class that extended React.Component
   * @return {boolean} The value set.has( target ) would have returned prior to deletion
   */
  deleteInstance( target ) {
    _instances.delete( target );
  },

  findBindingForEvent( event ) {
    const keyMatchesEvent = keySet => matchKeys( { keySet, event } );
    const hasNull = _instances.has(null);

    // loop through instances in reverse activation order so that most
    // recently activated instance gets first dibs on event
    for ( const instance of [ ..._instances ].reverse() ) {
      if (!instance) {
        continue;
      }
      const bindings = this.getBinding( instance.constructor.prototype );
      for ( const [ keySets, binding ] of bindings ) {
        if (binding.options.global || !hasNull) {
          if ( keySets.some( keyMatchesEvent ) ) {
            // return when matching keybinding is found - i.e. only one
            // keybound component can respond to a given key code. to get around this,
            // scope a common ancestor component class with @keydown and use
            // @keydownScoped to bind the duplicate keys in your child components
            // (or just inspect nextProps.keydown.event).
            return {
              fn: binding.fn,
              instance
            };
          }
        }
      }
    }
    return null;
  },

  /**
   * getBinding
   *
   * @access public
   * @param {object} target Class used as key in dict of key bindings
   * @return {object} The object containing bindings for the given class
   */
  getBinding( { __reactKeydownUUID } ) {
    return _handlers.get( __reactKeydownUUID );
  },

  /**
   * getInstances
   *
   * @access public
   * @return {set} All stored instances (all mounted component instances with keybindings)
   */
  getInstances() {
    return _instances;
  },

  /**
   * isEmpty
   *
   * @access public
   * @return {number} Size of the set of all stored instances
   */
  isEmpty() {
    return !_instances.size;
  },

  /**
   * setBinding
   *
   * @access public
   * @param {object} args All arguments necessary to set the binding
   * @param {array} args.keys Key codes that should trigger the fn
   * @param {function} args.fn The callback to be triggered when given keys are pressed
   * @param {object} args.target The decorated class
   */
  setBinding( { keys, fn, target, options } ) {
    const keySets = parseKeys( keys );

    const { __reactKeydownUUID } = target;
    const binding = { fn, options };
    if ( !__reactKeydownUUID ) {
      target.__reactKeydownUUID = uuid();
      _handlers.set( target.__reactKeydownUUID, new Map( [ [ keySets, binding ] ] ) );
    } else {
      _handlers.get( __reactKeydownUUID ).set( keySets, binding );
    }
  }
};

export default Store;
