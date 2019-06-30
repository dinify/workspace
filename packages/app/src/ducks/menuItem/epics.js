import { from } from 'rxjs';
import { exhaustMap, map, catchError, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as API from '@dinify/common/dist/api/restaurant';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import types from './types';
import { favMenuitemDone } from './actions';

const favEpic = (action$) =>
  action$.pipe(
    ofType(types.FAV_MENUITEM_INIT),
    debounceTime(500),
    exhaustMap((action) => {
      const { payload } = action;
      return from(API.FavMenuitem(payload)).pipe(
        map(res => favMenuitemDone({res, initPayload: payload })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: types.FAV_MENUITEM_FAIL,
          initAction: action
        }))
      )
    })
  );

export default [
  favEpic
];
