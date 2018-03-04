<p align="center">
  <a href="http://glortho.github.io/react-keydown/example/index.html" target="_blank"><img src="https://raw.githubusercontent.com/glortho/react-keydown/master/example/public/react-keydown-logo.png" /></a>
</p>

[![npm version](https://badge.fury.io/js/react-keydown.svg)](https://badge.fury.io/js/react-keydown)
[![dependencies](https://david-dm.org/glortho/react-keydown.svg)](https://david-dm.org/glortho/react-keydown.svg)

Use react-keydown as a higher-order component or decorator to pass keydown
events to the wrapped component, or call methods directly via designated keys. Good
for implementing keyboard navigation or other shortcuts.

Key advantages:

* **Declarative syntax**: Components say what keys they will respond to.
* **Intuitive DX**: Decorate a class or method to bind it to specified keys.
* **Scoping**: Designate the scope of your bindings by decorating/wrapping components. Only those components and their children will receive the designated key events, and then only when they appear to be active.
* **Modifier keys**: Support for standard modifier key combinations.
* **Lightweight**: 2kb compressed and gzipped, and only attaches a single keydown listener to document, no matter how many keybindings you specify.
* **Cross-browser**: Works in all browsers except IE 8 and below.

Consult the [API & Reference Documentation](https://github.com/jedverity/react-keydown/wiki/API-&-Reference) or continue reading below for quick start.

**NOTE**: react-keydown doesn't use decorators itself, but to use the `@keydown` pattern in your application you will need a transpiler like Babel and a decorator transform plugin like this: https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy.

## Install

```
npm install --save react-keydown
```

## Use

The default build of react-keydown uses the CommonJS module system. For
AMD or other support, use the [umd-specific
branch](https://github.com/jedverity/react-keydown/tree/master-umd) instead.

### For methods: Decorate with keys that should trigger method

```javascript
import React from 'react';
import keydown from 'react-keydown';

class MyComponent extends React.Component {

  @keydown( 'enter' ) // or specify `which` code directly, in this case 13
  submit( event ) {
    // do something, or not, with the keydown event, maybe event.preventDefault()
    MyApi.post( this.state );
  }
}
```

Note: Since the only context we have for keydown events is the component, decorated methods receive the event as their sole argument and the component instance as context.

#### Specify multiple keys that should trigger the method

```javascript
import keydown, { Keys } from 'react-keydown';

const { ENTER, TAB } = Keys; // optionally get key codes from Keys lib to check against later

@keydown( ENTER, TAB, 'ctrl+z' ) // could also be an array
autocomplete( event ) {
  if ( event.which === ENTER ) { ... }
  MyApi.get( this.state );
}
```

### For classes: Pass keydown events into your component

```javascript
@keydown
class MyComponent extends React.Component {
  componentWillReceiveProps( { keydown } ) {
    if ( keydown.event ) {
      // inspect the keydown event and decide what to do
      console.log( keydown.event.which );
    }
  }

  render() {
    return (
      <div>keydown events will only get passed down after this DOM node mounts or is clicked on</div>
    );
  }
}

export default MyComponent;
```

#### Monitor only key codes `which` you care about:

```javascript
const KEYS = [ 'shift+up', 'shift+down', 'enter', 'j', 'k', 'h', 'l' ];

@keydown( KEYS )
class MyComponent extends React.Component {
  ...
}
```

#### Use the `@keydownScoped` shortcut

When using the class decorator/higher-order component, decorate methods with `@keydownScoped` to identify the `keydown.event` prop as it comes in and bind certain values to methods:

```javascript
import keydown, { keydownScoped } from 'react-keydown';

@keydown( 'enter' ) // optional to specify a key here. if called with just @keydown, all key events will get passed down
class MyComponent extends React.Component {
  render() {
    return <MyOtherComponent {...this.props} />;
  }
}

class MyOtherComponent extends React.Component {
  ...
  @keydownScoped( 'enter' ) // inspects nextProps.keydown.event in componentWillReceiveProps behind the scenes
  submit() {
    // submit
  }
}
```

This is a convenience method, but also lets you specify a larger view context where this key binding should be active. Sometimes the component where the binding is declared is too small on its own.

This can also be a good way to set up app-wide shortcuts. Wrap your root component with `@keydown` and then use  `@keydownScoped` or manually inspect the `keydown.event` props in the child components where those bindings are relevant.

### Handling all keys

In some cases you might want to handle all keys on your own. For that, you can specify the following:

```
import keydown, { ALL_KEYS } from 'react-keydown'

@keydown( ALL_KEYS )
handleKeys(ev) {
  // handle keys here
}
```

### Handling all printable keys

Another useful feature is handling all printable characters.

```
import keydown, { ALL_PRINTABLE_KEYS } from 'react-keydown'

@keydown( ALL_PRINTABLE_KEYS )
beginEdit(ev) {
  // Start editing
}
```

### Caveat: Input, textarea, and select elements

By default, bindings will not work when these fields have focus, in order not to interfere with user input and shortcuts related to these controls. You can override this in two ways:

1. Give your shortcut a `ctrl` modifier.

2. Since v1.6.0, there is experimental support for adding an `onKeyDown` binding to the element, specifying a method decorated with `@keydown` as the handler. For example:

```javascript
class MyClass extends React.Component {

  @keydown( 'a' )
  myMethod( event ) {
    console.log( event ); // should log only on 'a' keystroke, whether input is focused or not
  }

  render() {
    return <input onKeyDown={ this.myMethod } />;
  }
}
```

In the second case you could make multiple inputs work this way by spreading `{ onKeyDown: this.myMethod }` into them, or by making this a reusable input component that takes the method as a prop (or composes multiple methods passed in as props).

## Demo

Go to the [live
demo](http://glortho.github.io/react-keydown/example/index.html) or:

```
$ open example/public/index.html
```

Note that this is very much a work in progress!

## Test

```
$ npm test
```


## Notes, disclaimers, and tips

* The decorator pattern `@keydown` currently requires transpilation by
  the [Babel legacy decorators transform](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) or the equivalent.
* Components that have a [React 16 fragment](https://reactjs.org/docs/fragments.html) at their root may not be activated properly when clicked. See [this issue](https://github.com/glortho/react-keydown/issues/80) for more detail.
* The default build outputs CommonJS modules and native ES modules. For AMD or other support, use the
  [umd-specific
  branch](https://github.com/glortho/react-keydown/tree/master-umd) instead.
* This lib has only been tested using ES2015 classes and class methods. Some method decoration
  functionality may work on other types of object methods.
* Duplicate keybindings for components that are mounted at the same time will
  not both fire. The more recently mounted component, or the one that has been
  focused or clicked most recently, will win. If you do want both to fire,
  decorate a common ancestor class with `@keydown( ... )` and then use
  `@keydownScoped( ... )` in the child components (or just inspect
  `nextProps.keydown.event` in both).
* Since the only context we have for keydown events is the component, decorated
  methods receive the event as their sole argument and the component instance as
  context.
* The method decorators wrap React lifecycle methods in order to work
  as seamlessly and efficiently as possible. The class decorator does not do
  this, functioning instead as a higher-order component.

## Questions

Why is this so limited, only working on `keydown` and such?

> I published this out of my particular need on a project. If anyone else ever
arrives here and needs something else let me know via issues or a pull request.

