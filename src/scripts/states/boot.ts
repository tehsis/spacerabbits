import {GAME} from '../const';

class Boot extends Phaser.State {
  scaleStage() {
  }

  create() {
    this.game.state.start('Loader');
  }
}

export default Boot;
