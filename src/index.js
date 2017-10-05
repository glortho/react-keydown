// polyfill array.from (mainly for IE)
import './lib/array.from';

// @keydown and @keydownScoped
export { default, keydownScoped, keydownGlobal } from './decorators';

// setBinding - only useful if you're not going to use decorators
export { setBinding } from './store';

// Keys - use this to find key codes for strings. for example: Keys.j, Keys.enter
export { default as Keys, ALL_KEYS, ALL_PRINTABLE_KEYS } from './lib/keys';
