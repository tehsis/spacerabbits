import { h, render, Component } from 'preact';

interface Score {
  Username: string,
  Points: number
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

  footer() {}

  render () {
    return <div class={ MODAL_CLASSNAME }>
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

    return <ol>
      { this.props.leaderboard.map((score) => <li><span class="player-name">{ score.Username }</span><span class="player-points">{ score.Points }</span></li>) }
    </ol>
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
}

export class GameOver extends Modal<GameOverComponentProps, GameOverComponentState> {
   header() {
    return <div class="modal-header">
      <h2>Game Over</h2>
    </div>
  }

  body() {
    //        <button class="logo logo-twitter"></button>

    let body = <div>
      <div class="game-over-share">
        <button onClick={ this.props.onFbClick } class="logo logo-facebook"></button>
      </div>
      <div class="game-over-instructions">
        login to place your score into the leaderboard
      </div>
    </div>;

    if (this.props.authToken) {
      body = <div class="game-over-instructions">
        Place your score in the leaderboard!
      </div>
    }
    
    if (this.props.loading) {
      body = this.bodyLoad();
    }

    return <div>
      <div class="game-over-points">
        { this.props.points } pts
      </div>
      {body}
    </div>
  }

  footer() {
    const disabled = !this.props.authToken;
    return <button disabled={disabled} class="play-button" onClick={this.onPlayButtonClick.bind(this)}>send score!</button>
  }

}
