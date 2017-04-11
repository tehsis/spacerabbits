import { h, render, Component } from 'preact';

interface Scores {
  player: string,
  points: number
}

const LEADERBOARD_CLASSNAME = 'modal-leaderboard';
const MODAL_HIDE = 'modal-hide';
const MODAL_SHOW = 'modal-show';

interface LeaderBoardComponentProps {
  onPlayButtonClick: (Event) => void
  onCloseButtonClick: (Event) => void
  leaderboard: Array<Scores>
}

interface LeaderBoardComponentState {
  show: Boolean
}

class LeaderBoardComponent extends Component<LeaderBoardComponentProps, LeaderBoardComponentState> {

  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
  }
  
  onCloseButtonClick (e) {
    this.hide();
    this.props.onCloseButtonClick(e);
  }

  onPlayButtonClick(e) {
    console.log('hiding');
    this.hide();
    this.props.onPlayButtonClick(e);
  }

  show() {
    this.setState({
      show: true
    });
  }


  hide() {
    this.setState({
      show: false
    });
  }
  
  render() {
    return <div class={`${LEADERBOARD_CLASSNAME} ${this.state.show ? MODAL_SHOW : MODAL_HIDE }`}>
      <button class="close-button" onClick={ this.onCloseButtonClick.bind(this) }></button>
      <div class="leaderboard-header">
        <h2>Leaderboard</h2>
      </div>
      <ol>
        { this.props.leaderboard.map((score, index) => <li><span class="player-name">{score.player}</span>  <span class="player-points">{score.points}</span></li>) }
      </ol>
      <button class="play-button" onClick={this.onPlayButtonClick.bind(this)}>play</button>
    </div>
  }
}

export default class LeaderBoardModal {
  el: HTMLElement
  parent: HTMLElement
  component: LeaderBoardComponent
  element: Element
  onPlay: (e) => void
  onClose: (e) => void

  constructor(onPlay: (e: Event) => void, onClose: (e: Event) => void, parent: HTMLElement) {
    this.onPlay = onPlay;
    this.onClose = onClose;
    this.parent = parent;
  }

  show(leaderboard: Array<Scores>) {
    try {
      return void this.component.show();
    } catch (e) {
      this.element = render(<LeaderBoardComponent onCloseButtonClick={this.onClose} onPlayButtonClick={this.onPlay} leaderboard={leaderboard} />, this.parent);
     
     // TODO: Find a better way to interact with components on non-react apps.
     this.component = (this.element as any)._component;
    }
  }
}