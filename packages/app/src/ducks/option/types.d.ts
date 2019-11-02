declare module 'OptionModels' {
  import { Price, Translation } from 'CartModels';

  export type Choice = {
    id: string;
    optionId: string;
    price: Price;
    translations: [Translation];
  };

  export type Option = {
    id: string;
    translations: [Translation];
    choices: [Choice];
  };

  export type OptionN = {
    id: string;
    translations: [Translation];
    choices: [string];
  };

  export type MenuOption = {
    published: boolean;
    menuItemId: string;
    optionId: string;
  };

  export type OptionMap = {
    [id: string]: Option;
  };

  export type OptionNMap = {
    [id: string]: OptionN;
  };

  export type ChoiceMap = {
    [id: string]: Choice;
  };
}
