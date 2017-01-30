/*
 * This is the game state.
 * It should remains as a JS plain object.
 * So it can be stored and mutated (!) by any
 * other class here.
*/

declare global {
  interface NativeStorageInterface {
    setItem(key: string, value: Object, onSuccess: () => void, onError: (error: Object) => void )
    getItem(key: string, onSuccess: (data: Object) => void, onError: (error: Object) => void)
  }

  let NativeStorage: NativeStorageInterface;
}

interface IGameState {
  username: string;
  score: number;
  life: number;
}

const initialState: IGameState = {
  username: '',
  score: 0,
  life: 3
};

export class GameState {
  private state: IGameState = initialState;

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

  serialize() {
    return JSON.stringify(this.state);
  }

  getJSON() {
    return this.state;
  }

  private setState(state) {
    this.state = Object.assign({}, this.state, state)
  }
}

const gameState = new GameState();

export default gameState;