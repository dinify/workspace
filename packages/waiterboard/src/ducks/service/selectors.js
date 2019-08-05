import { createSelector } from 'reselect';

export const allRestaurants = state => state.restaurant.all;
export const selectedRestaurantId = state => state.restaurant.selectedRestaurant;

export const relevantServices = createSelector(
  allRestaurants,
  selectedRestaurantId,
  (all, id) => {
    if (!id || !all[id]) return false;
    return all[id].services;
  }
);
