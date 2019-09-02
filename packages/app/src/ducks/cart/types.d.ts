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

}
