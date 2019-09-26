import { createSelector } from 'reselect';
import filter from 'ramda/es/filter';
import propEq from 'ramda/es/propEq';
import { MapToList } from '@dinify/common/src/lib/FN';
import { RootState } from 'typesafe-actions';

export const allServices = (state: RootState) => state.service.all;
export const checkedInRestaurant = (state: RootState) => state.restaurant.checkedInRestaurant;

export const relevantServicesList = createSelector(
  allServices,
  checkedInRestaurant,
  (all, id) => {
    if (!id) return [];
    return filter(propEq('restaurantId', id), MapToList(all));
  }
);
