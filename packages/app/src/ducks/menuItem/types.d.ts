import { Price, Translation } from 'CartModels';


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

  export type Addon = {
    id: string;
    price: Price;
    translations: [Translation];
    qty?: number;
  }

  export type Ingredient = {
    id: string;
    translations: [Translation];
  }

  export type Choice = {
    id: string;
    optionId: string;
    price: Price;
    translations: [Translation];
    price: Price;
    selected?: boolean;
  }
  
  export type Option = {
    id: string;
    choices: [Choice];
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

}
