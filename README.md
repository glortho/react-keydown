# react-keydown
> Lightweight keydown wrapper for React components.

Use react-keydown as a higher-order component or decorator to pass keydown
events to the wrapped component, or call methods directly via designated keys. Good 
for implementing keyboard navigation or other shortcuts.

Key advantages:

* **Declarative syntax**: Components say what keys they will respond to.
* **Intuitive DX**: Decorate a class or method to bind it to specified keys
* **Component scoping**: Key bindings respond only when component mounts and/or
  the user appears to be active there
* **Tiny**: 2kb compressed and gzipped (with UMD module wrapping -- smaller
  without it)

## Install

```
npm install --save react-keydown
```

## Use

### For methods: Decorate with keys that should trigger method

```javascript
import React from 'react';
import keydown, { Keys } from 'react-keydown';

const { ENTER } = Keys;

class MyComponent extends React.Component {

  ...

  @keydown( ENTER ) // or specify `which` code directly, in this case 13
  submit() {
    MyApi.post( this.state );
  }
}
```

Note: The keydown event will be passed to the decorated method for further
processing, if desired. For example, you may went to `event.preventDefault()`.

#### Specify multiple keys that should trigger the method

```javascript
@keydown( ENTER, TAB )
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
      // do something with the keydown event
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

#### Use ES7/2016 decorator pattern via Babel (stage 1):

```javascript
@keydown
class MyComponent extends React.Component {
  ...
}

export default MyComponent;
```

#### Monitor only key codes `which` you care about:

```javascript
const KEYS = [
  38, // up
  40, // down
  13  // enter
];

@keydown( KEYS )
class MyComponent extends React.Component {
  ...
}
```
Or no need for an array:
```javascript
@keydown( 13 ) // just the enter key
```

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
* Since the only context we have for keydown events is the component, decorated
  methods receive the event as their sole argument and the component instance as
  context.
* This lib has only been tested using ES2015 classes. Some method decoration
  functionality may work on other types of object methods.
* The method decorators wrap React lifecycle methods in order to work
  as seamlessly and efficiently as possible. The class decorator does not do
  this, functioning instead as a higher-order component.

## Questions

Why is this so limited, only working on `keydown` and such?

> I published this out of my particular need on a project. If anyone else ever
arrives here and needs something else let me know via issues or a pull request.

