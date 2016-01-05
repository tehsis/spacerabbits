class Game {
    constructor (args: {width: number, height: number, element: string}) {
        this.game = new Phaser.Game(args.width, args.height, Phaser.AUTO, args.element, 
            { 
                preload: this.preload, 
                create: this.create 
            });
    }
   
    game: Phaser.Game
    
    preload() {
    }
    
    create() {
        this.game.add.text(16, 16, 'Hello world', {
            fontSize: '32px',
            fill: '#fff'
        });

    }
}

export {Game};