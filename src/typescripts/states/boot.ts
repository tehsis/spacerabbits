class Boot extends Phaser.State {
    create() {
       this.game.state.start('Loader');
    }
}

export { Boot };