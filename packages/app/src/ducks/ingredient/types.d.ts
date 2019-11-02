declare module 'IngredientModels' {
  import { Price, Translation } from 'CartModels';

  export type Ingredient = {
    id: string;
    translations: [Translation];
  };

  export type MenuIngredient = {
    published: boolean;
    excludable: boolean;
    menuItemId: string;
    ingredientId: string;
  };

  export type IngredientMap = {
    [id: string]: Ingredient;
  };
}
