import { GameState } from './game-state';

import { GAME } from './const';

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
        this.game = new Phaser.Game(GAME.SCREEN.BASE_WIDTH, GAME.SCREEN.BASE_HEIGHT, Phaser.WEBGL, args.element);
        
        this.states = args.states;
        this.args = args;
        this.gameState = args.gameState;
    }
   
    game: Phaser.Game

    private loadStates(default_state: string) {
        Object.keys(this.states).forEach((state_name) => this.game.state.add(state_name, this.states[state_name]));
        this.game.state.start(this.args.default_state);

        this.gameState.onChange((state, prev_state) => {
            if ((state.screen !== prev_state.screen)) {
                this.game.state.start(state.screen);
            }
        });
    }

    init () {
       this.loadStates(this.args.default_state);
    }
}

export { Game };
