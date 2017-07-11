import { GameState } from './game-state';

interface IGameConstructorArgs {
    width: number|string;
    height: number|string;
    element: string;
    states: {};
    gameState?
    default_state: string;
}

class Game {
    states: {}
    gameState: GameState
    args: IGameConstructorArgs
    
    constructor (args: IGameConstructorArgs) {
        this.game = new Phaser.Game(args.width, args.height, Phaser.WEBGL, args.element);
        this.states = args.states;
        this.args = args;

        this.gameState = args.gameState;
    }
   
    game: Phaser.Game
    
    private loadStates(default_state: string) {
        Object.keys(this.states).forEach((state_name) => this.game.state.add(state_name, this.states[state_name]));
        
        this.gameState.onChange((state, prev_state) => {
          if (state.screen !== prev_state.screen) {
            this.game.state.start(state.screen);
          }
        });

        this.gameState.goTo(this.args.default_state);
    }

    init () {
       this.loadStates(this.args.default_state);
    }
}

export { Game };