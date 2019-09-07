import { Price, Translation } from 'CartModels';
import { Ingredient, IngredientMap } from 'IngredientModels';
import { Addon, AddonMap } from 'AddonModels';
import { Choice, Option, OptionMap } from 'OptionModels';

declare module 'MenuItemsModels' {

  export type MenuItemTranslation = {
    name: string;
    description: string;
    locale: string;
  }

  export type Image = {
    url: string;
    precedence: number;
  }

  export type MenuItem = {
    id: string;
    menuCategoryId: string;
    published: boolean;
    calories: any;
    precedence: number;
    display: any;
    promotion: any;
    cookingTime: any;
    translations: [MenuItemTranslation];
    images: [Image];
    price: Price;
    options: [Option];
    addons: [Addon];
    ingredients: [Ingredient];
  }

  export type MenuItemMap = {
    [id: string]: MenuItem;
  }

  export type AddonMap = {
    [id: string]: Addon;
  }

  export type MenuItemRequest = {
    menuItemId: string;
  }

  export type MenuItemResponseNormalized = {
    entities: {
      menuItems: MenuItemMap;
      addons: AddonMap;
      ingredients: IngredientMap;
      options: OptionMap;
      menuAddons: any;
      menuOptions: any;
      menuIngredients: any;
    }
  };

}
