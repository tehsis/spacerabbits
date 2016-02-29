interface IGameConstructorArgs {
    width: number;
    height: number;
    element: string;
    states: {};
    default_state?: string;
}

class Game {
    states: {}
    
    constructor (args: IGameConstructorArgs) {
        this.game = new Phaser.Game(args.width, args.height, Phaser.AUTO, args.element);
        this.states = args.states;
        this.loadStates(args.default_state || 'Boot');
    }
   
    game: Phaser.Game
    
    private loadStates(default_state: string) {
        Object.keys(this.states).forEach((state_name) => this.game.state.add(state_name, this.states[state_name]));
        
        this.game.state.start(default_state)
    }
}

export { Game };