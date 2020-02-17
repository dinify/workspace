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

  export interface ModelMap<T> {
    [id: string]: T
  }

  export interface ErrorAction<T = any> {
    initPayload: T,
    errorType: string
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

  export interface ModelMap<T> {
    [id: string]: T
  }

  export interface ErrorAction<T = any> {
    initPayload: T,
    errorType: string
  }
}