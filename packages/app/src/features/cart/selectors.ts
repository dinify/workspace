import { createSelector } from 'reselect';
import { CartState } from './reducers';
import { MapToList } from '@dinify/common/src/lib/FN';
import { OrderItemNMap, OrderItemN, Price } from 'CartModels';
import { RootState } from 'typesafe-actions';
import { useSelector } from 'react-redux';
import { useMenuItemView, MenuItemView } from '../menuItem/selectors';
import { useAddonOrderView } from '../addon/selectors';
import { useIngredientOrderView } from '../ingredient/selectors';
import { useChoiceOrderView } from '../option/selectors';


export const getOrderItems = (state: CartState): OrderItemNMap => state.items;

export const getOrderItemsList = createSelector(
  [
    getOrderItems
  ],
  (orderItemsMap: OrderItemNMap) => {
    return MapToList(orderItemsMap);
  }
);

export const getOrderItemIds = createSelector(
  [
    getOrderItemsList
  ],
  (orderItemsList) => {
    return orderItemsList.map(item => item.id);
  }
);

export const getOrderItemCount = createSelector(
  [
    getOrderItemsList
  ],
  (orderItemsList) => {
    return orderItemsList.length;
  }
);

export type CustomizationType = 'addon'|'exclude'|'choice';

export interface CustomizationView {
  name: string,
  type: CustomizationType,
  price?: Price,
  crossover?: boolean
  amount?: number
}

export interface CartItemView {
  orderItem: OrderItemN,
  menuItem: MenuItemView,
  customizations: CustomizationView[],
};
export const useCartItemView = (orderItemId: string): CartItemView => {
  const orderItem = useSelector<RootState, OrderItemN>(state => state.cart.items[orderItemId]);
  const menuItem = useMenuItemView(orderItem.menuItemId);
  const selectedChoices = useChoiceOrderView(orderItemId);
  const selectedAddons = useAddonOrderView(orderItemId);
  const excluded = useIngredientOrderView(orderItemId);

  const customizations: CustomizationView[] = [];
  selectedChoices.forEach(c => customizations.push({
    name: c.name,
    type: 'choice',
    price: c.price
  }));
  selectedAddons.forEach(a => customizations.push({
    name: a.name,
    type: 'addon',
    price: a.price,
    amount: a.amount
  }));
  excluded.forEach(i => customizations.push({
    name: i.name,
    type: 'exclude',
    crossover: true
  }));

  return {
    orderItem,
    menuItem,
    customizations,
  };
};


export const useCartRestaurant = () => useSelector<RootState, string|undefined>(state => {
  const items = state.cart.items;
  const sampleItem = MapToList(items)[0];
  if (!sampleItem) return '';
  const { menuItemId } = sampleItem;
  const menuItem = state.menuItem.all[menuItemId];
  const { menuCategoryId } = menuItem;
  const category = (state.menuCategory.all as any)[menuCategoryId];
  return category ? category.restaurantId : undefined;
});