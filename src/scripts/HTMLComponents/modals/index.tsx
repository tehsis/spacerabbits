import { h, render, Component } from 'preact';

interface Score {
  ID: string,
  Username: string,
  Points: number,
  UserPic: string
}

const MODAL_CLASSNAME = 'modal';
const MODAL_HIDE = 'modal-hide';
const MODAL_SHOW = 'modal-show';
const MODAL_LOADING = 'modal-loading';

export interface ModalComponentProps {
  loading: Boolean,
  onPlayButtonClick: (Event) => void
  onCloseButtonClick: (Event) => void
}

export interface ModalComponentState { 
    show: boolean
}

export class Modal<P extends ModalComponentProps, S extends ModalComponentState> extends Component<P, S> {
  constructor () {
    super();
    this.show();
  }
  
  onCloseButtonClick (e) {
    this.hide();
    this.props.onCloseButtonClick(e);
  }

  onPlayButtonClick(e) {
    this.hide();
    this.props.onPlayButtonClick(e);
  }

  hide() {
    this.setState({
      show: false
    } as S);
  }

  show() {
    this.setState({
      show: true
    } as S);
  }

  body() { }

  bodyLoad() {
    return <div className="modal-loading">
      <div className="loading-image"></div>
    </div>
  }

  closeButton() {
    return <button class="close-button" onClick={ this.onCloseButtonClick.bind(this) }></button>;
  }

  header() {}

  footer() {
    return null;
  }

  render () {
    return <div class={ `${MODAL_CLASSNAME} ${this.state.show ? MODAL_SHOW : MODAL_HIDE}` }>
      { this.closeButton() }
      { this.header() }
      { this.props.loading ? this.bodyLoad() : this.body() }
      <div class="modal-footer">
        { this.footer() }
      </div>
    </div>
  }
}


interface LeaderBoardComponentState extends ModalComponentState {}

interface LeaderBoardComponentProps extends ModalComponentProps {
    leaderboard: Array<Score>
    current: Score
 }


const currentPositionElement = (leaderboard: Score[], current: Score) => {
  const currentPlayerInLeaderboard = leaderboard.some((entry) => entry.ID === current.ID);
  if (currentPlayerInLeaderboard) {
    return <div class="leaderboard-current">
      Awesome! You are on the TOP. <br />
      Make sure you stay there!
    </div>
  }

  return <div class="leaderboard-current">
    Your high score is: {current.Points}!<br /> 
    Keep Fighting to reach the TOP!
   </div>
}

export class Leaderboard extends Modal<LeaderBoardComponentProps, LeaderBoardComponentState> {
   
  header() {
    return <div class="modal-header">
      <h2>Leaderboard</h2>
    </div>
  } 
  
  body() {
    if (!Array.isArray(this.props.leaderboard) || this.props.leaderboard.length === 0) {
      return <div>
       The leaderboard is not available now! Grab a carrot and try again later.
      </div>
    }

    return <div class="leaderboard-container">
        <table class="score-list">
          { 
            this.props.leaderboard.map((score) => 
              <tr class="score-item">
                <td class="score-item-field field-photo"><img class="score-photo" src={score.UserPic} alt={score.Username} /></td>
                <td class="score-item-field"><span class="player-name">{ score.Username }</span></td>
                <td class="score-item-field field-points"><span class="player-points">{ score.Points }</span></td>
              </tr>
            ).slice(0, 3) 
          }
      </table>
      {currentPositionElement(this.props.leaderboard, this.props.current)}
    </div>
  }

  footer() {
    return <button class="play-button" onClick={this.onPlayButtonClick.bind(this)}>play</button>
  }

}

interface GameOverComponentState extends ModalComponentState {}

interface GameOverComponentProps extends ModalComponentProps {
  onFbClick: () => void
  authToken: string
  points: number
  highScore?: number
}

export class GameOver extends Modal<GameOverComponentProps, GameOverComponentState> {
   header() {
    return <div class="modal-header">
      <h2>Game Over</h2>
    </div>
  }

  body() {
    const scoreDiff = this.props.highScore - this.props.points;
    console.log('props', this.props)
    return <div>
      <div class="game-over-points">
        <h3>You scored</h3>
        { this.props.points } pts
      </div>
      { 
        scoreDiff <= 0 
        ? 'Congratulations! You got a new high score!'
        : <div><h3>Your highest score was:</h3><span>{ this.props.highScore }</span></div>
      }
      {this.props.loading ? this.bodyLoad() : ''}
    </div>
  }

  footer() {
    return <button class="play-button" onClick={this.onPlayButtonClick.bind(this)}>Place your score!</button>
  }

}
