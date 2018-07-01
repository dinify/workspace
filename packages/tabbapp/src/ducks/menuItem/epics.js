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
    .debounceTime(500)
    .exhaustMap(({ payload }: FavProps) => {
      return Observable.fromPromise(API.FavMenuitem(payload))
        .map(res => favMenuitemDone({res, prePayload: payload }))
        .catch(error => Observable.of(favMenuitemFail({error, prePayload: payload })))
    });


export default [
  favEpic
];
