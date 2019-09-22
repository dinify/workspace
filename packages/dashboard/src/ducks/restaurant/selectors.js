import { createSelector } from 'reselect';

export const allRestaurants = state => state.restaurant.all;
export const allWifis = state => state.restaurant.wifi;
export const selectedRestaurantId = state => state.restaurant.selectedRestaurant;

export const selectedRestaurant = createSelector(
  allRestaurants,
  selectedRestaurantId,
  (all, id) => {
    if (!id) return null;
    return all[id];
  }
);

export const selectedRestaurantWifi = createSelector(
  allWifis,
  selectedRestaurantId,
  (wifis, id) => {
    if (!id) return null;
    return wifis[id];
  }
);

