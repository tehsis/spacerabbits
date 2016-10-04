/*
 * This is the game state.
 * It should remains as a JS plain object.
 * So it can be stored and mutated (!) by any
 * other class here.
*/

interface IGameState {
  score: number;
  life: number;
}

const initialState: IGameState = {
  score: 0,
  life: 3
};

export default class GameState {
  state: IGameState = initialState;

  constructor() {}

  increaseScore (amount) {
    // We probably want to move to immutable states to handle 
    // loads/saves
    this.state.score = this.state.score + amount;
  }

  decreaseLife (amount) {
    this.state.life = this.state.life - amount;
  }
  
  save (id) {
    window.localStorage.setItem(`rabbit-wars-${id}`, this.serialize());
  }

  getScore () {
    return this.state.score;
  }

  getLifes () {
    return this.state.life;
  }

  load (id) {
    const state = window.localStorage.getItem(`rabbit-wars-${id}`);
    try {
      this.state = JSON.parse(state);
    } catch (e) {
      this.state = initialState;
    }
  }

  serialize() {
    return JSON.stringify(this.state);
  }
}