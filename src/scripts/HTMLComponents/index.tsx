import {h, Component, render } from 'preact';
import { GAME, API } from '../const';
import {default as state, IGameState} from '../game-state';

import login from '../extras/login';


import { Leaderboard, GameOver } from './modals';

class App extends Component<{}, IGameState> {
  constructor () {
    super();
    this.state = state.getState();
  }

  componentDidMount() {
    state.onChange(() => this.setState(state.getState()));
  }

  onClose() {
    state.closeModal();
  }

  onPlay() {
    state.goTo('MainGame');
  }

  onShare() {
    const authToken = state.getAuthToken(); 
    const form = new FormData();
    form.append('score', `${state.getScore()}`);

    if (authToken) {
      fetch(API.leaderboard, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`
          },
          body: form
      }).then(() => {
        return state.getLeaderboard().then(() => {
          state.openModal('leaderboard');  
        })
      }).catch(() => {
        console.log('failed posting to leaderboard')
      });
    }
  }

  onFbLogin() {
    login.login('Facebook').then((accessToken) => state.setAuthToken(accessToken));
  }

  render() {
    if ('leaderboard' === this.state.ui.modal) {
      return <Leaderboard leaderboard={this.state.leaderboard} onCloseButtonClick={ this.onClose } onPlayButtonClick={ this.onPlay } />
    }

    if ('game-over' === this.state.ui.modal) {
      console.log('state', this.state.auth_token);
      return <GameOver points={ this.state.score } onCloseButtonClick={ this.onClose } onPlayButtonClick={ this.onShare } onFbClick={ this.onFbLogin } authToken={ this.state.auth_token } />
    }
  }
}

export default function (parent) {
  render(<App />, parent);
}