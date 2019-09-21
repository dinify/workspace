import { ignoreElements, tap, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { actionTypes } from 'react-redux-firebase';
import { push } from 'connected-react-router';
import { ACCOUNT } from 'web/routes';

const meFetchedEpic = (action$) =>
  action$.pipe(
    ofType('ACCESSTOKEN_HANDLED'),
    tap(() => {
      window.initSocket();
    }),
    ignoreElements()
  );

const redirectAfterSignInEpic = (action$) =>
  action$.pipe(
    ofType(actionTypes.LOGIN),
    mapTo(push(ACCOUNT))
  )

export default [
  meFetchedEpic,
  redirectAfterSignInEpic
];
