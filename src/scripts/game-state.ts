/*
 * This is the game state.
 * It should remains as a JS plain object.
 * So it can be stored and mutated (!) by any
 * other class here.
*/

import { GAME, API } from './const';
import 'isomorphic-fetch';

declare global {
  interface NativeStorageInterface {
    setItem(key: string, value: Object, onSuccess: () => void, onError: (error: Object) => void )
    getItem(key: string, onSuccess: (data: Object) => void, onError: (error: Object) => void)
  }

  let NativeStorage: NativeStorageInterface;
}

interface Score {
  Username: string,
  Points: number
}

export interface IGameState {
  username?: string
  score: number
  life: number
  gameOver: Boolean
  leaderboard?: Array<Score>
  screen: string
  ui: {
    loading: Boolean
    modal?: 'leaderboard'|'game-over'
  }
  auth_token: string
}

const initialState: IGameState = {
  score: 0,
  life: GAME.INITIAL_LIFES,
  gameOver: false,
  screen: '',
  ui: {
    loading: false
  },
  auth_token: null
};


export class GameState {
  private state: IGameState = initialState;
  private prev_state: IGameState = initialState;
  private listeners: Array<(state: IGameState, prev_state: IGameState) => void> = [];

  constructor () {
    this.load();
    this.reset();
  }

  reset() {
    const username = this.state.username;
    this.setState(initialState);
    this.setState({ username })
  }

  increaseScore (amount) {
    this.setState({score: this.state.score + amount});
  }

  decreaseLife (amount) {
    this.setState({life : this.state.life - amount})
  }
  
  save () {
    return new Promise((resolve, reject) => {
      NativeStorage.setItem(`rabbit-wars`, this.state, () => {
        resolve();
      }, function (e) {
        reject(e);
      });
    });
  }

  goTo(screen) {
    this.setState({
      screen
    });
  }

  getUserName () {
    return this.state.username;
  }

  setUsername (username: string) {
    this.setState({ username });
  }

  getScore () {
    return this.state.score;
  }

  getLifes () {
    return this.state.life;
  }

  openModal (name) {
    return this.setUI({
      modal: name
    });
  }

  closeModal () {
    return this.setUI({
      modal: null
    });
  }

  load () {
    return new Promise((resolve, reject) => {
      NativeStorage.getItem(`rabbit-wars`, (state) => {
         this.setState(state);
        resolve();
      }, () => {
        this.setState(initialState);
        reject();
      });
    });
  }

  private change() {
    this.listeners.forEach((cb) => {
      cb(this.state, this.prev_state)
    });
  }

  onChange (cb: (state: IGameState, prev_state: IGameState) => void) {
    this.listeners.push(cb);
  }

  isOver(finish?: Boolean) {
    if (finish !== undefined) {
      this.state.gameOver = finish;
    }

    return this.state.gameOver;
  }

  serialize() {
    return JSON.stringify(this.state);
  }

  getJSON() {
    return this.state;
  }

  getState() {
    return Object.assign({}, this.state);
  }

  getLeaderboard() {
    this.setUI({
      loading: true
    });

    return fetch(API.leaderboard)
      .then((result) => result.json())
      .then((leaderboard) => {
        this.setState({
          leaderboard: leaderboard || []
        });
        this.setUI({
          loading: false
        });
        (window as any).w = this.state;
      });
  }

  setAuthToken(auth_token) {
    this.setState({ auth_token });
  }

  getAuthToken() {
    return this.state.auth_token;
  }

  private setUI(uiState) {
    this.state.ui = Object.assign({}, this.state.ui, uiState);
    this.change();
  }

  private setState(state) {
    this.state = Object.assign({}, this.state, state)
    this.change();
  }
}

const gameState = new GameState();

export default gameState;