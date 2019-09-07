import { Price, Translation } from 'CartModels';

declare module 'IngredientModels' {

  export type Ingredient = {
    id: string;
    translations: [Translation];
  }

  export type IngredientMap = {
    [id: string]: Ingredient;
  }

}
