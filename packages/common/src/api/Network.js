// @flow
import { getCookie } from '../lib/FN';

export function Request(url, options = {}, noToken) {
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'));
    const token = getCookie('access_token');
    const lang = getCookie('lang');
    const defaultOptions = {};
    if (!options.headers) {
      defaultOptions.headers = { 'Content-Type': 'application/json' };
    } else {
      defaultOptions.headers = options.headers;
    }
    if (token.length > 0 && !noToken)
      defaultOptions.headers.Authorization = `Bearer ${token}`;
    if (lang)
      defaultOptions.headers['Accept-Language'] = lang;
    const allOptions = Object.assign(options, defaultOptions);
    fetch(url, allOptions)
      .then(res =>
        res.text().then(text => ({
          status: res.status,
          text,
        })),
      )
      .then(res => {
        //  console.log(res.status);
        try {
          const txt = res.text; //  .replace('/**/','')
          if (txt.length < 5) return { status: res.status, json: null };
          return { status: res.status, json: JSON.parse(txt) };
        } catch (err) {
          console.log(err, 'HTTP Error');
          return { status: res.status, json: null };
        }
      })
      .then(({ status, json }) => {
        if (status >= 200 && status < 300) {
          // success
          if (json) {
            if (json.metadata) resolve(json)
            else resolve(json.data || json);
          }
          else resolve('no json');
        } else {
          // error
          if (json) {
            reject(json.errors || json);
            return;
          }
          reject(new Error('No json in response'));
        }
      })
      .catch(e => {
        //  console.log('Request failed', e)
        reject(e);
      });
  });
}

const buildURL = ({
  path,
  endpoint = 'https://api.dinify.app/'
}) => {
  return `${endpoint}${path}`;
};

export function Get(urlParts, cookie) {
  const opts = { method: 'GET' };
  if (cookie) opts.headers = { cookie };
  return Request(buildURL(urlParts), opts);
}
export function Post(urlParts, body = {}) {
  return Request(
    buildURL(urlParts),
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
    urlParts.noToken,
  );
}
export function PostMultipart(urlParts, body = {}) {
  const formData = new FormData();
  for (let key in body) {
    formData.append(key, body[key]);
  }
  return Request(
    buildURL(urlParts),
    {
      method: 'POST',
      headers: {},
      body: formData,
    },
    urlParts.noToken,
  );
}
export function Put(urlParts, body = {}) {
  return Request(buildURL(urlParts), {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}
export function Delete(urlParts, body = {}) {
  return Request(buildURL(urlParts), {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
}
