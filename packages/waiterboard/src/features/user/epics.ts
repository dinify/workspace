import { from } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/user';
import { fetchUserAsync, fetchAllUsersAsync } from './actions';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';

const getUserEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchUserAsync.request)),
    mergeMap((action) => {

      const { id } = action.payload;

      return from(API.GetUser({ id })).pipe(
        map(fetchUserAsync.success),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(fetchUserAsync.failure),
            initAction: action,
          }),
        ),
      );

    })
  );

const getAllUsersEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchAllUsersAsync.request)),
    mergeMap((action) => {

      const { ids, cache } = action.payload;

      const reactions = ids
        .map((id: string) => {
          if (cache && state$.value.user.all[id]) return null;
          return fetchUserAsync.request({ id });
        })
        .filter((a: any) => !!a);

      return reactions;
      
    })
  );

export default [
  getUserEpic,
  getAllUsersEpic
];
