import { of, from } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { getType } from 'typesafe-actions';

import { getGeolocationAsync } from './actions';

const geoPromise = new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    resolve,
    reject
  );
});

const getGeolocationEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(getGeolocationAsync.request)),
    mergeMap(() => from(geoPromise).pipe(
      map((position: any) => {
        const { coords } = position;
        return getGeolocationAsync.success({
          latitude: coords.latitude,
          longitude: coords.longitude
        });
      }),
      catchError(error => {
        return of(getGeolocationAsync.failure(error));
      })
    ))
  );

export default [
  getGeolocationEpic
];
