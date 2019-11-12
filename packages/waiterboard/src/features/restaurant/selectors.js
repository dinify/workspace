import { createSelector } from 'reselect';

export const allRestaurants = state => state.restaurant.all;
export const selectedRestaurantId = state => state.app.selectedRestaurant;

export const selectedRestaurant = createSelector(
  [
    allRestaurants,
    selectedRestaurantId,
  ],
  (all, id) => {
    if (!id) return null;
    return all[id];
  }
);
