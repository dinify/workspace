import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/dist/lib/FN';

export const allOptions = state => state.option.all;

export const listOfOptions = createSelector(
  allOptions,
  (all) => {
    return MapToList(all).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }
);
