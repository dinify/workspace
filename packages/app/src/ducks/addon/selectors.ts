import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import values from 'ramda/es/values';
import { Addon, MenuAddon } from 'AddonModels';
import { Translation } from 'CartModels';

export type AddonView = Addon &
  MenuAddon &
  Translation & {
    amount: number;
  };

export const useAddonView = (menuItemId: string) => {
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
          ...addon.translations[0],
          amount,
        };
      }),
  );
};
