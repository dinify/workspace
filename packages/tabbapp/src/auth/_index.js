import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'tabb.auth0.com',
    clientID: 'VLW8Wnz9w3rpQc7kKxMgwG7liEY505C1',
    redirectUri: 'https://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  accessToken;

  idToken;

  expiresAt;

  userProfile;

  constructor() {
    this.expiresAt = localStorage.getItem('expiresAt');
    this.idToken = localStorage.getItem('idToken');
    this.accessToken = localStorage.getItem('accessToken');

    if (this.accessToken) this.fetchProfile(this.accessToken);
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.fetchProfile(authResult.accessToken);
      } else if (err) {
        // history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  fetchProfile = accessToken => {
    this.auth0.client.userInfo(accessToken, (err, userInfo) => {
      console.log('userInfo', userInfo);
      this.userProfile = userInfo;
    })
  }

  getAccessToken = () => {
    return this.accessToken;
  }

  getIdToken = () => {
    return this.idToken;
  }

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('expiresAt', expiresAt);
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('idTokenPayload', JSON.stringify(authResult.idTokenPayload));
  }

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    this.userProfile = null;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userProfile');
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  loginSocial = type => {
    let connection;
    switch (type) {
      case 'google':
        connection = 'google-oauth2';
        break;
      case 'facebook':
        connection = 'facebook';
        break;
      default:
        connection = null;
        break;
    }
    this.auth0.authorize({
      connection // use connection identifier
    });
  }

  login = () => {
    this.auth0.authorize();
  }
}
