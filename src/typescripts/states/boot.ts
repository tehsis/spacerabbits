class Boot extends Phaser.State {
    create() {
        this.game.add.text(16, 16, 'Hello world', {
            fontSize: '32px',
            fill: '#fff'
        });
    }
}

export { Boot };