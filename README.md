# react-keydown
> Lightweight keydown wrapper for React components.

Use react-keydown as a higher-order component or decorator to pass keydown
events to the wrapped component, or call methods directly via designated keys. Good 
for implementing keyboard navigation or other shortcuts.

One of the main advantages of this library is that it only passes events
into the component when the user appears to be active inside the DOM elements
corresponding to that component and its children.

## Install

```
npm install --save react-keydown
```

## Use

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

### For methods: Decorate with keys that should trigger method

```javascript
import React from 'react';
import keydown, { Keys } from 'react-keydown';

const { ENTER } = Keys;

class MyComponent extends React.Component {

  ...

  @keydown( ENTER ) // or specify `which` code directly, in this case 13
  submit( event ) {
    event.preventDefault(); // optional
    MyApi.post( this.state );
  }
}
```

#### Specify multiple keys that should trigger the method

```javascript
@keydown( ENTER, TAB )
autocomplete( event ) {
  MyApi.get( this.state );
}
```

## Notes and disclaimers

* The decorator pattern `@keydown` currently requires transpilation by
  [Babel](babeljs.io/) (set to
  stage 1) or the equivalent
* This lib has only been tested using ES2015 classes. Some method decoration
  functionality may work on other types of object methods.
* The method decorators wrap React lifecycle methods in order to work
  as seamlessly and efficiently as possible. The class decorator does not do
  this, functioning instead as a higher-order component.

## Questions

Why is this so limited, only working on `keydown` and such?

> I published this out of my particular need on a project. If anyone else ever
arrives here and needs something else let me know via issues or a pull request.

