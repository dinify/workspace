import { getCookie } from '../../lib/FN';

type FetchOptions = {
  method?: string;
  body?: BodyInit;
  headers?: Record<string, string>;
  lang?: string;
}

export const Request = (url: string, options: FetchOptions = {}) => new Promise((resolve, reject) => {

  if (!url) reject(new Error('URL parameter required'));

  const token = getCookie('access_token');

  // Replace colons with semicolons to be able to store string in cookies
  let lang = getCookie('lang').split(':').join(';');
  if (options.lang) lang = options.lang;

  const defaultOptions: FetchOptions = {};
  if (!options.headers) {
    defaultOptions.headers = { 'Content-Type': 'application/json' };
  } else {
    defaultOptions.headers = options.headers;
  }
  if (token.length > 0) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }
  if (lang) {
    defaultOptions.headers['Accept-Language'] = lang;
  }
  
  const allOptions = Object.assign(options, defaultOptions);

  fetch(url, allOptions)
    .then(res => res.text().then(text => ({
      status: res.status,
      text,
    })))
    .then(({ status, text }) => {
      try {
        if (text.length < 5) return { status, json: null };
        return { status, json: JSON.parse(text) };
      } catch (err) {
        console.log(err, 'HTTP Error');
        return { status, json: null };
      }
    })
    .then(({ status, json }) => {
      if (status >= 200 && status < 300) {
        // success
        if (json) {
          resolve(json);
        }
        else resolve(null);
      } else {
        // error
        if (json) {
          reject({...json, statusCode: status });
          return;
        }
        reject(new Error('No JSON in response'));
      }
    })
    .catch(reject);
});

type UrlTypes = {
  path: string,
  endpoint?: string,
  lang?: string
}

const buildURL = ({
  path,
  endpoint = 'https://api.dinify.app/v2/'
}: UrlTypes) => {
  return `${endpoint}${path}`;
};

export const Get = (urlParts: UrlTypes) => Request(
  buildURL(urlParts),
  { method: 'GET', lang: urlParts.lang }
);

export const Post = (urlParts: UrlTypes, body = {}) => Request(
  buildURL(urlParts),
  {
    method: 'POST',
    body: JSON.stringify(body),
    lang: urlParts.lang
  }
);

export const Put = (urlParts: UrlTypes, body = {}) => Request(
  buildURL(urlParts),
  {
    method: 'PUT',
    body: JSON.stringify(body),
    lang: urlParts.lang
  }
);

export const Patch = (urlParts: UrlTypes, body = {}) => Request(
  buildURL(urlParts),
  {
    method: 'PATCH',
    body: JSON.stringify(body),
    lang: urlParts.lang
  }
);

export const Delete = (urlParts: UrlTypes, body = {}) => Request(
  buildURL(urlParts), 
  {
    method: 'DELETE',
    body: JSON.stringify(body),
  }
);
