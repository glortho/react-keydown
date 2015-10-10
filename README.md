# React Keydown
> Lightweight keydown wrapper for React components.

Use react-keydown as a higher-order component or decorator to pass keydown
events to the wrapped component, or call methods directly via designated keys. Good 
for implementing keyboard navigation or other shortcuts.

Key advantages:

* **Declarative syntax**: Components say what keys they will respond to.
* **Intuitive DX**: Decorate a class or method to bind it to specified keys.
* **Scoping**: Designate the scope of your bindings by decorating/wrapping components. Only those components and their children will receive the designated key events.
* **Modifier keys**: Support for standard modifier key combinations.
* **Tiny**: 2kb compressed and gzipped (with UMD module wrapping -- smaller
  without it).

## Install

```
npm install --save react-keydown
```

## Use

### For methods: Decorate with keys that should trigger method

```javascript
import React from 'react';
import keydown from 'react-keydown';

class MyComponent extends React.Component {

  ...

  @keydown( 'enter' ) // or specify `which` code directly, in this case 13
  submit() {
    MyApi.post( this.state );
  }
}
```

Note: The keydown event will be passed to the decorated method for further
processing, if desired. For example, you may went to `event.preventDefault()`.

#### Specify multiple keys that should trigger the method

```javascript
@keydown( 'enter', 'tab', 'ctrl+z' )
autocomplete() {
  MyApi.get( this.state );
}
```

### For classes: Pass keydown events into your component

```jsx
import React from 'react';
import keydown from 'react-keydown';

class MyComponent extends React.Component {

  constructor( props ) {
    super( props );
  }

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

export default keydown( MyComponent );
```

#### Use decorator pattern:

```javascript
@keydown
class MyComponent extends React.Component {
  ...
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

## Demo

Go to the [live
demo](http://jedverity.github.io/react-keydown/example/index.html) or:

```
$ open example/public/index.html
```

Note that this is very much a work in progress!

## Notes and disclaimers

* The decorator pattern `@keydown` currently requires transpilation by
  [Babel](babeljs.io/) (set to
  stage 1) or the equivalent
* This lib has only been tested using ES2015 classes. Some method decoration
  functionality may work on other types of object methods.
* In order to avoid unintended side effects, only one component (and its children) can receive
  keydown events at a time (the most recently mounted, clicked, or focused component). If you want multiple     
  components to receive keydown events simultaneously, decorate a common ancestor component class with `@keydown`     and then decorate your methods in the child components with `@keydownScoped( myKeyCode )` (or manually work with    the keydown.event props flowing into your components). For example, if you want app-wide shortcuts, decorate (or    wrap) the root component with `@keydown` and then all descendent components will receive the `keydown.event` prop   when a key is pressed.
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

