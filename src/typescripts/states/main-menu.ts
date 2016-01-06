class MainMenu extends Phaser.State {
        create() {
         this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY, 'Main Menu', {
            fontSize: '50px',
            fill: '#f00'
        });
    }
}

export { MainMenu };