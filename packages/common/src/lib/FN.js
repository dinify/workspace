import R from 'ramda';
import numeral from 'numeral';

export const MapToList = items =>
  R.toPairs(items)
    .map(pair => ({ id: pair[0], ...pair[1] }))
    .sort((a, b) => b.id.localeCompare(a.id, 'en'));

export const ListToMap = items => {
  const obj = {};
  items.forEach(item => {
    obj[item.id] = item;
  });
  return obj;
};

export const Identity = (val, cb) => cb(val);

export function isInstalled() {
  const url = window.location.search;
  const getQuery = url.split('?')[1];
  if (!getQuery) return false;
  const params = getQuery.split('&');
  for (let i = 0; i < params.length; i += 1) {
    const s = params[i].split('=');
    if (s[0] === 'source' && s[1] === 'pwa') return true;
  }
  return false;
}

export const MapPath = R.curry((path, f, obj) =>
  R.assocPath(path, f(R.path(path, obj)), obj),
);

export const UpdateOriginal = (originalMap, actual) => {
  // always keep original keys
  const actualMap = actual;
  MapToList(originalMap).forEach(o => {
    if (actualMap[o.id]) {
      R.keys(o).forEach(originalKey => {
        if (actualMap[o.id][originalKey] === undefined) {
          actualMap[o.id][originalKey] = o[originalKey];
        }
      });
    }
  });
  return actualMap;
};

export function parseLanguages(languages) {
  return languages.map(lang => {
    const countries = lang[3].map(c => ({
      langtag: c[0], // BCP 47    "en-US"
      regionCode: c[0].split('-')[c[0].split('-').length - 1], // ISO 3166-1 (alpha-2) or UN M.49    "US"
      nameNative: c[1]
    }))
    return {
      code: lang[0], // ISO 639-1 or ISO 639-2    "en"
      name: lang[1],
      nameNative: lang[2],
      countries
    };
  });
}

function getUA() {
  return navigator.userAgent || navigator.vendor || window.opera;
}

export function formatPrice(price) {
  const displayCurrencies = {
    KWD: 'KD'
  };
  const formatAmount = {
    KWD: (amount) => numeral(amount).format('0.000')
  }
  const amount = Math.ceil(price.amount * 1000) / 1000;
  return `${formatAmount[price.currency](amount)} ${displayCurrencies[price.currency]}`;
  /* const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 3,
  });

  return formatter.format(price.amount); */
}

export function isMobile(ua) {
  if (!ua && typeof navigator !== 'undefined') ua = getUA();
  if (ua && ua.headers && typeof ua.headers['user-agent'] === 'string') {
    ua = ua.headers['user-agent'];
  }
  if (typeof ua !== 'string') return false;

  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      ua,
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(
      ua.substr(0, 4),
    )
  );
}

export function isTouchMobile(ua) {
  return isMobile(ua) && 'ontouchstart' in global;
}

export function supportsScrollSnap() {
  return (
    'scrollSnapType' in document.documentElement.style ||
    'webkitScrollSnapType' in document.documentElement.style
  );
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'other'.
 *
 * @returns {String}
 */
export function getPlatform() {
  const userAgent = getUA();
  if (isMobile(userAgent)) {
    // Windows Phone must come first because its UA also contains 'Android'
    /* if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone';
    } */
    // Treat WP as if it were Android

    if (/android/i.test(userAgent)) {
      return 'android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'ios';
    }

    return 'mobile';
  }
  return 'desktop';
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}
