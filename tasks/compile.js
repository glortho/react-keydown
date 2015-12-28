#!/usr/bin/env node
'use strict';
const exec = require( 'child_process' ).exec;
const path = require( 'path' );

const root = path.join( __dirname, '..' );

const log = data => console.log( String( data ).replace( /\n/, '' ) );

const cmd = exec( `babel -d ./dist ./src`, { cwd: root } );
cmd.stdout.on( 'data', log );
cmd.stderr.on( 'data', log );
