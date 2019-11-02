import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Option, MenuOption, Choice } from 'OptionModels';
import { Translation } from 'CartModels';
import values from 'ramda/es/values';

export type OptionView = Omit<Option, 'choices'> &
  MenuOption &
  Translation & {
    choices: [ChoiceView];
  };

export type ChoiceView = Choice & Translation & { selected: boolean };

export const useOptionView = (menuItemId: string) => {
  return useSelector<RootState, OptionView[]>(state =>
    values(state.menuItem.menuOptions).map(value => {
      const { choices: choiceIds, ...option } = state.option.all[
        value.optionId
      ];
      const choices = choiceIds.map(choiceId => {
        const choice = state.option.choices[choiceId];
        const menuItemChoices = state.menuItem.selectedChoices[menuItemId];
        const selected =
          menuItemChoices && menuItemChoices[choiceId]
            ? menuItemChoices[choiceId]
            : false;
        return {
          ...choice,
          ...choice.translations[0],
          selected,
        };
      }) as [ChoiceView];
      return {
        ...value,
        ...option,
        ...option.translations[0],
        choices,
      };
    }),
  );
};
