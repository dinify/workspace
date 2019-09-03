declare module 'CartModels' {

  export type Cart = {
    id: string;
    title: string;
    favorite: boolean;
  };

  export type CartResponse = {
    res: Cart;
  }

  export type AddToCartRequest = {
    menuItemId: string;
  }

  export type Addon = {
    id: string;
    qty: number;
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
  }

  export type Subtotal = Price & {
    precision: number;
  }

  export type OrderAddon = {
    
  }

  export type OrderChoice = {  
    orderItemId: string;
    choiceId: string;
    choice: Choice;
  }

  export type OrderExclude = {

  }
  
  export type OrderItem = {
    id: string;
    orderId: string | null;
    menuItemId: string;
    initiator: string; // uid
    status: string;
    meta: any; // TODO
    owners: [any] // TODO
    menuItem: MenuItem;
    orderAddons: [OrderAddon];
    orderChoices: [OrderChoice];
    orderExcludes: [OrderExclude];
  }

  export type CartItem = {
    orderItem: OrderItem;
    subtotal: Subtotal;
  }

  export type AddToCartResponse = {
    subtotal: Subtotal;
    items: [CartItem];
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
