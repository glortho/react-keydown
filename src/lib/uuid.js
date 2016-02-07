/**
 * http://jsperf.com/uuid-generator-opt/4 
 *
 */

const l = '0123456789abcdef';
const m = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

export default function uuid() {
  let u   = '';
  let i   = 0;
  let rb  = Math.random() * 0xffffffff | 0;
  while ( i++ < 36 ) {
    const c = m[ i - 1 ];
    const r = rb & 0xf;
    const v = c === 'x' ? r : ( r & 0x3 | 0x8 );
    u += ( c === '-' || c === '4' ) ? c : l[v];
    rb = i % 8 === 0 ? Math.random() * 0xffffffff | 0 : rb >> 4;
  }
  return u;
}
