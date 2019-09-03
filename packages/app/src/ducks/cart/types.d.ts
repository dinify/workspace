declare module 'CartModels' {

  export type Addon = {
    id: string;
    price: Price;
    translations: [Translation];
    qty?: number;
  }

  export type Translation = {
    locale: string;
    name: string;
  }
  
  export type Choice = {
    id: string;
    optionId: string;
    price: Price;
    translations: [Translation];
    price: Price;
    selected?: boolean;
  }
  
  export type Option = {
    id: string;
    choices: [Choice];
  }
  
  export type Ingredient = {
    id: string;
    excluded: boolean;
  }

  export type Price = {
    amount: number;
    currency: string;
  }

  export type MenuItemTranslation = {
    name: string;
    description: string;
    locale: string;
  }

  export type MenuItem = {
    id: string;
    menuCategoryId: string;
    published: boolean;
    calories: any;
    precedence: number;
    display: any;
    promotion: any;
    cookingTime: any;
    translations: [MenuItemTranslation];
    price: Price;
    options: [Option];
    addons: [Addon];
    ingredients: [Ingredient];
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

  export type OrderExclude = any;
  
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
    owners: [Owner] // TODO
    menuItem: MenuItem;
    orderAddons: [OrderAddon];
    orderChoices: [OrderChoice];
    orderExcludes: [OrderExclude];
  }

  export type CartItem = {
    orderItem: OrderItem;
    subtotal: Subtotal;
  }

  export type AddToCartResponse = CartItem;

  export type AddToCartRequest = {
    menuItemId: string;
    excludes: [string];
    addons: [];
    choices: [];
  }

  export type Cart = {
    subtotal: Subtotal;
    items: [CartItem];
  }

  export type CartResponse = {
    res: Cart;
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
