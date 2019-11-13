import { createSelector } from 'reselect';

export const allRestaurants = (state: any) => state.restaurant.all;
export const selectedRestaurantId = (state: any) => state.app.selectedRestaurant;

export const relevantServices = createSelector(
  [
    allRestaurants,
    selectedRestaurantId
  ],
  (all: any, id: any) => {
    if (!id || !all[id]) return {};
    return all[id].services;
  }
);
