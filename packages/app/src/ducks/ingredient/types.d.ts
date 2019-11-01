declare module 'IngredientModels' {
  import { Price, Translation } from 'CartModels';

  export type Ingredient = {
    id: string;
    translations: [Translation];
  };

  export type IngredientTranslation = {
    name: string;
    locale: string;
  };

  export type IngredientTranslated = Ingredient & IngredientTranslation;

  export type MenuIngredient = {
    excludable: boolean;
    menuItemId: string;
    ingredientId: string;
  };

  export type IngredientMap = {
    [id: string]: Ingredient;
  };
}
