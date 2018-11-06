// @flow
import R from 'ramda';
import types from './types';

const initialState = {
  progressMap: {},
  errorsMap: {},
};

function findNested(obj, key, memo) {
  let i;
  const proto = Object.prototype;
  const ts = proto.toString;
  const hasOwn = proto.hasOwnProperty.bind(obj);
  if (ts.call(memo) !== '[object Array]') memo = [];
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
  if (action.type.includes('_FAIL')) {
    const theMessage = findNested(action.payload, 'message');
    if (theMessage) {
      state = R.assocPath(['errorsMap', action.type], theMessage)(state);
    }
  }
  switch (action.type) {
    case 'persist/REHYDRATE': {
      return R.assoc('errorsMap', {})(R.assoc('progressMap', {})(state));
    }
    default:
      return state;
  }
}
