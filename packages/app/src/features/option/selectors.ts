import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Option, MenuOption, Choice } from 'OptionModels';
import { Translation, OrderItemN } from 'CartModels';
import values from 'ramda/es/values';
import { useIntl } from '@dinify/common/src/lib/i18n';
import { selectTranslation } from '../menuItem/selectors';

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

export const useChoiceOrderView = (orderItemId: string): ChoiceView[] => {
  const locale = useIntl(ctx => ctx.state.locale);
  const orderItem = useSelector<RootState, OrderItemN>(state => state.cart.items[orderItemId]);
  return useSelector<RootState, ChoiceView[]>(state => {
    return orderItem.orderChoices.map(choiceId => {
      const choice = state.option.choices[choiceId];
      return {
        ...choice,
        ...selectTranslation(locale, choice.translations),
        selected: true
      };
    }) as [ChoiceView];
  });
};

export const useOptionView = (menuItemId: string) => {
  const locale = useIntl(ctx => ctx.state.locale);
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
            ...selectTranslation(locale, choice.translations),
            selected,
          };
        }) as [ChoiceView];
        return {
          ...value,
          ...option,
          ...selectTranslation(locale, option.translations),
          choices,
        };
      }),
  );
};
