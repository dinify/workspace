declare module 'AddonModels' {
  import { Price, Translation } from 'CartModels';

  export type Addon = {
    id: string;
    price: Price;
    translations: [Translation];
    qty?: number;
  };

  export type MenuAddon = {
    published: boolean;
    maximum: number;
    menuItemId: string;
    addonId: string;
  };

  export type AddonMap = {
    [id: string]: Addon;
  };
}
