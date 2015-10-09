# babel-plugin-uglify

UglifyJS integration for Babel.

It will allow you to integrate [UglifyJS minifier](https://github.com/mishoo/UglifyJS2) into Babel pipeline without a need for generating code from Babel and parsing back into UglifyJS just to minify it and generate back again.

You can find a bit more detailed article on this [in my blog](https://rreverser.com/using-mozilla-ast-with-uglifyjs/).

## Installation

```sh
$ npm install babel-plugin-uglify --save-dev
```

## Usage

Note that plugin should be **always** runned after any ES6 transformers (use `:after` suffix as shown below), as UglifyJS doesn't understand ES6 at all, and thus will just break if you have anything left untransformed.

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["uglify:after"]
}
```

### Via CLI

```sh
$ babel --plugins uglify:after script.js
```

### Via Node API

```javascript
require('babel').transform('code', {
  plugins: ['uglify:after']
});
```
