declare module 'MenuCategoriesModels' {
  import { MenuItem, MenuItemMap } from 'MenuItemsModels';
  import { Translation } from 'CartModels';

  export type MenuCategory = {
    id: string;
    restaurantId: string;
    published: boolean;
    subdomain: string;
    precedence: number;
    items: string[];
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
