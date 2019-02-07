import * as firebase from 'firebase/app';
import 'firebase/auth';

export default class Auth {
  availableProviders = {
    'google.com': firebase.auth.GoogleAuthProvider,
    'facebook.com': firebase.auth.FacebookAuthProvider,
    'password': firebase.auth.EmailAuthProvider
  }

  prompt = (type, callback, props) => { }

  onExistingCredential = ({method, credential}) => {
    console.log('Reattempting login with social', method);
    firebase.auth().signInWithPopup(this.getProvider(method)).then(result => {
      console.log('Reauthentication result', result);
      result.user.linkAndRetrieveDataWithCredential(credential).then((usercred) => {
        console.log('New credential successfully linked', usercred);
      }).catch(error => {
        console.log('Credential linking error', error);
      });;
    }).catch(error => {
      console.log('Reauthentication error', error);
    });
  }

  getIdToken = (cb) => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(idToken => {
      this.idToken = idToken;
      cb(idToken);
    }).catch(error => {
      console.log(error);
    });
  }

  getIdTokenResult = (cb) => {
    firebase.auth().currentUser.getIdTokenResult(/* forceRefresh */ false).then(result => {
      this.idToken = result.token;
      cb(result);
    }).catch(error => {
      console.log(error);
    });
  }

  getProvider = (id) => {
    return new this.availableProviders[id];
  }

  subscribeState = (cb) => {
    firebase.auth().onAuthStateChanged(cb);
  }

  fetchMethods = email => {
    return firebase.auth().fetchSignInMethodsForEmail(email);
  }

  createUser = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  loginUser = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  loginSocial = type => {
    console.log('Attempting login with social', type);
    if (!this.availableProviders[type]) throw new Error(`${type} must to be added to the list of available providers`);
    const provider = new this.availableProviders[type];
    firebase.auth().signInWithPopup(provider).then(result => {
      console.log('Authentication result', result);
    }).catch(error => {
      console.log('Authentication error', error);
      const pendingCred = error.credential;
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          firebase.auth().fetchSignInMethodsForEmail(error.email).then((methods) => {
            console.log('Attempting providers', methods);
            let found = false;
            for (let i = 0; i < methods.length; i += 1) {
              const method = methods[i];
              if (this.availableProviders[method]) {
                this.prompt('account-exists', {
                  attempt: type,
                  method,
                  email: error.email,
                  // eslint-disable-next-line no-loop-func
                  action: (params) => {
                    if (method === 'password') {
                      return this.loginUser(error.email, params.password).then(result => {
                        console.log('Reauthentication result', result);
                        result.user.linkAndRetrieveDataWithCredential(pendingCred).then((usercred) => {
                          console.log('New credential successfully linked', usercred);
                        }).catch(error => {
                          console.log('Credential linking error', error);
                        });
                      });
                    }
                    console.log('Reattempting login with social', method);
                    return firebase.auth().signInWithPopup(this.getProvider(method)).then(result => {
                      console.log('Reauthentication result', result);
                      result.user.linkAndRetrieveDataWithCredential(pendingCred).then((usercred) => {
                        console.log('New credential successfully linked', usercred);
                      }).catch(error => {
                        console.log('Credential linking error', error);
                      });
                    }).catch(error => {
                      console.log('Reauthentication error', error);
                    });
                  }
                });
                found = true;
                break;
              }
            }
            if (!found) {
              // TODO: display an error message
              alert(error.message);
            }
          });
          break;
        default:
          break;
      }
    });
  }

  logout = () => {
    firebase.auth().signOut().then(() => {
      console.log('Logout successful');
    }, (error) => {
      console.log('Logout error', error);
    });
  }
}
