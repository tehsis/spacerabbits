import {h, Component, render } from 'preact';
import { GAME, API } from '../const';
import {default as state, IGameState} from '../game-state';

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
    state.openModal('leaderboard');
    state.postScore();
  }

  onFbLogin() {
    state.loginFacebook();
  }

  render() {
    if ('leaderboard' === this.state.ui.modal) {
      return <Leaderboard loading={this.state.ui.loading} current={this.state.current} leaderboard={this.state.leaderboard} onCloseButtonClick={ this.onClose } onPlayButtonClick={ this.onPlay } />
    }

    if ('game-over' === this.state.ui.modal) {
      return <GameOver loading={this.state.ui.loading} points={ this.state.score } onCloseButtonClick={ this.onClose } onPlayButtonClick={ this.onShare } onFbClick={ this.onFbLogin } authToken={ this.state.auth_token } />
    }
  }
}

export default function (parent) {
  render(<App />, parent);
}