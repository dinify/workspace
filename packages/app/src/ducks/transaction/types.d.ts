declare module 'TransactionModels' {
  import { Subtotal, OrderItem } from 'CartModels';

  export type PaymentTypes = 'CASH' | 'CARD' | 'ONLINE';
  export type OrderTypes = 'DELIVERY' | 'DINE_IN' | 'NEARBY' | 'TAKEAWAY' | 'QLESS' | 'AHEAD';

  export type Total = Subtotal;

  export type InitTransactionRequest = {
    type: PaymentTypes;
    gratuity: number;
  }

  export type OrderStatus = 'PENDING'|'DISPATCHED'|'CONFIRMED'|'CANCELLED';

  export type Order = {
    id: string;
    initiator: string;
    type: OrderTypes;
    meta: any;
    status: OrderStatus;
    restaurantId: string;
    items: OrderItem[]
  }

  export type OrderN = {
    id: string;
    initiator: string;
    type: OrderTypes;
    meta: any;
    status: OrderStatus;
    restaurantId: string;
    items: string[];
  }

  export type OrderNMap = {
    [id: string]: OrderN
  }

  export type BillResponse = {
    count: number;
    orders: Order[];
    subtotal: Subtotal;
  }

  export type BillResponseN = {
    entities: {
      menuItems: MenuItemMap,
      orderItems: OrderItemNMap,
      addons: AddonMap,
      orderAddons: OrderAddonMap,
      excludes: IngredientMap,
      orders: OrderNMap
    },
    result: {
      count: number,
      subtotal: Subtotal
    }
  };

  export type InitTransactionResponse = {
    id: string,
    initiator: string,
    status: 'INITIATED' | 'PROCESSED',
    type: 'CASH' | 'CARD' | 'ONLINE';
    gratuity: number;
    subtotal: Subtotal;
    total: Total;
    restaurantId: string;
    orders: Order[];
  }

}
