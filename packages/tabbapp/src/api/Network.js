// @flow
import { getCookie } from 'utils.js'

export function Request(url, options = {}, noToken) {
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'))
    const token = getCookie('access_token')
    let defaultOptions = {}
    if (!options.headers) {
      defaultOptions.headers = { 'Content-Type': 'application/json' }
    } else {
      defaultOptions.headers = options.headers
    }
    if (token.length > 0 && !noToken)
      defaultOptions.headers.Authorization = `Bearer ${token}`
    options = Object.assign(options, defaultOptions)
    //console.log(options);
    fetch(url, options)
      .then(res =>
        res.text().then(text => ({
          status: res.status,
          text,
        })),
      )
      .then(res => {
        //console.log(res.status);
        //if (res.status === 401 && window.location.pathname !== '/') window.location.replace('/')
        try {
          const txt = res.text //.replace('/**/','')
          if (txt.length < 5) return { status: res.status, json: null }
          return { status: res.status, json: JSON.parse(txt) }
        } catch (err) {
          console.log(err, 'HTTP Error')
          return { status: res.status, json: null }
        }
      })
      .then(({ status, json }) => {
        if (status >= 200 && status < 300) {
          // success
          if (json) resolve(json.data || json)
          else resolve('no json')
        } else {
          // error
          if (json) {
            reject(json.errors || json)
          } else {
            reject('no json in response')
          }
        }
      })
      .catch(e => {
        //console.log('Request failed', e)
        reject(e)
      })
  })
}

const buildURL = ({ path }) => {
  return `https://api.dev.tabb.global/${path}`
}

export function Get(urlParts, cookie) {
  let opts = { method: 'GET' }
  if (cookie) opts.headers = { cookie }
  return Request(buildURL(urlParts), opts)
}
export function Post(urlParts, body = {}) {
  return Request(
    buildURL(urlParts),
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
    urlParts.noToken,
  )
}
export function PostMultipart(urlParts, body = {}) {
  const formData = new FormData()
  for (let key in body) {
    formData.append(key, body[key])
  }
  return Request(
    buildURL(urlParts),
    {
      method: 'POST',
      headers: {},
      body: formData,
    },
    urlParts.noToken,
  )
}
export function Put(urlParts, body = {}) {
  return Request(buildURL(urlParts), {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}
export function Delete(urlParts, body = {}) {
  return Request(buildURL(urlParts), {
    method: 'DELETE',
    body: JSON.stringify(body),
  })
}
