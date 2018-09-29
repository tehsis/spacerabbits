import { API } from '../const';

declare global {
  interface FacebookAuthResponse {
    accessToken: string,
    expiresIn: string,
    signedRequest: string,
    userID: string
  }

  interface FacebookResponse {
    status: 'connected' | 'not_authorized' | 'unknown';
    authResponse: FacebookAuthResponse
  }

  interface FacebookConnectPlugin {
    login: (permissions: Array<string>, onSuccess: (response: FacebookResponse) => void, onError: (response: any) => void) => void;
    getLoginStatus: (callback: (response: any) => void) => void;
    showDialog: (options: any, onSuccess: (any) => any, onError: (any) => any) => void
  }

  let facebookConnectPlugin: FacebookConnectPlugin;
  let FB: FacebookConnectPlugin;
}


const Credentials = {
  Facebook: async function () {
    facebookConnectPlugin = window.cordova ? facebookConnectPlugin : FB;
    return new Promise((resolve, reject) => {
      console.log("Login with facebook api");
      facebookConnectPlugin.getLoginStatus(function(response) {  
        console.log('facebookConnectPlugin.getLoginStatus', response);
        if (response.status === 'connected') {
          return resolve(response.authResponse.accessToken);
        } else if (response.status === 'not_authorized') {
          return reject()
        } else {
          facebookConnectPlugin.login([''], function (response) {
            if (response.authResponse) {
              resolve(response.authResponse.accessToken);
            } else {
              reject(response);
            }
            }, function (error) {
              reject(error);
            });
        }
      });
    });
  }
};

class Login {
  auth_token: string
  profile: string

   private getAuthToken(method): Promise<string> {
     return new Promise((resolve, reject) => {
      if (this.auth_token) {
        return resolve(this.auth_token);
      }
      console.log('cred method', method)
      Credentials[method]()
        .then((credentials) => {
          this.auth(method, credentials)
            .then((auth_token) => {
              this.auth_token = auth_token;
              return resolve(this.auth_token);
            });
        }).catch((err) => console.log(err));
     });
  }

  auth (method: string, credentials: string): Promise<string> {
    const form = new FormData();
    form.append('method', method);
    form.append('credentials', credentials);

    return fetch(API.login, {
      method: 'POST',
      body: form
    }).then(res => {
        if (res.status >= 400) {
			    throw new Error("Bad response from server");
		    }

        return res.json()
      })  
      .then(json => json.access_token)
      .catch((res) => {
        alert(res);
      })
  }

  share (points: number) {
    return new Promise(function (resolve, reject) {
      facebookConnectPlugin.showDialog({
        method: "share",
        href: "https://rabbitwars.com",
        caption: `Wow! I've made ${points} in Space Rabbits!`,
        description: "I've helped Robbit to save his planet!",
        picture: 'http://example.com/image.png',
        share_feedWeb: true,
      }, function () {
        resolve(arguments)
      }, function () {
        reject(arguments)
      });
    });
    
  }

  logout() {
    delete this.profile;
    delete this.auth_token;
  }

  login(method) {
    return this.getAuthToken(method);
  }
}

export default new Login();