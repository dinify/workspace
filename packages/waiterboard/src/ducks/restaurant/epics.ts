import { from } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { fetchManagedAsync } from './actions';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';

const getManagedEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchManagedAsync.request)),
    mergeMap((action) => {
      return from(API.GetManagedRestaurants()).pipe(
        map(fetchManagedAsync.success),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(fetchManagedAsync.failure),
            initAction: action,
          }),
        ),
      );
    })
  );

export default [
  getManagedEpic
];
