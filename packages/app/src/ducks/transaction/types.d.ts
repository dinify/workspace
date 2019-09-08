declare module 'TransactionModels' {
  import { Subtotal, OrderItem } from 'CartModels';

  export type PaymentTypes = 'CASH' | 'CARD' | 'ONLINE';
  export type OrderTypes = 'DELIVERY' | 'DINE_IN' | 'NEARBY' | 'TAKEAWAY' | 'QLESS' | 'AHEAD';

  export type Total = Subtotal;

  export type InitTransactionRequest = {
    type: PaymentTypes;
    gratuity: number;
  }

  export type Order = {
    id: string;
    initiator: string;
    type: OrderTypes;
    meta: any;
    status: string;
    restaurantId: string;
    items: OrderItem[]
  }

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
