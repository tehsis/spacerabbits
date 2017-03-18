import { h, render } from 'preact';

interface Scores {
  player: string,
  points: number
}

const LEADERBOARD_CLASSNAME = 'modal-leaderboard';
const MODAL_HIDE = 'modal-hide';
const MODAL_SHOW = 'modal-show';

// Todo: Implement decorator
export default class LeaderBoardModal {
  el: HTMLElement
  parent: HTMLElement

  constructor(x: number, y: number, parent: HTMLElement) {
    this.el = document.createElement('div')
    this.el.classList.add(LEADERBOARD_CLASSNAME);
    this.parent = parent;
  }

  show(leaderboard: Array<Scores>, onPlayButton: (e: Event) => void, hide?: boolean) {
    render(<div className={LEADERBOARD_CLASSNAME + ` ${hide ? MODAL_HIDE : MODAL_SHOW }`}>
      { this._makeCloseButton() }
      { this._makeHeader() }
      { this._makeList(leaderboard) }
      { this._makeButton(onPlayButton) }
    </div>, this.parent);
  }

  hide() {
    this.show([], () => null, true);
  }

  _makeCloseButton() {
    return <button className="close-button" onClick={ this.hide.bind(this) }>
      x
    </button>
  }

  _makeButton(cb: (e: Event) => void) {
    return <button className="play-button" onClick={cb}>
      play
    </button>
  }

  _makeHeader() {
    return <div>
      <h2>Leaderboard</h2>
    </div>
  }

  _makeList(leaderboard: Array<Scores>) {
    return <ol>
      { leaderboard.map((score, index) => <li>${score.player} - ${score.points}</li>) }
    </ol>
  }
}