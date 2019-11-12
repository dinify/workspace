import { createSelector } from 'reselect';

export const allRestaurants = state => state.restaurant.all;
export const selectedRestaurantId = state => state.app.selectedRestaurant;

export const relevantServices = createSelector(
  allRestaurants,
  selectedRestaurantId,
  (all, id) => {
    if (!id || !all[id]) return {};
    return all[id].services;
  }
);
