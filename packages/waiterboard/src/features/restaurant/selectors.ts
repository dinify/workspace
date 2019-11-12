import { createSelector } from 'reselect';

export const allRestaurants = (state: any) => state.restaurant.all;
export const selectedRestaurantId = (state: any) => state.app.selectedRestaurant;

export const selectedRestaurant = createSelector(
  [
    allRestaurants,
    selectedRestaurantId,
  ],
  (all: any, id: any) => {
    if (!id) return null;
    return all[id];
  }
);
