import { from } from 'rxjs';
import { switchMap, exhaustMap, map, catchError, debounceTime } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { fetchMenuItemAsync } from './actions';
import { getType } from 'typesafe-actions';

const { handleEpicAPIError } = require('@dinify/common/dist/lib/FN');


const getMenuItemEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchMenuItemAsync.request)),
    switchMap((action) => {

      const { menuItemId } = action.payload;

      const promise = API.GetMenuItem({ menuItemId });

      return from(promise).pipe(
        map(fetchMenuItemAsync.success),
        catchError(error => {
          console.log(error);
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchMenuItemAsync.failure),
            initAction: action
          })
        })
      );

    })
  );

// const favEpic: Epic = (action$) =>
//   action$.pipe(
//     ofType('dinify/menuItem/FAV_MENUITEM_INIT'),
//     debounceTime(500),
//     exhaustMap((action) => {
//       const { payload } = action;
//       return from(API.FavMenuitem(payload)).pipe(
//         map(res => favMenuitemDone({res, initPayload: payload })),
//         catchError(error => handleEpicAPIError({
//           error,
//           failActionType: 'dinify/menuItem/FAV_MENUITEM_FAIL',
//           initAction: action
//         }))
//       )
//     })
//   );

export default [
  getMenuItemEpic,
  // favEpic
];
