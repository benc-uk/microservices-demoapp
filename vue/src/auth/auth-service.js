//
// Taken from https://github.com/sunilbandla/vue-msal-sample
//
/* eslint-disable */

import * as Msal from 'msal';

export default class AuthService {

  constructor(appClientId, redirectPath) {
    let redirectUri = window.location.origin + redirectPath

    this.applicationConfig = {
      clientID: appClientId,
      graphScopes: ['user.read']
    };
    this.app = new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      '',
      () => {
        // callback for login redirect
      },
      {
        redirectUri
      }
    );
  }

  login() {
    return this.app.loginPopup(this.applicationConfig.graphScopes).then(
      idToken => {
        const user = this.app.getUser();
        if (user) {
          return user;
        } else {
          return null;
        }
      },
      () => {
        return null;
      }
    );
  };

  logout() {
    this.app.logout();
  };

  getToken() {
    return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
      accessToken => {
        return accessToken;
      },
      error => {
        return this.app
          .acquireTokenPopup(this.applicationConfig.graphScopes)
          .then(
            accessToken => {
              return accessToken;
            },
            err => {
              console.error(err);
            }
          );
      }
    );
  };
}