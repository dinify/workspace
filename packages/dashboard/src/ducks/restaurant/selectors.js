import { createSelector } from 'reselect';

export const allRestaurants = state => state.restaurant.all;
export const selectedRestaurantId = state => state.restaurant.selectedRestaurant;

export const selectedRestaurant = createSelector(
  allRestaurants,
  selectedRestaurantId,
  (all, id) => {
    if (!id) return false;
    return all[id];
  }
);
