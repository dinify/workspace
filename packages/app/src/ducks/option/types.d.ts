declare module 'OptionModels' {
  import { Price, Translation } from 'CartModels';

  export type Choice = {
    id: string;
    optionId: string;
    price: Price;
    translations: [Translation];
    selected?: boolean;
  }
  
  export type Option = {
    id: string;
    choices: [Choice];
  }

  export type OptionMap = {
    [id: string]: Option;
  }

  export type ChoiceMap = {
    [id: string]: Choice;
  }

}
