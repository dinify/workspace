import { createSelector } from 'reselect';
import filter from 'ramda/src/filter';
import propEq from 'ramda/src/propEq';
import { MapToList } from '@dinify/common/dist/lib/FN';

export const allServices = state => state.service.all;
export const checkedInRestaurant = state => state.restaurant.checkedInRestaurant;

export const relevantServicesList = createSelector(
  allServices,
  checkedInRestaurant,
  (all, id) => {
    if (!id) return [];
    return filter(propEq('restaurant_id', id), MapToList(all));
  }
);
