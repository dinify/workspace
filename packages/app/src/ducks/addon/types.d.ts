import { Price, Translation } from 'CartModels';

declare module 'AddonModels' {

  export type Addon = {
    id: string;
    price: Price;
    translations: [Translation];
    qty?: number;
  }

  export type AddonMap = {
    [id: string]: Addon;
  }

}
