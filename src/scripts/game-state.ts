/*
 * This is the game state.
 * It should remains as a JS plain object.
 * So it can be stored and mutated (!) by any
 * other class here.
*/

import { GAME, API } from './const';
import login from './extras/login';

import storage from './extras/storage';

import 'isomorphic-fetch';

interface Score {
  ID: string,
  Username: string,
  UserPic: string,
  Points: number
}

export interface IGameState {
  username?: string
  score: number
  life: number
  gameOver: Boolean
  leaderboard?: Array<Score>
  current?: Score
  highScore?: number
  screen: string
  ui: {
    loading: Boolean
    modal?: 'leaderboard'|'game-over'
  }
  auth_token: string
}

function FBLeaderBoardEntryToScore(entry): Score {
  return {
    ID: entry.getPlayer().getID(),
    Username: entry.getPlayer().getName(),
    Points: entry.getScore(),
    UserPic: entry.getPlayer().getPhoto()
  }
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

  reset() {
    const username = this.state.username;
    const screen = this.state.screen;
    this.setState(initialState);
    this.setState({ username, screen });
  }

  setScore(amount) {
    this.setState({score: amount})
  }

  increaseScore (amount) {
    this.setState({score: this.state.score + amount});
  }

  decreaseLife (amount) {
    this.setState({life : this.state.life - amount})
  }

  increaseLife(amount) {
    this.setState({life: this.state.life + amount})
  }
  
  async save () {
    return await storage.setItem('rabbit-wars', this.state);
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

  async postScore () {
    this.setUI({
      loading: true
    });

    try {
      // TODO: implement
    } catch (e) {
      console.log(e);
    }
  }

  async getHighScore() {
    this.setUI({
      loading: true
    });

    try {
     // TODO: Implement
    } catch (e) {

    }
  }

  closeModal () {
    return this.setUI({
      modal: null
    });
  }

  async load () {
    try {
      const state = await storage.getItem('rabbit-wars') as IGameState;
      this.state = state;
      this.setState(state);
    } catch (e) {
      this.setState(initialState);
    }
  }

  loginFacebook() {
    this.setUI({
      loading: true
    });
    login.login('Facebook').then((accessToken) => {
      this.setUI({
        loading: false
      });
      this.setAuthToken(accessToken)
    });    
  }

  private change() {
    this.save();
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

  async getLeaderboard() {
    this.setUI({
      loading: true
    })
    try { 
     // TODO: Implement
    } catch (e) {
      this.setState({
        leaderboard: []
      });
    }
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
    this.prev_state = this.state;
    this.state = Object.assign({}, this.state, state)
    this.change();
  }
}

const gameState = new GameState();

export default gameState;