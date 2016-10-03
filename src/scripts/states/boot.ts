import {GAME} from '../const';

class Boot extends Phaser.State {
  scaleStage() {
    if (this.game.device.desktop) {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth = GAME.SCREEN.BASE_WIDTH / 2;
      this.game.scale.minHeight = GAME.SCREEN.BASE_HEIGHT / 2;
      this.game.scale.maxWidth = GAME.SCREEN.BASE_WIDTH;
      this.game.scale.maxHeight = GAME.SCREEN.BASE_HEIGHT;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
    }

  }

  create() {
    this.scaleStage();


    this.game.state.start('Loader');
  }
}

export default Boot;
