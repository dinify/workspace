declare module "@dinify/types" {
  import { CurrencyType, Decimal } from "@phensley/cldr";
  export type Price = {
    amount: number | Decimal;
    currency: CurrencyType;
  };
}
