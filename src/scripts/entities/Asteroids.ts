import {IEntity} from './IEntity';
import { AssetsHandler } from '../utils/AssetsHandler';

class Asteroids implements IEntity {
  assets: AssetsHandler;
  game: Phaser.Game;

  constructor (game: Phaser.Game) {
    this.game = game;
    this.assets = new AssetsHandler(this.game);
  }

  load () {
    this.assets.loadSpreadSheet('destroyed', 20, 200);
  }
}

export {Asteroids};
