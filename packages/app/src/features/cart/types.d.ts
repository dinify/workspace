declare module 'CartModels' {
  import { MenuItem, MenuItemMap, Choice, Addon, Ingredient } from 'MenuItemsModels';
  import { AddonMap } from 'AddonModels';
  import { IngredientMap } from 'IngredientModels';
  import { ChoiceMap } from 'OptionModels';


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
    subtotal: Subtotal;
    owners: Owner[];
    ownersCount: number;
    menuItem: MenuItem;
    orderAddons: OrderAddon[];
    orderChoices: OrderChoice[];
    orderExcludes: OrderExclude[];
  }

  export type OrderItemN = {
    id: string;
    orderId: string | null;
    menuItemId: string;
    initiator: string; // uid
    status: string;
    meta: any; // TODO
    subtotal: Subtotal;
    owners: string[];
    menuItem: string;
    orderAddons: string[];
    orderChoices: string[];
    orderExcludes: string[];
  }

  export type AddToCartResponse = OrderItem;
  export type AddToCartResponseN = OrderItemN;

  export type AddToCartRequest = {
    menuItemId: string;
    excludes: any[];
    addons: any[];
    choices: any[];
  }

  export type Cart = {
    subtotal: Subtotal;
    items: OrderItem[];
    restaurantId?: string;
    userId?: string;
  }

  export type CartResponse = Cart;

  export type OrderItemNMap = {
    [id: string]: OrderItemN;
  }

  export type OrderItemMap = {
    [id: string]: OrderItem;
  }

  export type OrderAddonMap = {
    [id: string]: OrderAddon;
  }

  export type CartResponseN = {
    entities: {
      menuItems: MenuItemMap,
      orderItems: OrderItemNMap,
      addons: AddonMap,
      orderAddons: OrderAddonMap,
      excludes: IngredientMap,
      choices: ChoiceMap
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
