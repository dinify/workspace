declare module "@dinify/types" {
  import { CurrencyType, Decimal } from "@phensley/cldr";
  export type Price = {
    amount: number | Decimal;
    currency: CurrencyType;
  };

  export type Translation = {
    locale: string;
    name: string;
  }
}

declare module "CommonModule" {
  import { CurrencyType, Decimal } from "@phensley/cldr";
  export type Price = {
    amount: number | Decimal;
    currency: CurrencyType;
  };

  export type Translation = {
    locale: string;
    name: string;
  }
}