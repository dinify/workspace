import R from 'ramda';

const initialState = {
  progressMap: {},
  errorsMap: {},
};

function findNested(obj, key, memo) {
  let i;
  let proto = Object.prototype;
  let ts = proto.toString;
  const hasOwn = proto.hasOwnProperty.bind(obj);

  if ('[object Array]' !== ts.call(memo)) memo = [];

  for (i in obj) {
    if (hasOwn(i)) {
      if (i === key) {
        memo.push(obj[i]);
      } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
        findNested(obj[i], key, memo);
      }
    }
  }

  return memo;
}

export default function reducer(state = initialState, action) {
  if (action.type === 'persist/REHYDRATE') {
    return R.assoc('errorsMap', {})(R.assoc('progressMap', {})(state));
  }
  if (
    action.type.includes('CREATE') ||
    action.type.includes('FETCH') ||
    action.type.includes('UPDATE') ||
    action.type.includes('REMOVE') ||
    action.type.includes('LOGIN') ||
    action.type.includes('SIGNUP') ||
    action.type.includes('SAVE') ||
    action.type.includes('PUSH')
  ) {
    let stage = '';
    let key = action.type;
    if (action.type.includes('_INIT')) {
      stage = 'PENDING';
      key = key.replace('_INIT', '');
    }
    if (action.type.includes('_DONE')) {
      stage = 'SUCCESS';
      key = key.replace('_DONE', '');
    }
    if (action.type.includes('_FAIL')) {
      stage = 'ERROR';
      key = key.replace('_FAIL', '');
      const theMessage = findNested(action.payload, 'message');
      if (theMessage) {
        state = R.assocPath(['errorsMap', key], theMessage)(state);
      }
    }
    state = R.assocPath(['progressMap', key], stage)(state);
  }
  return state;
}
