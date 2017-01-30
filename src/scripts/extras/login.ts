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
}

class Login {
  token: string
  profile: string

   private getToken(): Promise<string> {
     return new Promise(function (resolve, reject) {
      facebookConnectPlugin.getLoginStatus(function(response) {  
        console.log('get login status', response)
        if (response.status === 'connected') {
          return resolve(response.authResponse.accessToken);
        } else if (response.status === 'not_authorized') {
          return reject()
        } else {
          facebookConnectPlugin.login([''], function (response) {
            console.log(arguments)
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
    delete this.token;
  }

  async login() {
    let response = await this.getToken();

    return response;
  }
  }

export default new Login();