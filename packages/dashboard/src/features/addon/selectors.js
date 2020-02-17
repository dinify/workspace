import { createSelector } from 'reselect';
import { MapToList, sortByName } from '@dinify/common/src/lib/FN';

export const allAddons = state => state.addon.all;

export const listOfAddons = createSelector(
  allAddons,
  (all) => {
    return MapToList(all).sort(sortByName);
  }
);
