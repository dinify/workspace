declare module 'MenuItemsModels' {
  import { Image } from 'RestaurantModels';
  import { Price, Translation } from 'CartModels';
  import { Ingredient, IngredientMap } from 'IngredientModels';
  import { Addon, AddonMap } from 'AddonModels';
  import { Choice, Option, OptionMap, ChoiceMap, OptionNMap } from 'OptionModels';
  import { MenuCategory } from 'MenuCategoriesModels';

  export interface MenuItemTranslation extends Translation {
    description: string;
  };

  export type MenuItem = {
    id: string;
    favorite: boolean;
    menuCategoryId: string;
    menuCategory: MenuCategory;
    published: boolean;
    calories: any;
    precedence: number;
    display: any;
    promotion: any;
    cookingTime: any;
    translations: [MenuItemTranslation];
    images: Image[];
    price: Price;
    options: Option[];
    addons: Addon[];
    ingredients: Ingredient[];
  };

  export type MenuItemMap = {
    [id: string]: MenuItem;
  };

  export type AddonMap = {
    [id: string]: Addon;
  };

  export type MenuItemRequest = {
    menuItemId: string;
  };

  export type MenuItemResponseNormalized = {
    entities: {
      menuItems: MenuItemMap;
      addons: AddonMap;
      ingredients: IngredientMap;
      options: OptionNMap;
      choices: ChoiceMap;
      menuAddons: any;
      menuOptions: any;
      menuIngredients: any;
    }
  };
}
