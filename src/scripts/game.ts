interface IGameConstructorArgs {
    width: number|string;
    height: number|string;
    element: string;
    states: {};
    default_state: string;
}

class Game {
    states: {}
    args: IGameConstructorArgs
    
    constructor (args: IGameConstructorArgs) {
        this.game = new Phaser.Game(args.width, args.height, Phaser.WEBGL, args.element);
        this.states = args.states;
        this.args = args;
    }
   
    game: Phaser.Game
    
    private loadStates(default_state: string) {
        Object.keys(this.states).forEach((state_name) => this.game.state.add(state_name, this.states[state_name]));
        
        this.game.state.start(default_state)
    }

    init () {
       this.loadStates(this.args.default_state);
    }
}

export { Game };