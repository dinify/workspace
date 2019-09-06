import { MenuItem, MenuItemMap, Choice, Addon, Ingredient } from 'MenuItemsModels';

declare module 'CartModels' {

  export type Translation = {
    locale: string;
    name: string;
  }
  
  export type Price = {
    amount: number;
    currency: string;
  }

  export type Subtotal = Price & {
    precision: number;
  }

  export type OrderAddon = {
    orderItemId: string;
    addonId: string;
    amount: 1;
    addon: Addon;
  }

  export type OrderChoice = {  
    orderItemId: string;
    choiceId: string;
    choice: Choice;
  }

  export type OrderExclude = {
    orderItemId: string;
    ingredientId: string;
    excluded: boolean;
    ingredient: Ingredient
  };
  
  export type Owner = {
    userId: string;
    paid: boolean;
    transactionId: string;
  }

  export type OrderItem = {
    id: string;
    orderId: string | null;
    menuItemId: string;
    initiator: string; // uid
    status: string;
    meta: any; // TODO
    owners: [Owner]
    menuItem: MenuItem;
    orderAddons: [OrderAddon];
    orderChoices: [OrderChoice];
    orderExcludes: [OrderExclude];
    subtotal: Subtotal;
  }

  export type AddToCartResponse = OrderItem;

  export type AddToCartRequest = {
    menuItemId: string;
    excludes: [string];
    addons: [];
    choices: [];
  }

  export type Cart = {
    subtotal: Subtotal;
    items: [OrderItem];
  }

  export type CartResponse = Cart;

  export type OrderItemMap = {
    [id: string]: OrderItem;
  }

  export type CartResponseNormalized = {
    entities: {
      menuItems: MenuItemMap,
      orderItems: OrderItemMap
    },
    result: {
      subtotal: Subtotal
    }
  }

  export type RmFromCartRequest = {
    orderItemId: string;
  }

  export type OrderRequest = {
    items: [];
  }

  export type OrderResponse = {
    res: any;
  }

}
