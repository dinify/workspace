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

  export type RmFromCartRequest = {
    orderItemId: string;
  }

  export type OrderRequest = {
    items: [];
  }

  export type OrderResponse = {
    res: any;
  }

  export type Addon = {
    id: string;
    qty: number;
  }
  
  export type Choice = {
    id: string;
    selected: boolean;
  }
  
  export type Option = {
    id: string;
    choices: [Choice];
  }
  
  export type Ingredient = {
    id: string;
    excluded: boolean;
  }
  
  export type MenuItem = {
    id: string;
    addons: [Addon];
    options: [Option];
    ingredients: [Ingredient];
  }  

}
