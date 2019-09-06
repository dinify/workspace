import { MenuItem, MenuItemMap } from 'MenuItemsModels';
import { Translation } from 'CartModels';

declare module 'MenuCategoriesModels' {

  export type MenuCategory = {
    id: string;
    restaurantId: string;
    translations: [Translation];    
  }

  export type MenuCategoryMap = {
    [id: string]: MenuCategory;
  }

  export type MenuCategoriesRequest = {
    subdomain: string;
  };

  export type MenuCategoriesResponseNormalized = {
    entities: {
      menuItems: MenuItemMap,
      menuCategories: MenuCategoryMap
    }
  }
}
