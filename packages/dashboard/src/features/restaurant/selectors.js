import { createSelector } from 'reselect';
import find from 'ramda/es/find';
import propEq from 'ramda/es/propEq';

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

export const getDefaultCurrency = createSelector(
  [
    selectedRestaurant
  ],
  (restaurant) => {
    let currency = 'EUR';
    if (restaurant) {
      currency = restaurant.settings.currency;
    }
    return currency;
  }
);

export const getDefaultLanguage = createSelector(
  [
    selectedRestaurant
  ],
  (restaurant) => {
    let lang = 'en';
    if (restaurant && restaurant.menuLanguages) {
      const menuLanguage = find(propEq('default', true))(restaurant.menuLanguages);
      if (menuLanguage) {
        lang = menuLanguage.language;
      }
    }
    return lang;
  }
);