import { Price, Translation } from 'CartModels';

declare module 'OptionModels' {

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

  export type OptionMap = {
    [id: string]: Option;
  }

}
