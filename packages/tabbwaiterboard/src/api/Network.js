// @flow
function getCookie(cname) {
  let name = cname + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return ""
}

export function Request(url, options = {}, noToken) {
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'))
    const token = getCookie('access_token')
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (token.length > 0 && !noToken) defaultOptions.headers.Authorization = `Bearer ${token}`
    options = Object.assign(options, defaultOptions)
    //console.log(options);
    fetch(url, options)
      .then(res =>
        res.text().then(text => ({
          status: res.status,
          text,
        })
      ))
      .then(res => {
        //console.log(res.status);
        if (res.status === 401 && window.location.pathname !== '/') window.location.replace('/')
        try {
          return { status: res.status, json: JSON.parse(res.text) }
        } catch (err) {
          return { status: res.status, json: null }
        }
      })
      .then(({ status, json }) => {
        if (status >= 200 && status < 300) resolve(json)
        else {
          if (json) {
            reject(json.error)
          } else {
            reject('no json in response')
          }
        }
      })
      .catch((e) => {
        //console.log('Request failed', e)
        reject(e)
      })
  })
}

const buildURL = ({
  subdom = 'apijs',
  endpoint = 'gotabb.com',
  path
}) => {
  //return `http://localhost:3005/${path}`
  return `http://tabb-apiv2.eu-central-1.elasticbeanstalk.com/${path}`
}//`https://${subdom}.${endpoint}/${path}`//

// urlParts = { token, ?subdom, ?endpoint, ?prefix, path }

export function Get(urlParts, cookie) {
  let opts = { method: 'GET' }
  if (cookie) opts.headers = { cookie }
  return Request(buildURL(urlParts), opts)
}
export function Post(urlParts, body = {}) {
  return Request(buildURL(urlParts), {
    method: 'POST',
    body: JSON.stringify(body),
  }, urlParts.noToken)
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
