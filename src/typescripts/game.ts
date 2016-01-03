class Game {
    constructor () {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', 
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