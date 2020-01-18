import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import assoc from 'ramda/es/assoc';

export const allOptions = (state: any) => state.option.all;
export const allChoices = (state: any) => state.option.choices;


export const listOfOptions = createSelector(
  [
    allOptions,
    allChoices
  ],
  (options, choices) => {
    return MapToList(options)
      .map((option) => {
        const relevantChoices = option.choices.map((choiceId: any) => choices[choiceId]);
        return assoc('choices', relevantChoices)(option);
      })
      .sort((a, b) =>
        a.id.localeCompare(b.id),
      );
  }
);