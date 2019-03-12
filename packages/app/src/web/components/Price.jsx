import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Price = ({
  display,
  price,
  profile,
  ...props
}) => {
  if (!price) return null;
  const { i18n } = useTranslation();

  // TODO: fetch from https://static.dinify.app/misc/currencyRates
  const rates = {
    "success": true,
    "timestamp": 1552353125,
    "base": "EUR",
    "date": "2019-03-12",
    "rates": {
      "AED": 4.135651,
      "AFN": 85.197802,
      "ALL": 124.580316,
      "AMD": 549.455096,
      "ANG": 2.051835,
      "AOA": 354.229712,
      "ARS": 46.446689,
      "AUD": 1.593122,
      "AWG": 2.029149,
      "AZN": 1.9196,
      "BAM": 1.955799,
      "BBD": 2.244703,
      "BDT": 94.605261,
      "BGN": 1.955741,
      "BHD": 0.424492,
      "BIF": 2029.26203,
      "BMD": 1.125898,
      "BND": 1.528462,
      "BOB": 7.763347,
      "BRL": 4.321538,
      "BSD": 1.124288,
      "BTC": 0.000294,
      "BTN": 78.582607,
      "BWP": 12.050435,
      "BYN": 2.406213,
      "BYR": 22067.598294,
      "BZD": 2.265421,
      "CAD": 1.508416,
      "CDF": 1835.213329,
      "CHF": 1.137146,
      "CLF": 0.028201,
      "CLP": 755.155446,
      "CNY": 7.573347,
      "COP": 3568.533306,
      "CRC": 683.290489,
      "CUC": 1.125898,
      "CUP": 29.836294,
      "CVE": 110.274952,
      "CZK": 25.649419,
      "DJF": 200.094081,
      "DKK": 7.459817,
      "DOP": 56.883177,
      "DZD": 134.460359,
      "EGP": 19.623836,
      "ERN": 16.888769,
      "ETB": 31.897785,
      "EUR": 1,
      "FJD": 2.404802,
      "FKP": 0.866953,
      "GBP": 0.851618,
      "GEL": 3.028524,
      "GGP": 0.851464,
      "GHS": 6.254409,
      "GIP": 0.866952,
      "GMD": 55.861389,
      "GNF": 10258.163532,
      "GTQ": 8.645938,
      "GYD": 234.941098,
      "HKD": 8.838355,
      "HNL": 27.472472,
      "HRK": 7.412461,
      "HTG": 93.667959,
      "HUF": 315.585485,
      "IDR": 16027.437685,
      "ILS": 4.079695,
      "IMP": 0.851464,
      "INR": 78.588006,
      "IQD": 1341.56361,
      "IRR": 47405.930212,
      "ISK": 136.391573,
      "JEP": 0.851464,
      "JMD": 141.666044,
      "JOD": 0.798272,
      "JPY": 125.449232,
      "KES": 112.187821,
      "KGS": 78.566394,
      "KHR": 4507.754679,
      "KMF": 493.283975,
      "KPW": 1013.392063,
      "KRW": 1271.442524,
      "KWD": 0.342216,
      "KYD": 0.936978,
      "KZT": 426.309648,
      "LAK": 9657.722578,
      "LBP": 1695.433228,
      "LKR": 200.826106,
      "LRD": 182.113751,
      "LSL": 16.16789,
      "LTL": 3.324483,
      "LVL": 0.681044,
      "LYD": 1.559987,
      "MAD": 10.839353,
      "MDL": 19.200497,
      "MGA": 3991.30818,
      "MKD": 61.63393,
      "MMK": 1708.944506,
      "MNT": 2963.681777,
      "MOP": 9.090556,
      "MRO": 401.945835,
      "MUR": 39.379392,
      "MVR": 17.395234,
      "MWK": 820.244757,
      "MXN": 21.830968,
      "MYR": 4.593567,
      "MZN": 70.684245,
      "NAD": 16.214104,
      "NGN": 407.001085,
      "NIO": 36.989147,
      "NOK": 9.740885,
      "NPR": 125.571449,
      "NZD": 1.647881,
      "OMR": 0.433436,
      "PAB": 1.124344,
      "PEN": 3.728242,
      "PGK": 3.794332,
      "PHP": 58.704583,
      "PKR": 157.107889,
      "PLN": 4.299918,
      "PYG": 6852.946294,
      "QAR": 4.099342,
      "RON": 4.749265,
      "RSD": 118.083907,
      "RUB": 74.209165,
      "RWF": 1012.868985,
      "SAR": 4.222174,
      "SBD": 9.164865,
      "SCR": 15.378627,
      "SDG": 53.537556,
      "SEK": 10.549235,
      "SGD": 1.52786,
      "SHP": 1.487203,
      "SLL": 9851.606072,
      "SOS": 654.146518,
      "SRD": 8.396967,
      "STD": 23700.825309,
      "SVC": 9.838775,
      "SYP": 579.837553,
      "SZL": 16.175209,
      "THB": 35.634196,
      "TJS": 10.607759,
      "TMT": 3.951902,
      "TND": 3.424082,
      "TOP": 2.55286,
      "TRY": 6.117285,
      "TTD": 7.622445,
      "TWD": 34.786301,
      "TZS": 2638.093159,
      "UAH": 29.602675,
      "UGX": 4174.097192,
      "USD": 1.125898,
      "UYU": 37.05108,
      "UZS": 9422.749451,
      "VEF": 11.244907,
      "VND": 26082.381222,
      "VUV": 128.814534,
      "WST": 2.930957,
      "XAF": 655.936687,
      "XAG": 0.073442,
      "XAU": 0.00087,
      "XCD": 3.042795,
      "XDR": 0.810227,
      "XOF": 655.936638,
      "XPF": 119.255488,
      "YER": 281.868447,
      "ZAR": 16.111013,
      "ZMK": 10134.42888,
      "ZMW": 13.457295,
      "ZWL": 362.938821
    }
  };

  // TODO: move this to server side with precision and rounding based on currency
  const convert = (amt, from, to) => {
    if (from === to) return amt;
    if (from === rates.base) return amt * rates.rates[to];
    const toBase = amt * (1 / rates.rates[from]);
    return toBase * rates.rates[to];
  };

  const displayCurrency = profile.displayCurrency || display || price.currency;
  const number = convert(parseFloat(price.amount), price.currency, displayCurrency);
  return (
    <span style={{textTransform: 'none'}} {...props}>
      {i18n.format(number, `currency:${displayCurrency}`)}
    </span>
  );
}

const enhance = compose(
  connect(
    state => ({
      profile: state.firebase.profile
    })
  )
)

export default enhance(Price);
