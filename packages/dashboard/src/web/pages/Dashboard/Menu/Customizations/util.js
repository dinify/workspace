const cSymbol = {
  EUR: '€',
  CZK: 'Kč'
}

export const getCurrencySymbol = (price) => {
  let symbol = cSymbol.EUR;
  if (price && price.currency) {
    if (cSymbol[price.currency]) {
      symbol = cSymbol[price.currency];
    } else {
      symbol = price.currency;
    }
  }
  return symbol;
}
