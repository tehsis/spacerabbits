class GameOver extends Phaser.State {
  create() {
    this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY-100, 'Game', {
       font: 'bold 32px Tron',
       fill: '#fff'
     });

     this.game.add.text(this.game.world.centerX - 50, this.game.world.centerY-50, 'Over', {
        font: 'bold 32px Tron',
        fill: '#fff'
      });

       this.game.input.onTap.add(() => {
            this.game.state.start('MainGame');
        });
   }

}

export default GameOver;
