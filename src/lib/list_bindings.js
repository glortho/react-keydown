import { getAll } from './listeners';

function listBindings() {
  return [ ...getAll() ]
    .map( ( [ classProto, keyMap ] ) => {
      console.log( classProto, keyMap );
    });
}

window.$rkd = { listBindings };

export default listBindings;
