import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/dist/lib/FN';

export const allAddons = state => state.addon.all;

export const listOfAddons = createSelector(
  allAddons,
  (all) => {
    return MapToList(all).sort((a, b) =>
      a.id.localeCompare(b.id),
    );
  }
);
