import { createSelector } from 'reselect';
import { MapToList, sortByName, getNameOfItem } from '@dinify/common/src/lib/FN';
import find from 'ramda/es/find';

export const allAddons = (state: any) => state.addon.all;

export const listOfAddons = createSelector(
  allAddons,
  (all: any) => {
    return MapToList(all).sort(sortByName);
  }
);

export const findAddonByName = createSelector(
  [
    listOfAddons,
    (state: any, prop: any) => prop
  ],
  (list, lookingFor) => {
    return find((one: any) =>
      getNameOfItem(one).toLowerCase() === lookingFor.toLowerCase()
    )(list);
  }
);
