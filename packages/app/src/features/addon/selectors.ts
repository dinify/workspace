import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import values from 'ramda/es/values';
import { Addon, MenuAddon } from 'AddonModels';
import { Translation } from 'CartModels';
import { useIntl } from '@dinify/common/src/lib/i18n';

export type AddonView = Addon &
  MenuAddon &
  Translation & {
    amount: number;
  };

export const useAddonView = (menuItemId: string) => {
  const locale = useIntl(ctx => ctx.state.locale);
  const selectTranslation = (translations: [Translation]): Translation => {
    if (locale)
      return (
        translations.find(t => t.locale === locale.tag.language()) ||
        translations[0]
      );
    else return translations[0];
  };
  return useSelector<RootState, AddonView[]>(state =>
    values(state.menuItem.menuAddons)
      .filter(item => item.menuItemId === menuItemId)
      .map(value => {
        const addon = state.addon.all[value.addonId];
        const menuItemAddons = state.menuItem.selectedAddons[menuItemId];
        const amount =
          menuItemAddons && menuItemAddons[addon.id]
            ? menuItemAddons[addon.id].amount
            : 0;
        return {
          ...value,
          ...addon,
          ...selectTranslation(addon.translations),
          amount,
        };
      }),
  );
};
