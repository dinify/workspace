import { of } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { actionTypes } from 'react-redux-firebase';
import * as restaurantTypes from 'ducks/restaurant/types';
import * as appTypes from 'ducks/app/types';

const loadRestaurant = (action$) =>
  action$.pipe(
    ofType(restaurantTypes.LOAD_RESTAURANT),
    mergeMap(() => {
      return of({
        type: restaurantTypes.FETCH_RESTAURANT_INIT,
        payload: {
          populateWith: 'waiterboards.tables,services.image',
          node: true
        }
      });
    })
  );

const getLoggedEpic = (action$, state$) =>
  action$.pipe(
    filter(action => {
      const triggerOn = [
        actionTypes.LOGIN,
        actionTypes.AUTH_EMPTY_CHANGE,
        appTypes.SELECT_WAITERBOARD
      ];
      return triggerOn.includes(action.type);
    }),
    mergeMap(() => {

      const reactions = [{ type: restaurantTypes.FETCH_MANAGEDRESTAURANTS_INIT }];

      const selectedRestaurant = state$.value.restaurant.selectedRestaurant;
      if (selectedRestaurant) reactions.push({ type: restaurantTypes.LOAD_RESTAURANT });

      const waiterboardId = state$.value.restaurant.selectedWBId;
      if (waiterboardId) reactions.push({ type: appTypes.LOAD_STATE_INIT });

      return reactions;

    })
  );

export default [
  getLoggedEpic,
  loadRestaurant,
];
