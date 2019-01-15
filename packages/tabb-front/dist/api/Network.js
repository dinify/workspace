"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Request = Request;
exports.Get = Get;
exports.Post = Post;
exports.Put = Put;
exports.Delete = Delete;

var _FN = require("../lib/FN");

function Request(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var noToken = arguments.length > 2 ? arguments[2] : undefined;
  return new Promise(function (resolve, reject) {
    if (!url) reject(new Error('URL parameter required'));
    var token = (0, _FN.getCookie)('access_token');
    var defaultOptions = {};

    if (!options.headers) {
      defaultOptions.headers = {
        'Content-Type': 'application/json'
      };
    } else {
      defaultOptions.headers = options.headers;
    }

    if (token.length > 0 && !noToken) defaultOptions.headers.Authorization = "Bearer ".concat(token);
    var allOptions = Object.assign(options, defaultOptions); //  console.log(options);

    fetch(url, allOptions).then(function (res) {
      return res.text().then(function (text) {
        return {
          status: res.status,
          text: text
        };
      });
    }).then(function (res) {
      //  console.log(res.status);
<<<<<<< HEAD
=======
      // if (res.status === 401 && window.location.pathname !== '/login') window.location.replace('/login')
>>>>>>> 50ad0fa2d9303dfa73719dfab8cbda6c3e2aec95
      try {
        var txt = res.text; //  .replace('/**/','')

        if (txt.length < 5) return {
          status: res.status,
          json: null
        };
        return {
          status: res.status,
          json: JSON.parse(txt)
        };
      } catch (err) {
        console.log(err, 'HTTP Error');
        return {
          status: res.status,
          json: null
        };
      }
    }).then(function (_ref) {
      var status = _ref.status,
          json = _ref.json;

      if (status >= 200 && status < 300) {
        // success
        if (json) {
          if (json.metadata) resolve(json);else resolve(json.data || json);
        } else resolve('no json');
      } else {
        // error
        if (json) {
          reject(json.errors || json);
          return;
        }

        reject(new Error('No json in response'));
      }
    }).catch(function (e) {
      //  console.log('Request failed', e)
      reject(e);
    });
  });
}

var buildURL = function buildURL(_ref2) {
  var path = _ref2.path;
  return "https://api.dev.tabb.global/".concat(path);
};

function Get(urlParts, cookie) {
  var opts = {
    method: 'GET'
  };
  if (cookie) opts.headers = {
    cookie: cookie
  };
  return Request(buildURL(urlParts), opts);
}

function Post(urlParts) {
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Request(buildURL(urlParts), {
    method: 'POST',
    body: JSON.stringify(body)
  }, urlParts.noToken);
}

function Put(urlParts) {
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Request(buildURL(urlParts), {
    method: 'PUT',
    body: JSON.stringify(body)
  });
}

function Delete(urlParts) {
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Request(buildURL(urlParts), {
    method: 'DELETE',
    body: JSON.stringify(body)
  });
}