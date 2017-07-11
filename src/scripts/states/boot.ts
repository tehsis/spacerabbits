import {GAME} from '../const';
import gameState from '../game-state';

class Boot extends Phaser.State {
  scaleStage() {
  }

  create() {
    gameState.goTo('Loader');
  }
}

export default Boot;
