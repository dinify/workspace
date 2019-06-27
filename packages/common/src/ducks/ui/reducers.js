import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';

import types from './types';

const initialState = {
  progressMap: {},
  errorsMap: {},
  dialogs: {},
  theme: 'light'
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
    const theCode = findNested(action.payload, 'code');
    if (theMessage) {
      state = assocPath(['errorsMap', action.type], {
        message: theMessage,
        code: theCode,
      })(state);
    }
  }
  switch (action.type) {
    case types.DIALOG_OPEN: {
      // TODO: close other dialogs
      return assocPath(['dialogs', action.payload.id], {
        ...action.payload,
        open: true,
      })(state);
    }
    case types.DIALOG_CLOSE: {
      return assocPath(['dialogs', action.payload], {
        ...state.dialogs[action.payload],
        open: false,
      })(state);
    }
    case types.TOGGLE_THEME: {
      return assoc('theme', state.theme === 'dark' ? 'light' : 'dark')(state);
    }
    case 'persist/REHYDRATE': {
      return assoc('errorsMap', {})(assoc('progressMap', {})(state));
    }
    default:
      return state;
  }
}
