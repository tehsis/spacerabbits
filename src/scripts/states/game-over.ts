class GameOver extends Phaser.State {
  create() {
    this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY, 'Game', {
       font: 'bold 32px Tron',
       fill: '#fff'
     });

     this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY+100, 'Over', {
        font: 'bold 32px Tron',
        fill: '#fff'
      });
   }

}

export default GameOver;
