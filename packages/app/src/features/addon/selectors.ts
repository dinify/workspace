import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import values from 'ramda/es/values';
import { Addon, MenuAddon } from 'AddonModels';
import { Translation, OrderItemN } from 'CartModels';
import { useIntl } from '@dinify/common/src/lib/i18n';
import { selectTranslation } from '../menuItem/selectors';

export type AddonView = Addon &
  MenuAddon &
  Translation & {
    amount: number;
  };
export const useAddonOrderView = (orderItemId: string) => {
  const locale = useIntl(ctx => ctx.state.locale);
  const orderItem = useSelector<RootState, OrderItemN>(state => state.cart.items[orderItemId]);
  return useSelector<RootState, AddonView[]>(state =>
    orderItem.orderAddons
      .map(orderAddonId => {
        const addonId = orderAddonId.split('.')[1];
        const addon = state.addon.all[addonId];
        const orderAddon = state.cart.orderAddons[`${orderItem.id}.${addonId}`];
        const amount = orderAddon ? orderAddon.amount : 0;
        const menuAddon = values(state.menuItem.menuAddons)
          .find(item => item.menuItemId === orderItem.menuItemId) as MenuAddon;
        return {
          ...menuAddon,
          ...addon,
          ...selectTranslation(locale, addon.translations),
          amount,
        };
      }),
  );
};

export const useAddonView = (menuItemId: string) => {
  const locale = useIntl(ctx => ctx.state.locale);
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
          ...selectTranslation(locale, addon.translations),
          amount,
        };
      }),
  );
};
