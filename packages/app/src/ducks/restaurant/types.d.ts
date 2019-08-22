declare module 'RestaurantModels' {

  export type Restaurant = {
    id: string;
    title: string;
  };

  export type Status = {
    id: string;
    title: string;
  };

  export type FavRestaurantRequest = {
    id: string;
    fav: boolean;
  }

  export type FavRestaurantResponse = {
    res: object;
    initPayload: object;
  }

}
