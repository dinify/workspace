import { of, from } from 'rxjs';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { getType } from 'typesafe-actions';

import { getGeolocationAsync } from './actions';

const geoPromise = new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    resolve,
    reject
  );
});

const getGeolocationEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(getGeolocationAsync.request)),
    filter(() => {
      const geolocation = state$.value.user.geolocation;
      if (!geolocation) return true;

      const { timestamp } = geolocation;
      const currentTimestamp = new Date().getTime();
      const diff = currentTimestamp - timestamp;
      // if geolocation is older than 60 minutes, continue to refetch
      if (diff > (60 * 60 * 1000)) {
        return true;
      }

      return false;
    }),
    mergeMap(() => from(geoPromise).pipe(
      map((position: any) => {
        const { coords } = position;
        return getGeolocationAsync.success({
          latitude: coords.latitude,
          longitude: coords.longitude,
          timestamp: new Date().getTime()
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
