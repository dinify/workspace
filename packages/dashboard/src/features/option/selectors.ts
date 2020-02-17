import { createSelector } from 'reselect';
import { MapToList, sortByName, getNameOfItem } from '@dinify/common/src/lib/FN';
import assoc from 'ramda/es/assoc';
import find from 'ramda/es/find';

export const allOptions = (state: any) => state.option.all;
export const allChoices = (state: any) => state.option.choices;

export const listOfOptions = createSelector(
  [
    allOptions,
    allChoices
  ],
  (options, choices) => {
    return MapToList(options)
      .map((option: any) => {
        const relevantChoices = option.choices.map((choiceId: any) => choices[choiceId]);
        return assoc('choices', relevantChoices)(option);
      })
      .sort(sortByName);
  }
);

export const findOptionByName = createSelector(
  [
    listOfOptions,
    (state: any, prop: any) => prop
  ],
  (list, lookingFor) => {
    return find((one: any) =>
      getNameOfItem(one).toLowerCase() === lookingFor.toLowerCase()
    )(list);
  }
);
