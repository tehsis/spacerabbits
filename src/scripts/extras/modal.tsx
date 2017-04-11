import { h, render, Component } from 'preact';

interface LeaderboardModalState {
  leaderboard: Array<any>,
  hidden: Boolean
}

interface LeaderboardModalProps {
  onCloseButtonClick: (e: Event) => void,
  onPlayButtonClick: (e: Event) => void
}

class LeaderboardModal extends Component<LeaderboardModalProps, LeaderboardModalState> {
  render() {
    return <div>
      <button className="close-button" onClick={ this.props.onCloseButtonClick.bind(this) }>
        x
      </button>
      <div>
        <h2>Leaderboard</h2>
      </div>
      <ol>
        {this.state.leaderboard.map((score, index) => <li>${score.player} - ${score.points}</li>)}
      </ol>
      <button className="play-button" onClick={this.props.onPlayButtonClick.bind(this)}>
        play
      </button>
    </div>
  }
}