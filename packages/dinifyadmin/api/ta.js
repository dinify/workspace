import axios from 'axios';
import _ from 'lodash';

global.APIprops = {
  email: "quantiofficial@email.cz",
  password: "apipwd6784",
  authToken: null
}

const getHeaders = (authToken) => {
  let headers = {
    'Content-Type': 'application/json',
    'X-TripAdvisor-UUID': 'D6F0B0ED-279F-4EE2-86EF-3867116D8C8B',
    'Cookie': 'TAUnique=%1%enc%3AS9phklk7QDygu2pQ6URsb10LijWzb%2F%2FN4Wl2czef4WHT5BsMYvhPlw%3D%3D',
    'Content-Length': '74',
    'Connection': 'keep-alive',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C101 Mobile iPhone TAiApp TARX13 taAppVersion=190114021 osName=iOS deviceName=iPhone10,6 osVer=12.1.2 taAppVersionString=29.8 appLang=en_GB mcc=230 mnc=03 connection=wifi',
    'Accept-Language': 'en-GB;q=1, cs-CZ;q=0.9, en-US;q=0.8, es-ES;q=0.7',
    'X-TripAdvisor-API-Key': '3c7beec8-846d-4377-be03-71cae6145fdc',
    'Accept-Encoding': 'br, gzip, deflate'
  }
  if (authToken) {
    headers = {
      'Accept': 'application/json',
      'Authorization': `token ${authToken}`,
      'Accept-Encoding': 'br, gzip, deflate',
      'Accept-Language': 'en-GB;q=1, cs-CZ;q=0.9, en-US;q=0.8, es-ES;q=0.7',
      'X-TripAdvisor-API-Key': '3c7beec8-846d-4377-be03-71cae6145fdc',
      'Content-Type': 'application/json',
      'X-TripAdvisor-Unique': '%1%enc%3AS9phklk7QDygu2pQ6URsb10LijWzb%2F%2FN4Wl2czef4WHT5BsMYvhPlw%3D%3D',
      'X-TripAdvisor-UUID': 'D6F0B0ED-279F-4EE2-86EF-3867116D8C8B',
      'Connection': 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C101 Mobile iPhone TAiApp TARX13 taAppVersion=190114021 osName=iOS deviceName=iPhone10,6 osVer=12.1.2 taAppVersionString=29.8 appLang=en_GB mcc=230 mnc=03 connection=wifi',
      'Cookie': 'TASession=V2ID.E0F41D84B5A4047326A2E37D3634FAD2*SQ.1*LP./api?app_version=190114021&device_id=D6F0B0ED-279F-4EE2-86EF-3867116D8C8B&os=ios&method=config&os_version=12\.1\.2&version=1\.14&devicetype=mobile&abtr=15&namespace=internal&new_session=true&lang=en_GB&dieroll=15*GR.0*TCPAR.48*TBR.14*EXEX.30*ABTR.15*PHTB.29*FS.77*CPU.48*HS.recommended*ES.popularity*DS.5*SAS.popularity*FPS.oldFirst*FA.1*DF.0*TRA.true; TAUnique=%1%enc%3AS9phklk7QDygu2pQ6URsb10LijWzb%2F%2FN4Wl2czef4WHT5BsMYvhPlw%3D%3D'
    }
  }
  return headers;
}

const request = ({ params = {}, method = 'get', path, body = null }) => {
  const authToken = global.APIprops.authToken;
  return new Promise((resolve, reject) => {
    const obj = {
      baseURL: 'https://api.tripadvisor.com',
      url: path,
      method,
      params,
      headers: getHeaders(authToken)
    };
    if (body) obj.data = body;
    axios(obj)
    .then((res) => {
      if (res.data) resolve(res.data);
      else resolve(null);
    })
    .catch(reject)
  })
}

const signInThenMakeRequest = (resolve, reject, props) => {
  signIn({
    email: global.APIprops.email,
    password: global.APIprops.password
  }).then(() => {
    request(props).then(resolve).catch(reject);
  }).catch(reject);
}

const authedRequest = (props) => {
  const authToken = global.APIprops.authToken;
  if (!authToken) {
    return new Promise((resolve, reject) => {
      signInThenMakeRequest(resolve, reject, props);
    });
  }
  return new Promise((resolve, reject) => {
    request(props)
    .then(resolve)
    .catch((error) => {
      if (error.response && error.response.status === 401) { // Unauthorized
        console.log('Unauthorized => re-signing in');
        signInThenMakeRequest(resolve, reject, props);
      } else {
        reject(error);
      }
    });
  });
}

export const signIn = ({ email, password }) => {
  const body = {
    email,
    lang: "en_GB",
    password
  }
  return new Promise((resolve, reject) => {
    request({
      path: '/api/internal/1.15/auth/login',
      method: 'post',
      body
    }).then((res) => {
      console.log('signed in');
      global.APIprops.authToken = res.data.access_token;
      setTimeout(resolve, 1000);
    }).catch(reject);
  });
}

export const getRestaurants = ({ locID, limit, offset }) => {
  return authedRequest({
    path: `/api/internal/1.14/location/${locID}/restaurants`,
    params: {
      autobroaden: 'true',
      base_geocodes_on: 'citymaps',
      currency: 'CZK',
      debug_info: 'currency%3DCZK%2Chas_dates%3Dtrue%2Cscreen_name%3D%28null%29%2Cplacement_name%3D%28null%29%2Clod%3D0',
      dieroll: 15,
      is_restaurant_filters_v2: 'true',
      lang: 'en_GB',
      limit,
      offset,
      restaurant_tagcategory_standalone: 10591,
      show_filters: 'true',
      show_review_highlights: 'true',
      show_seo_terms: 'true',
    }
  })
}
