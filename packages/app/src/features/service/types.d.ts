declare module 'ServiceModels' {
  import { Restaurant } from 'RestaurantModels';
  import { Image } from 'MenuItemsModels';
  import { Translation } from 'CartModels';

  export type Service = {
    id: string;
    orderId: string | null;
    menuItemId: string;
    initiator: string; // uid
    status: string;
    meta: any; // TODO
    subtotal: Subtotal;
    id: string;
    image: Image;
    imageId: string;
    restaurantId: Restaurant.id;
    translations: Translation[];
    type: 'TABLEWARE' | 'CONDIMENT';
  };

  export type Call = {
    id: string;
    serviceId: string;
    status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  };

  export type Seat = {
    id: string;
    bookingId: string | null;
    checkin: Date;
    checkout: Date;
    occupied: boolean;
    table: any;
    tableId: string;
    userId: string;
  };

  export type ServiceMap = {
    [id: string]: Service;
  };

  export type ServicesRequest = {
    restaurantId: Restaurant.id;
  };

  export type CallServiceRequest = {
    serviceId: Service.id;
  };
}
