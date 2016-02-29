import {GAME} from '../const';

class Boot extends Phaser.State {
  create() {
    this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    // this.game.scale.pageAlignHorizontally = true;
    // this.game.scale.pageAlignVertically = true;

    document.addEventListener('deviceready', () => {
     // this.game.scale.setGameSize(window.innerWidth, window.innerHeight)
      this.game.state.start('Loader');
    });
  }
}

export { Boot };
