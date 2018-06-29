// @flow
import { Observable } from 'rxjs';
import * as API from 'api/restaurant';
import types from './types';
import { favMenuitemDone, favMenuitemFail } from './actions';


type FavProps = {
  payload: {
    id: string,
    fav: boolean,
  }
}
const favEpic = (action$: Observable) =>
  action$
    .ofType(types.FAV_MENUITEM_INIT)
    .switchMap(({ payload }: FavProps) => {
      return Observable.fromPromise(API.FavMenuitem(payload))
        .mergeMap(res => {
          return Observable.of(favMenuitemDone(res));
        })
        .catch(error => Observable.of(favMenuitemFail(error)))
    });


export default [
  favEpic
];
