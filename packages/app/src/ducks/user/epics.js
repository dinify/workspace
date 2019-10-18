import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { actionTypes } from 'react-redux-firebase';
import { push } from 'connected-react-router';
import { ACCOUNT } from 'web/routes';

// TODO reimplement redirect after signup in a cleaner way
const redirectAfterSignInEpic = (action$) =>
  action$.pipe(
    ofType(actionTypes.LOGIN),
    map((action) => {
      if (action.auth.a.u > 0) {
        return push(ACCOUNT);
      }
      return { type: 'NOTFIRSTLOGIN' };
    })
  )

export default [
  redirectAfterSignInEpic
];
