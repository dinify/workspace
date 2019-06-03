import { ignoreElements, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

const meFetchedEpic = (action$) =>
  action$.pipe(
    ofType('ACCESSTOKEN_HANDLED'),
    tap(() => {
      window.initSocket();
    }),
    ignoreElements()
  );

export default [
  meFetchedEpic
];
