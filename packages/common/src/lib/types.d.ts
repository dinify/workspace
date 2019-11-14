declare module "@dinify/types" {
  import { CurrencyType } from "@phensley/cldr";
  export type Price = {
    amount: number;
    currency: CurrencyType;
  };
}
