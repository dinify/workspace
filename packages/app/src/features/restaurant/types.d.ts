declare module 'RestaurantModels' {

  export type Restaurant = {
    id: string;
    title: string;
    favorite: boolean;
    settings: any;
    subdomain: string;
    menuLanguages: MenuLanguage[];
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
