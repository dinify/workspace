import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Option, MenuOption, Choice } from 'OptionModels';
import { Translation } from 'CartModels';
import values from 'ramda/es/values';
import { useIntl } from '@dinify/common/src/lib/i18n';

export type OptionView = Omit<Option, 'choices'> &
  MenuOption &
  Translation & {
    choices: [ChoiceView];
  };

export type ChoiceView = Choice & Translation & { selected: boolean };

// TODO: memoizing selectors
// state.menuItem.menuOptions -> optionId -> option -> choiceId -> choice
// export const getOptionView = createSelector<RootState, any, any>(
//   [
//     state => state.menuItem.menuOptions,
//     state => state.
//   ]
// );

export const useOptionView = (menuItemId: string) => {
  const locale = useIntl(ctx => ctx.state.locale);
  const selectTranslation = (translations: [Translation]): Translation => {
    if (locale)
      return (
        translations.find(t => t.locale === locale.tag.language()) ||
        translations[0]
      );
    else return translations[0];
  };
  return useSelector<RootState, OptionView[]>(state =>
    values(state.menuItem.menuOptions)
      .filter(item => item.menuItemId === menuItemId)
      .map(value => {
        const { choices: choiceIds, ...option } = state.option.all[
          value.optionId
        ];
        const choices = choiceIds.map(choiceId => {
          const choice = state.option.choices[choiceId];
          const menuItemOptions = state.menuItem.selectedChoices[menuItemId];
          const menuItemChoices = menuItemOptions
            ? menuItemOptions[option.id]
            : null;
          const selected =
            menuItemChoices && menuItemChoices[choiceId]
              ? menuItemChoices[choiceId]
              : false;
          return {
            ...choice,
            ...selectTranslation(choice.translations),
            selected,
          };
        }) as [ChoiceView];
        return {
          ...value,
          ...option,
          ...selectTranslation(option.translations),
          choices,
        };
      }),
  );
};
