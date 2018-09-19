import gameState from '../game-state';
import user from '../extras/users';
import 'isomorphic-fetch';

class GameOver extends Phaser.State {
  create() {
    let stars = this.game.add.sprite(0, 0, 'stars');
    stars.scale.setTo(0.5, 0.5);

    this.game.add.text(this.game.world.centerX - 80, this.game.world.centerY-100, 'Game', {
       font: 'bold 32px Tron',
       fill: '#fff'
     });

     this.game.add.text(this.game.world.centerX - 80, this.game.world.centerY-50, 'Over', {
        font: 'bold 32px Tron',
        fill: '#fff'
      });


      this.game.add.text(this.game.world.centerX - 90, this.game.world.centerY + 150, "Your score: " + gameState.getScore(), {
        font: 'bold 20px spacemono',
        fill: '#fff'
      });

      const share = this.game.add.text(this.game.world.centerX - 40, this.game.world.centerY + 200, "Share", {
        font: 'bold 20px spacemono',
        fill: '#fff'
      });

      share.inputEnabled = true;

      share.events.onInputUp.add(this.onShare, this)
   }

  onShare() {
    this.game.state.start('Share');
   }

}

export default GameOver;
