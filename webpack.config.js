'use strict';
const path = require( 'path' );

module.exports = {
  entry: path.join( __dirname, 'example/src/index.js' ),
  output: {
    path: path.join( __dirname, 'example/public/js' ),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.js$/,
      loader: 'babel?stage=1'
    }]
  }
};
