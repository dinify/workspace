
import { Observable, of, from } from 'rxjs';
import { exhaustMap, map, catchError, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as API from '@dinify/common/dist/api/restaurant';
import types from './types';
import { favMenuitemDone, favMenuitemFail } from './actions';


type FavProps = {
  payload: {
    id: string,
    fav: boolean,
  }
}
const favEpic = (action$: Observable) =>
  action$.pipe(
    ofType(types.FAV_MENUITEM_INIT),
    debounceTime(500),
    exhaustMap(({ payload }: FavProps) => {
      return from(API.FavMenuitem(payload)).pipe(
        map(res => favMenuitemDone({res, prePayload: payload })),
        catchError(error => of(favMenuitemFail({error, prePayload: payload })))
      )
    })
  );


export default [
  favEpic
];
