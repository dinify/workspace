declare module 'IngredientModels' {
  import { Price, Translation } from 'CartModels';


  export type Ingredient = {
    id: string;
    translations: [Translation];
  }

  export type IngredientMap = {
    [id: string]: Ingredient;
  }

}
