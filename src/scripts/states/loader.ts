class Loader extends Phaser.State {
    create() {
         this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY, 'Loading...', {
            font: 'bold 32px Tron',
            fill: '#fff'
        });
        
        setTimeout(() => {
            this.game.state.start('MainMenu');
        }, 5000);
    }
    
    
}

export { Loader };