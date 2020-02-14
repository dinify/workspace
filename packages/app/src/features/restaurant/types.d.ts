declare module 'RestaurantModels' {
  export interface Restaurant {
    id: string;
    title: string;
    favorite: boolean;
    subdomain: string;
    images: Image[];
    menuLanguages: MenuLanguage[];

    published: boolean;
    priceCategory: string | null;
    rating: number | null;
    ratingCount: number | null;
    name: string;
    type: "CLASSIC" | "QLESS";
    latitude: number;
    longitude: number;
    payout: null;
    address: Address;
    social: any;
    contact: any;
    settings: {
      currency: CurrencyCode;
      reservations: boolean;
      serviceCalls: boolean;
      paymentMethods: array;
      paymentCollection: string;
      orders: boolean;
    };
    createdAt: DateTime;
    updatedAt: DateTime;
    favorite: boolean;
    publishRequestPending: any;
  };

  export type RestaurantMap = {
    [id: string]: Restaurant
  }

  export type Image = {
    published: boolean;
    item_id: string;
    url: string;
    precedence: number;
  };

  export type MenuLanguage = {
    published: boolean;
    default: boolean;
    language: string;
  };

  export type RestaurantResponse = Restaurant;

  export type RestaurantsResponse = Restaurant[];

  export type StatusResponse = {
    checkedInRestaurant: Restaurant.id | null
  };

  export type FavRestaurantRequest = {
    restaurantId: string;
    fav: boolean;
  }

  export type FavRestaurantResponse = {
    res: object;
    initPayload: FavRestaurantRequest;
  }

  export type FavRestaurantError = {
    error: object;
    initPayload: FavRestaurantRequest;
  }

}
