class Loader extends Phaser.State {
    create() {
         this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY, 'Loading...', {
            fontSize: '32px',
            fill: '#fff'
        });
        
        setTimeout(() => {
            this.game.state.start('MainMenu');
        }, 5000);
    }
}

export { Loader };